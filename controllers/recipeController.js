const router = require('express').Router();
const recipe = require('../services/recipe');
const { isAuth } = require('../middleweare/guards');


router.get(`/`, async (req, res) => {
    try {
        const queryInfo = req.query;
        let data = await recipe.getAll(queryInfo);
        res.json(data);
    } catch (err) {
        console.log(err);
    };
});

router.post(`/`, async (req, res) => {
    try {
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
        console.log(err);
    };
});

router.get('/owner', isAuth(), async (req, res) => {
    try {
        const data = await recipe.getAllOwner(req.users._id);
        res.json(data);

    } catch (err) {
        console.log(err);
    };
});

router.get('/:id', async (req, res) => {
    try {
        const data = await recipe.getOneById(req.params.id);
        res.json(data);

    } catch (err) {
        console.log(err);
    };
});

router.put('/:id', isAuth(), async (req, res) => {
    try {
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
        console.log(err);
    };
});