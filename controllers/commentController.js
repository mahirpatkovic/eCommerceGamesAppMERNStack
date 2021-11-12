const Comment = require('../models/commentModel');
const catchAsync = require('../utils/catchAsync');

exports.createComment = catchAsync(async (req, res, next) => {
    const newComment = await Comment.create(req.body);

    res.status(200).json({
        status: 'success',
        newComment,
    });
});

exports.getAllComments = catchAsync(async (req, res, next) => {
    const comments = await Comment.find({ game: req.params.gameId });

    res.status(200).json({
        status: 'success',
        comments,
    });
});
