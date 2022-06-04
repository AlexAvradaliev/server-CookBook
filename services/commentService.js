const Comment = require('../models/Comment');

async function getAll(recipeId) {
    try {
        return Comment.find({ recipe: recipeId })
            .sort("-createdAt")
            .populate('recipe', 'name images')
            .populate('_ownerId', 'firstName lastName photo');
    } catch (err) {
        throw err
    };
};

async function getByRecipeOwnerId(userId) {
    try {
        const options = {
            recipeOwnerId: userId,
            isNewComment: 'true',
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
            recipeOwnerId: userId,
            isNewComment: 'true',
        };

        await Comment.updateMany(options, { isNewComment: 'false' });

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
            console.log('err');
            throw new Error({ message: 'you are not authorize' });
        }
        await Comment.findByIdAndDelete(commentId);
    } catch (err) {
        throw err
    };
};

async function findOneById(commentId, userId) {
    try {
        const findComment = await Comment.findById(commentId);

        if (findComment.recipe_ownerId != userId) {
            throw new Error({ message: 'you are not authorize' });
        }

        return findComment;
    } catch (err) {
        throw err;
    };
};

async function edit(data, userId, commentId) {
    try {
        const result = await Comment.findById(commentId);

        if (result._ownerId != userId) {
            throw new Error({ message: 'you are not authorize' });
        };
        result.text = data.text;
        result.title = data.title;
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