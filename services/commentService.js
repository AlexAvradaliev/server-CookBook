const Comment = require('../models/Comment');
const { errorWrapper } = require('../utils/errorWrapper');

async function getAll(recipeId) {
    try {
        return Comment.find({ recipe: recipeId })
            .sort("-createdAt")
            .populate('recipe', 'name images')
            .populate('_ownerId', 'firstName lastName photo');
    } catch (err) {
        throw err;
    };
};

async function getByRecipeOwnerId(userId) {
    try {
        const options = {
            _ownerId: userId,
            isNewComment: true,
        };

        const result = await Comment.find(options)
            .sort("-createdAt")
            .populate([{ path: '_ownerId', select: ' _id firstName lastName photo' }, { path: 'recipe', select: '_id name images' }]);
        return result;
    } catch (err) {
        throw err;
    };
};

async function changeIsNew(recipeId, userId) {
    try {
        const options = {
            recipe: recipeId,
            _ownerId: userId,
            isNewComment: true,
        };

        await Comment.updateMany(options, { isNewComment: false });

    } catch (err) {
        throw err;
    };
};

async function create(data) {
    try {
        const result = new Comment(data);

        await result.save();
        return result;
    } catch (err) {
        throw err;
    };
};

async function deleteById(commentId, userId) {
    try {
        const findComment = await Comment.findById(commentId);

        if (findComment._ownerId != userId) {
            const err = {
                status: 400,
                msg: `You are not authorize`,
                param: 'auth',
            };
            throw errorWrapper([err]);
        };
        await Comment.findByIdAndDelete(commentId);
    } catch (err) {
        throw err;
    };
};

async function findOneById(commentId, userId) {
    try {
        const findComment = await Comment.findById(commentId);

        if (findComment.recipe_ownerId != userId) {
            const err = {
                status: 400,
                msg: `You are not authorize`,
                param: 'auth',
            };
            throw errorWrapper([err]);
        };

        return findComment;
    } catch (err) {
        throw err;
    };
};

async function edit(data, userId, commentId) {
    try {
        const result = await Comment.findById(commentId);

        if (result._ownerId != userId) {
            const err = {
                status: 400,
                msg: `You are not authorize`,
                param: 'auth',
            };
            throw errorWrapper([err]);
        };
        result.text = data.text;
        await result.save();
        return result;

    } catch (err) {
        throw err;
    };
};

module.exports = {
    getAll,
    getByRecipeOwnerId,
    create,
    deleteById,
    findOneById,
    edit,
    changeIsNew
};