const { body } = require('express-validator');

const cuisine = [
    'French',
    'Italian',
    'Chinese',
    'American',
    'Thai',
    'Japanese',
    'Indian',
    'Turkish',
    'Spanish',
    'Mexican',
    'Moroccan'
];

const level = [
    'Easy',
    'Intermediate',
    'Advanced'
];

const groups = [
    'fruits',
    'vegetables',
    'grains',
    'protein foods',
    'dairy'
];

function arrayTrim(arr) {
    
        const results = arr.filter(element => {
        return element !== '';
    });
    return results;
};

const validation = [

    body('title')
        .trim(),

    body('description')
        .trim(),

    body('cuisine')
    .trim(),

    body('level')
    .trim(),

    body('cookTime')
        .trim(),

    body('prepTime')
        .trim(),

    body('ingredients')
    .customSanitizer(value => {
        return arrayTrim(value);
      }),

    body('groups')
.customSanitizer(value => {
    return arrayTrim(value);
  }),

    body('steps')
.customSanitizer(value => {
    return arrayTrim(value);
  }),

//   body('images')
// .customSanitizer(value => {
//     return arrayTrim(value);
//   }),

//   body('previewImage')
// .customSanitizer(value => {
//     return arrayTrim(value);
//   }),

    body('title')
        .notEmpty().withMessage('Please give the recipe a title'),

    body('description')
        .notEmpty().withMessage('Please give the recipe a description')
        .isLength({ max: 500 }).withMessage('Description can not be more than 500 characters'),

    body('cuisine')
        .notEmpty().withMessage('Please select an appropriate cuisine for your recipe')
        .isIn(cuisine).withMessage(`Please select one of ${cuisine.join(', ')}`),

    body('level')
        .notEmpty().withMessage('Please select a level of difficulty')
        .isIn(level).withMessage(`Please select one of ${level.join(', ')}`),

    body('prepTime')
        .notEmpty().withMessage('Please enter an estimate of preparation time')
        .isInt({ min: 1 }).withMessage('Your estimate of preparation time can be minimun 1 minute'),

    body('cookTime')
        .notEmpty().withMessage('Please an estimate of cook time')
        .isInt({ min: 1 }).withMessage('Your estimate of cook time can be minimun 1 minute'),

    body('ingredients')
        .isArray({ min: 1 }).withMessage('Please add the appropriate ingredients for this recipe'),

    body('groups')
        .isArray({ min: 1 }).withMessage('Please add an appropriate group for you recipe')
        .isIn(groups).withMessage(`Please select one of ${groups.join(', ')}`),

    body('steps')
        .isArray({ min: 1 }).withMessage('Please add the necessary steps to prepare this recipe'),

];



module.exports = {
    validation
};