const mongoose = require('mongoose');

const discoutCodeSchema = new mongoose.Schema({
    codeId: {
        type: String,
        unique: true,
        required: [true, 'Please provide discount code'],
    },
    addedBy: {
        type: String,
        required: [true, 'Please provide a user'],
    },
    isActive: {
        type: Boolean,
        default: true,
        select: false,
    },
});

const DiscountCode = mongoose.model('DiscountCode', discoutCodeSchema);

module.exports = DiscountCode;
