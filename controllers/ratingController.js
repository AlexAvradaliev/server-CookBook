const router = require('express').Router();
const { validationResult } = require('express-validator');

const { isAuth } = require('../middleweare/guards');
const {errorWrapper, mapperStatus} = require('../utils/errorWrapper');
const { validation } = require('../middleweare/validation/rating');

const rating = require('../services/ratingService');

router.get('/user/:recipeId', isAuth(), async (req, res, next) => {
    try {
        const recipeId = req.params.recipeId;
        const userId = req.users._id;

        const result = await rating.getOwner(recipeId, userId);
        res.json(result);
    } catch (err) {
        next(err);
    };
});

router.get('/:recipeId', async (req, res, next) => {
    try {
        const recipeId = req.params.recipeId;

        const result = await rating.get(recipeId);
        res.json(result);
    } catch (err) {
        next(err);
    };
});

router.post('/:recipeId', isAuth(), validation, async (req, res, next) => {
    try {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            throw errorWrapper(mapperStatus(errors,400))
        };

        const recipeId = req.params.recipeId;
        const userId = req.users._id;
        const value = Number(req.body.rating);
        const data = {
            _ownerId: userId,
            recipe: recipeId,
            value
        };

        const result = await rating.create(data);
        res.json(result);
    } catch (err) {
        next(err);
    };
});

router.put('/:recipeId', isAuth(), validation, async (req, res, next) => {
    try {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            throw errorWrapper(mapperStatus(errors,400))
        };
        
        const recipeId = req.params.recipeId;
        const userId = req.users._id;
        const data = {
            value: req.body.rating
        };

        const result = await rating.edit(recipeId, userId, data);
        res.json(result);
    } catch (err) {
        next(err);
    };
});

module.exports = router;