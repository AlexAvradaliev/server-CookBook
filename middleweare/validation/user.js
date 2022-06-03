const { body } = require('express-validator');

function validateRegister() {
    return (req, res) => {
        body('firstName')
            .trim()
        body('lastName')
            .trim()
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
                .isLength({ min: 1, max: 12 }).withMessage('first name can be between 1-12 char'),
        body('email')
                .isEmail().withMessage('email is not valid'),
        body('password')
                .isLength({ min: 6 }).withMessage('password can be 6 char'),
        body('repassword')
                .custom(async (value, { req }) => {
                    if (value != req.body.password) {
                        throw new Error('passwords don\'t match');
                    };
                });
    }
};

function validateLogin() {
    return (req, res) => {
        
        body('email')
            .trim()
            .normalizeEmail(),
        body('password')
                .trim()
    }
};