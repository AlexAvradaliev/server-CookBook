const router = require('express').Router();
const recipe = require('../services/recipeService');
const comment = require('../services/commentService');
const { isAuth } = require('../middleweare/guards');
const { validation } = require('../middleweare/validation/recipe');
const { validationResult } = require('express-validator');
const { errorWrapper, mapperStatus } = require('../utils/errorWrapper');
const cloudinary = require('../config/cloudinary');



router.get(`/`, async (req, res, next) => {
    try {
        const queryInfo = req.query;
        let data = await recipe.getAll(queryInfo);
        res.json(data);
    } catch (err) {
        next(err)
    };
});

router.post(`/`, validation, isAuth(), async (req, res, next) => {
    const mimeType = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    const isValid = (type) => !!mimeType.find(x => x == type);
    try {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            throw errorWrapper(mapperStatus(errors, 400))
        };
        let bodyData = req.body
        if (bodyData.previewImage.length > 0) {
            if (!isValid(bodyData.previewImage.map(x => x.mimeType))) {
                const err = {
                    status: 400,
                    msg: `File does not support`,
                    param: 'images'
                };
                throw errorWrapper([err]);
            };

            const promises = bodyData.previewImage.map(x =>
                cloudinary.v2.uploader.upload(x.url, {
                    folder: "Recipes/recipes",
                })
            );
            const images = (await Promise.all(promises)).map((obj) => {
                req.body.images = [...req.body.images, { id: obj.public_id, url: obj.secure_url }]
            });
            bodyData.previewImage = [];
        };

        if (bodyData.images.length == 0) {
            const err = {
                status: 400,
                msg: `Please import an image`,
                param: 'images'
            };
            throw errorWrapper([err]);
        } else if (bodyData.images.length > 6) {
            const err = {
                status: 400,
                msg: `Imges can not be more than 6`,
                param: 'images'
            };
            throw errorWrapper([err]);
        }

        const data = {
            images: req.body.images,
            ingredients: req.body.ingredients,
            groups: req.body.groups,
            steps: req.body.steps,
            title: req.body.title,
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
        next(err)
    };
});

router.get('/owner', isAuth(), async (req, res, next) => {
    try {
        const data = await recipe.getAllOwner(req.users._id);
        res.json(data);

    } catch (err) {
        next(err)
    };
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await recipe.getOneById(req.params.id);
        res.json(data);

    } catch (err) {
        next(err)
    };
});

router.put('/:id', isAuth(), validation, async (req, res, next) => {

    const mimeType = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    const isValid = (type) => !!mimeType.find(x => x == type);

    try {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            throw errorWrapper(mapperStatus(errors, 400))
        };

        const userId = req.users._id;
        const recipeId = req.params.id;

        let bodyData = req.body
        if (bodyData.previewImage.length > 0) {
            const valid = bodyData.previewImage.map(x => {
                if (!isValid(x.mimeType)) {
                    const err = {
                        status: 400,
                        msg: `File does not support`,
                        param: 'images'
                    };
                    throw errorWrapper([err]);
                };
            });

            const promises = bodyData.previewImage.map(x =>
                cloudinary.v2.uploader.upload(x.url, {
                    folder: "Recipes/recipes",
                })
            );
            const images = (await Promise.all(promises)).map((obj) => {
                req.body.images = [...req.body.images, { id: obj.public_id, url: obj.secure_url }]
            });
            bodyData.previewImage = [];
        };

        if (bodyData.images.length == 0) {
            const err = {
                status: 400,
                msg: `Please import an image`,
                param: 'images'
            };
            throw errorWrapper([err]);
        } else if (bodyData.images.length > 6) {
            const err = {
                status: 400,
                msg: `Imges can not be more than 6`,
                param: 'images'
            };
            throw errorWrapper([err]);
        }

        const data = {
            images: req.body.images,
            ingredients: req.body.ingredients,
            groups: req.body.groups,
            steps: req.body.steps,
            title: req.body.title,
            description: req.body.description,
            cuisine: req.body.cuisine,
            level: req.body.level,
            cookTime: req.body.cookTime,
            prepTime: req.body.prepTime,
        };
        const result = await recipe.update(recipeId, data, userId);
        return res.json(result);

    } catch (err) {
        next(err)
    };
});

router.delete('/:id', async (req, res, next) => {
    try {
        const recipeId = req.params.id;
        const userId = req.users._id

        await recipe.deleteById(recipeId, userId);
        await comment.deleteMany(recipeId)

        return res.status(200).json({ succes: true });

    } catch (err) {
        next(err)
    };
});

module.exports = router;