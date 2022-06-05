const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleweare/guards');

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

router.post('/:recipeId', async (req, res, next) => {
    try {
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

router.put('/:recipeId', isAuth(), async (req, res, next) => {
    try {
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