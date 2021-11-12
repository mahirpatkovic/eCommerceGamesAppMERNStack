const express = require('express');

const contactController = require('../controllers/contactController');

const router = express.Router();

router.post('/', contactController.createContactMessage);
router.get('/', contactController.getAllContactMessages);

router.patch('/messageOpened', contactController.contactMessageOpened);

module.exports = router;
