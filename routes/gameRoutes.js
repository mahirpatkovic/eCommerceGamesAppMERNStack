const express = require('express');

const gameController = require('../controllers/gameController');

const router = express.Router();

router.get('/', gameController.getAll);
router.get('/:id', gameController.getGame);

router.post('/', gameController.addGame);
router.patch('/updateGame', gameController.updateGame);
router.delete('/:id', gameController.deleteGame);

module.exports = router;
