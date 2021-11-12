const express = require('express');

const commentController = require('../controllers/commentController');

const router = express.Router();

router.post('/', commentController.createComment);
router.get('/:gameId', commentController.getAllComments);

module.exports = router;
