const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please provide your full name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    message: {
        type: String,
        required: [true, 'Please provide a message'],
    },
    isOpen: {
        type: Boolean,
        default: false,
    },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
