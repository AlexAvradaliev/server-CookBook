const router = require('express').Router();
const recipe = require('../services/recipeService');
const { isAuth } = require('../middleweare/guards');
const { validation } = require('../middleweare/validation/recipe');
const { validationResult } = require('express-validator');
const { errorWrapper, mapperStatus } = require('../utils/errorWrapper');



router.get(`/`, async (req, res, next) => {
    try {
        const queryInfo = req.query;
        let data = await recipe.getAll(queryInfo);
        res.json(data);
    } catch (err) {
        next (err)
    };
});

router.post(`/`, validation, async (req, res, next) => {
    try {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            throw errorWrapper(mapperStatus(errors,400))
        };
        const data = {
            images: req.body.images,
            ingredients: req.body.ingredients,
            groups: req.body.groups,
            steps: req.body.steps,
            name: req.body.name,
            description: req.body.description,
            cuisine: req.body.cuisine,
            level: req.body.level,
            cookTime: req.body.cookTime,
            prepTime: req.body.prepTime,
            _ownerId: req.users._id,
        };
        const result = await recipe.create(data);
        return res.status(201).json(result);

    } catch (err) {
        next (err)
    };
});

router.get('/owner', isAuth(), async (req, res, next) => {
    try {
        const data = await recipe.getAllOwner(req.users._id);
        res.json(data);

    } catch (err) {
        next (err)
    };
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await recipe.getOneById(req.params.id);
        res.json(data);

    } catch (err) {
        next (err)
    };
});

router.put('/:id', isAuth(), validation, async (req, res, next) => {
    try {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            throw errorWrapper(mapperStatus(errors,400))
        };

        const userId = req.users._id;
        const recipeId = req.params.id;
        const data = {
            images: req.body.images,
            ingredients: req.body.ingredients,
            groups: req.body.groups,
            steps: req.body.steps,
            name: req.body.name,
            description: req.body.description,
            cuisine: req.body.cuisine,
            level: req.body.level,
            cookTime: req.body.cookTime,
            prepTime: req.body.prepTime,
        };
        const result = await recipe.update(recipeId, data, userId);
        return res.json(result);

    } catch (err) {
        next (err)
    };
});

router.delete('/:id', async (req, res, next) => {
    try {
        const recipeId = req.params.id;
        const userId = req.users._id

        await recipe.deleteById(recipeId, userId);

        return res.status(200).json({ succes: true });

    } catch (err) {
        next (err)
    };
});

module.exports = router;