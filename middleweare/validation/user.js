const { body } = require('express-validator');

const validateRegister = [

    body('lastName')
        .trim(),
    body('email')
        .trim()
        .normalizeEmail(),
    body('password')
        .trim(),
    body('repassword')
        .trim(),
    body('firstName')
        .isLength({ min: 1, max: 12 }).withMessage('first name can be between 1-12 char'),
    body('lastName')
        .isLength({ min: 1, max: 12 }).withMessage('last name can be between 1-12 char'),
    body('email')
        .isEmail().withMessage('email is not valid'),
    body('password')
        .isLength({ min: 6 }).withMessage('password can be 6 char'),
    body('repassword')
        .custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error('passwords don\'t match');
            };
            return true;
        })
];

const validateLogin = [
    body('email')
        .trim()
        .normalizeEmail(),
    body('password')
        .trim()
];

const validateUserData = [
    body('firstName')
        .trim(),
    body('lastName')
        .trim(),
    body('email')
        .trim()
        .normalizeEmail(),
    body('firstName')
        .isLength({ min: 1, max: 12 }).withMessage('first name can be between 1-12 char'),
    body('lastName')
        .isLength({ min: 1, max: 12 }).withMessage('last name can be between 1-12 char'),
    body('email')
        .isEmail().withMessage('email is not valid'),
];

const validateChangePassword = [
    body('newPassword')
    .trim(),
    body('confirmPassword')
    .trim(),
    body('newPassword')
    .isLength({ min: 6 }).withMessage('password can be 6 char'),
    body('confirmPassword')
    .custom((value, { req }) => {
        if (value != req.body.newPassword) {
            throw new Error('passwords don\'t match');
        };
        return true;
    }),
];

module.exports = {
    validateRegister,
    validateLogin,
    validateUserData,
    validateChangePassword
};