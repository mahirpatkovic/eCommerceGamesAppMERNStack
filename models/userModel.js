const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please provide your username'],
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email'],
        },
        fullName: {
            type: String,
            required: [true, 'Please provide your full name'],
        },
        photo: {
            type: String,
            default: '',
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'superadmin'],
            default: 'user',
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 8,
            select: false,
        },
        country: {
            type: String,
            default: '',
        },
        city: {
            type: String,
            default: '',
        },
        address: {
            type: String,
            default: '',
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        active: {
            type: Boolean,
            default: true,
            select: false,
        },
    },
    { timestamps: true }
);

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
