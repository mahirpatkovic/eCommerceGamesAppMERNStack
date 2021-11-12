const Payment = require('../models/paymentModel');
const Game = require('../models/gameModel');
const catchAsync = require('../utils/catchAsync');

exports.createPayment = catchAsync(async (req, res, next) => {
    // console.log(req.body);
    await Payment.create(req.body);
    const games = req.body.gameDetails;
    let tmpGames = [];
    for (let gms of games) {
        const tmpGms = await Game.findById(gms.gameId);
        tmpGms.quantity = tmpGms.quantity - gms.gameQuantity;

        tmpGames.push(tmpGms);
    }

    for (let gm of tmpGames) {
        await gm.save();
    }

    res.status(200).json({
        status: 'success',
        message: 'Payment Successfull',
    });
});
