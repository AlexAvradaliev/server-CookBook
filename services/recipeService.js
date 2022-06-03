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

async function getOneById(id) {
    try {
        return Recipe.findById(id).populate( "_ownerId", "firstName lastName photo" );
        
    } catch (err) {
        console.log(err);
    };

};

module.exports = {
    create,
    getOneById,
};