const Rating = require('../models/Rating');

async function getOwner(recipeId, userId) {
    try {
        const filter = {
            _owner: userId,
            recipe: recipeId,
        };

        const data = await Rating.findOne(filter);
        
        return {_id: data?._id, value: data?.value}; 
    } catch (err) {
        throw err;
    };
};

async function get(recipeId) {
    try {
        const data = await Rating.find({ recipe: recipeId }).select('value -_id');
        const dataSum = data.reduce((acc, val) => acc + val.value, 0);
        const avrRating = Number((dataSum / data.length).toFixed(2));
        return avrRating;
    } catch (err) {
        throw err;
    };
};

async function create(data) {
    try {
        const result = new Rating(data);
        await result.save();
        return {_id: result?._id, value: result?.value};
    } catch (err) {
        throw err;
    };
};

async function edit(recipeId, userId, data) {
    try {
        const existing = await Rating.findOne({recipe: recipeId, _ownerId: userId});
        existing.value = data.value;
        await existing.save();
        return existing;
    } catch (err) {
        throw err;
    };
};




module.exports = {
    get,
    create,
    edit,
    getOwner
};