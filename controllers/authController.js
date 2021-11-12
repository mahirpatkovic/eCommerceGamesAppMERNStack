const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');
const validator = require('validator');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: false,
        secure: 'https',
    });

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        user,
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    let { username, email, fullName, password, passwordConfirm } = req.body;
    // validate
    if (!username || !email || !fullName || !password || !passwordConfirm)
        return res
            .status(400)
            .json({ message: 'You have to enter all fields.' });
    else if (password.length < 8)
        return res.status(400).json({
            message: 'The password needs to be at least 8 characters long.',
        });
    else if (password !== passwordConfirm)
        return res.status(400).json({
            message: 'Passwords have to be equal.',
        });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
        return res.status(400).json({
            message: 'An account with this email already exists.',
        });
    else if (!validator.isEmail(email)) {
        return res.status(400).json({
            message: 'Please provide a valid email.',
        });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        fullName,
        password: passwordHash,
    });
    const savedUser = await newUser.save();

    createSendToken(savedUser, 200, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Please provide email and password.' });
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({
            message: 'Incorrect email or password!',
        });
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({
            message: 'You are not logged. Please log in to get access',
        });
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return res.status(401).json({
            message: 'The user belonging to this token does no longer exist.',
        });
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.passwordChangedAt) {
        const changedTimestamp = parseInt(
            currentUser.passwordChangedAt.getTime() / 1000,
            10
        );
        return decoded.iat < changedTimestamp;
    }

    // console.log(currentUser);
    res.status(202).json({
        status: 'success',
        currentUser,
    });
    next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on Posted email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({
            message: 'There is no user with this email address',
        });
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    try {
        const resetURL = `${req.protocol}://${req.get(
            'host'
        )}/api/users/resetPassword/${resetToken}`;

        const resetURLFront = `${req.headers.origin}/resetPassword/${resetToken}`;

        await new Email(user, resetURL, resetURLFront).sendPasswordReset();

        res.status(200).json({
            status: 'success',
            message: 'Refresh token has been sent to email!',
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return res.status(500).json({
            message: 'There was an error sending the email. Try again later!',
        });
    }
    next();
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const { password, passwordConfirm } = req.body;
    // 1) Get user based on the token
    if (password.length < 8)
        return res.status(400).json({
            message: 'The password needs to be at least 8 characters long.',
        });

    if (password !== passwordConfirm)
        return res.status(400).json({
            message: 'Passwords have to be equal.',
        });
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
        return res.status(400).json({
            message: 'Token is invalid or has expired',
        });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashedPassword;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    createSendToken(user, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    // console.log(req.body);
    // console.log(req);
    const { passwordCurrent, password, passwordConfirm } =
        req.body.passwordValues;
    // 1) Get user from collection
    const user = await User.findById(req.body.userId).select('+password');
    // console.log(user);

    // // 2) Check if POSTed current password is correct
    if (!(await bcrypt.compare(passwordCurrent, user.password))) {
        return res.status(401).json({
            message: 'Your current password is wrong',
        });
    }
    // // // 3) If so, update password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.passwordConfirm = passwordConfirm;
    await user.save();

    // // // User.findByIdAndUpdate will NOT work as intended!

    // // // 4) Log user in, send JWT
    createSendToken(user, 200, req, res);
});
