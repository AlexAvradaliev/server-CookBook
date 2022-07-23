const Rating = require('../models/Rating');

async function getOwner(recipeId, userId) {
    try {
        const filter = {
            _owner: recipeId,
            recipe: userId
        };
        const data = await Rating.findOne(filter);
        return data.value; 
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
        return result;
    } catch (err) {
        throw err;
    };
};

async function edit(id, data) {
    try {
        const existing = await Rating.findById(id);
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