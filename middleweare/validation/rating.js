const { body } = require('express-validator');

const validation = [
    body('rating')
        .trim(),
    body('rating')
        .isInt({min: 1, max: 5}).withMessage('Please add a rating between 1 and 5')

];

module.exports = {
    validation
};