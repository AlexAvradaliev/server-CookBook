const Recipe = require('../models/Recipe');

async function create(recipe) {
    try {
        const result = new Recipe(recipe);

        await result.save();
        return result;

    } catch (err) {
        console.log(err);
    };
};

module.exports = {
    create,
};