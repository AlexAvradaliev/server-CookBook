const { body } = require('express-validator');

const validation = [
    body('text')
        .trim(),
    body('text')
        .notEmpty().withMessage('Please add your comment text')
        .isLength({ max: 100 }).withMessage('Text can be max 100 characters'),
];

module.exports = {
    validation
};