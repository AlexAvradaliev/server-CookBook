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
        .isLength({ min: 1, max: 12 }).withMessage('The First name can be maximum 12 characters'),
    body('lastName')
        .isLength({ min: 1, max: 12 }).withMessage('The Last name can be maximum 12 characters'),
    body('email')
        .isEmail().withMessage('The Email must be a be valid'),
    body('password')
        .isLength({ min: 6 }).withMessage('The Password must be at least 6 characters'),
    body('repassword')
        .custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error('The Passwords don\'t match');
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
        .isLength({ min: 1, max: 12 }).withMessage('The First name can be maximum 12 characters'),
    body('lastName')
        .isLength({ min: 1, max: 12 }).withMessage('The Last name can be maximum 12 characters'),
    body('email')
        .isEmail().withMessage('Email must be a be valid'),
];

const validateChangePassword = [
    body('newPassword')
    .trim(),
    body('confirmPassword')
    .trim(),
    body('newPassword')
    .isLength({ min: 6 }).withMessage('The Password must be at least 6 characters'),
    body('confirmPassword')
    .custom((value, { req }) => {
        if (value != req.body.newPassword) {
            throw new Error('The Passwords don\'t match');
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