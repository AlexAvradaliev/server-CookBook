const router = require('express').Router();
const comment = require('../services/commentService');
const { isAuth } = require('../middleweare/guards');

router.get('/recipe/:id', async (req, res, next) => {
    try {
        const recipeId = req.params.id;
        const userId = req.users._id;
        if (userId) {
            await comment.changeIsNew(recipeId, userId);
        };
        const data = await comment.getAll(recipeId);
        res.json(data);
    } catch (err) {
        next(err);
    };
});

router.get('/:id', isAuth(), async (req, res, next) => {
    try {
        const userId = req.users._id;
        const commentId = req.params.id
        const data = await comment.findOneById(commentId, userId);
        res.json(data);
    } catch (err) {
        next(err);
    };
});

router.get('/', isAuth(), async (req, res, next) => {
    try {
        const userId = req.users._id;
        const data = await comment.getByRecipeOwnerId(userId);
        res.json(data);
    } catch (err) {
        next(err);
    };
});

router.post('/:id', isAuth(), async (req, res, next) => {
    try {
        const user = req.users
        const data = {
            title: req.body.title,
            text: req.body.text,
            recipeOwnerId: req.body.recipeOwnerId,
            _ownerId: req.users._id,
            recipe: req.params.id
        };
        const result = await comment.create(data);

        const datainfo = {
            _id: result._id,
            _ownerId: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                photo: user.photo
            },
            title: result.title,
            text: result.text,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        };
        return res.status(201).json(datainfo);
    } catch (err) {
        next(err);
    };
});

router.put('/:id', isAuth(), async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const user = req.users
        const data = req.body;

        const response = await comment.edit(data, user._id, commentId);
        const result = {
            _id: response._id,
            _ownerId: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                photo: user.photo
            },
            title: response.title,
            text: response.text,
        };
        res.json(result);
    } catch (err) {
        next(err);
    };
});

router.delete('/:id', isAuth(), async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const userId = req.users._id;

        await comment.deleteById(commentId, userId);

        return res.status(200).json({
            success: true
        });
    } catch (err) {
        next(err);
    };
});

module.exports = router;