const { body } = require('express-validator');

const validation = [
    body('title')
        .trim(),
    body('text')
        .trim(),
    body('title')
        .notEmpty().withMessage('Please add a title for the comment')
        .isLength({ max: 20 }).withMessage('Title can be max 20 characters'),
    body('text')
        .notEmpty().withMessage('Please add your comment text')
        .isLength({ max: 100 }).withMessage('Text can be max 100 characters'),
];

module.exports = {
    validation
};