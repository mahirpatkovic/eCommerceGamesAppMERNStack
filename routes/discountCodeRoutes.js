const express = require('express');

const discountCodeController = require('../controllers/discountCodeController');

const router = express.Router();

router.post('/', discountCodeController.createDiscountCode);
router.get('/', discountCodeController.getAllDiscountCodes);
router.patch('/useDiscountCode', discountCodeController.useDiscountCode);

module.exports = router;
