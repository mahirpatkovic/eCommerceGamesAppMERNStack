const Game = require('../models/gameModel');
const catchAsync = require('../utils/catchAsync');

exports.getAll = async (req, res) => {
    try {
        const games = await Game.find();

        res.status(200).json({
            status: 'success',
            games,
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
};

exports.getGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            game,
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
};

exports.addGame = catchAsync(async (req, res, next) => {
    // console.log(req.body);
    const newGame = await Game.create(req.body);

    res.status(200).json({
        status: 'success',
        newGame,
    });
});

exports.updateGame = catchAsync(async (req, res, next) => {
    const updatedGame = await Game.findById(req.body._id);

    updatedGame.name = req.body.name;
    updatedGame.title = req.body.title;
    updatedGame.description = req.body.description;
    updatedGame.genre = req.body.genre;
    updatedGame.developer = req.body.developer;
    updatedGame.modes = req.body.modes;
    updatedGame.poster = req.body.poster;
    updatedGame.price = req.body.price;
    updatedGame.quantity = req.body.quantity;
    updatedGame.trailer = req.body.trailer;

    await updatedGame.save();
    res.status(200).json({
        status: 'success',
        updatedGame,
    });
});

exports.deleteGame = catchAsync(async (req, res, next) => {
    await Game.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: 'success',
        message: 'Game has been deleted',
    });
    next();
});
