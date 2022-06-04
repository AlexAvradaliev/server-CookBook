const router = require('express').Router();
const recipe = require('../services/recipe');
const { isAuth, isOwner } = require('../middleweare/guards');


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
            description:req.body.description,
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