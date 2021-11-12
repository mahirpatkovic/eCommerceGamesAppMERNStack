const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    gameDetails: Array,
    userShippingDetails: Array,
    paymentDetails: Array,
    isPaypal: Boolean,
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
