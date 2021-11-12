const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/auth', authController.protect);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// router.use(authController.protect);

router.patch('/updatePassword', authController.updatePassword);

router.patch(
    '/uploadUserPhoto',
    userController.uploadPhoto,
    userController.resizeUserPhoto,
    userController.uploadUserPhoto
);

router.patch('/updateCurrentUser', userController.updateCurrentUser);
router.get('/', userController.getAllUsers);

router.patch('/addUserAsAdmin', userController.addUserAsAdmin);
router.patch('/removeUserAsAdmin', userController.removeUserAsAdmin);
// router.get('/example', (req, res) => {
//     res.send('example page');
// });

module.exports = router;
