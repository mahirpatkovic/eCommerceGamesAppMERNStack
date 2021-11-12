const User = require('../models/userModel');
const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('../utils/catchAsync');
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

exports.uploadPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.body.userId}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/users/${req.file.filename}`);

    next();
});

exports.uploadUserPhoto = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.body.userId);
    if (!user) {
        return res.status(400).json({
            message: 'Cannot update your profile, try again later',
        });
    }
    user.photo = req.file.filename;
    await user.save();
    res.status(200).json({
        status: 'success',
        user,
    });
});

exports.updateCurrentUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.body.userId);
    if (!user) {
        return res.status(400).json({
            message: 'Cannot update your profile, try again later',
        });
    }
    // user.username = req.body.username;
    // user.email = req.body.email;
    // user.fullName = req.body.fullName;
    user.country = req.body.country;
    user.city = req.body.city;
    user.address = req.body.address;

    await user.save();
    res.status(200).json({
        status: 'success',
        user,
    });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const allUsers = await User.find();

    res.status(200).json({
        status: 'success',
        allUsers,
    });
});

exports.addUserAsAdmin = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.body.userId);

    user.role = 'admin';
    await user.save();

    res.status(200).json({
        status: 'success',
        user,
    });
});

exports.removeUserAsAdmin = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.body.userId);

    user.role = 'user';
    await user.save();

    res.status(200).json({
        status: 'success',
        user,
    });
});
