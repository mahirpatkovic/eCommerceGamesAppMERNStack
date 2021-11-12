const DiscountCode = require('../models/discountCodeModel');
const catchAsync = require('../utils/catchAsync');

exports.createDiscountCode = catchAsync(async (req, res, next) => {
    const newDiscountCode = await DiscountCode.create(req.body);

    res.status(200).json({
        status: 'success',
        newDiscountCode,
    });
});

exports.getAllDiscountCodes = catchAsync(async (req, res, next) => {
    const discountCodes = await DiscountCode.find();

    res.status(200).json({
        status: 'success',
        discountCodes,
    });
});

exports.useDiscountCode = catchAsync(async (req, res, next) => {
    const discountCode = await DiscountCode.findOne({
        codeId: req.body.codeId,
    }).select('+isActive');

    if (!discountCode || discountCode.isActive === false) {
        return res.status(200).json({
            status: 'failed',
            message:
                'Discount code invalid! Please enter correct discount code',
        });
    } else {
        discountCode.isActive = false;
        await discountCode.save();

        return res.status(200).json({
            status: 'success',
            message: 'Discount code accepted! Applied discount 20%',
        });
    }
});
