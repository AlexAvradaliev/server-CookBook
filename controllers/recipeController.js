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