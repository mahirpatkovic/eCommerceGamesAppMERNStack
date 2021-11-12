const Contact = require('../models/contactModel');
const catchAsync = require('../utils/catchAsync');

exports.createContactMessage = catchAsync(async (req, res, next) => {
    const newContactMessage = await Contact.create(req.body);

    res.status(200).json({
        status: 'success',
        newContactMessage,
    });
});

exports.getAllContactMessages = catchAsync(async (req, res, next) => {
    const messages = await Contact.find();

    res.status(200).json({
        status: 'success',
        messages,
    });
});

exports.contactMessageOpened = catchAsync(async (req, res, next) => {
    const message = await Contact.findById(req.body.messageId);

    message.isOpen = true;

    await message.save();

    res.status(200).json({
        status: 'success',
        message,
    });
});
