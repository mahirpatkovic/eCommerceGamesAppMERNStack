const mongoose = require('mongoose');
const validator = require('validator');

const commentSchema = new mongoose.Schema({
    commentedBy: {
        type: String,
    },
    comment: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    game: {
        type: mongoose.Schema.ObjectId,
        ref: 'Game',
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
