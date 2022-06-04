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
        return Recipe.findById(id).populate("_ownerId", "firstName lastName photo");

    } catch (err) {
        console.log(err);
    };
};

async function getAll(queryInfo) {
    try {
        let query;
        const reqQuery = { ...queryInfo };
        let category = {};
        const searchName = queryInfo.search;
        const currentPage = queryInfo.page;

        //  Searching
        if (searchName) {
            category = {
                name: {
                    $regex: searchName,
                    $options: "i",
                },
            };
        } else if (reqQuery.hasOwnProperty('cuisine')) {
            category = {
                'cuisine': reqQuery.cuisine,
                'name': { $regex: searchName, $options: 'i' }
            };
        } else if (reqQuery.hasOwnProperty('groups')) {
            category = {
                'groups': reqQuery.groups,
                'name': { $regex: searchName, $options: 'i' }
            };
        };

        query = Recipe.find(category);
        query = query.sort("-createdAt");

        //  Pagination
        const pageNumber = Number(currentPage) || 1;
        const pageSize = 16;

        const skip = (pageNumber - 1) * pageSize;
        const count = await Recipe.countDocuments(category);

        query = query.skip(skip).limit(pageSize);

        // Pagination result
        const paginationObj = {
            page: pageNumber,
            pages: Math.ceil(count / pageSize),
        };

        if (pageNumber * pageSize < count) {
            paginationObj.nextPage = pageNumber + 1;
        };

        if (skip > 0) {
            paginationObj.previousPage = pageNumber - 1;
        };

        const recipes = await query
            .populate("_ownerId", "firstName lastName photo");
        return ({
            count: recipes.length,
            pagination: paginationObj,
            recipes: recipes,
        });

    } catch (err) {
        console.log(err);
    };
};

async function getAllOwner(userId) {
    try {
        return Recipe.find({ _ownerId: userId })
            .sort("-createdAt")
            .populate("_ownerId", "firstName lastName photo");

    } catch (err) {
        console.log(err);
    };
};

async function deleteById(recipeId, userId) {

    const findRecipe = await Recipe.findById(recipeId);

    try {
        if (findRecipe._ownerId != userId) {
            throw new Error({ message: 'you are not authorize' });
        }
        await Recipe.findByIdAndDelete(recipeId);
    } catch (err) {
        console.log(err);
    };
};

async function update(recipeId, data, userId) {

    const existing = await Recipe.findById(recipeId);

    if (existing._ownerId != userId) {
        throw new Error({ message: 'you are not authorize' });
    };

    existing.images = data.images;
    existing.ingredients = data.ingredients;
    existing.groups = data.groups;
    existing.steps = data.steps;
    existing.name = data.name;
    existing.description = data.description;
    existing.cuisine = data.cuisine;
    existing.level = data.level;
    existing.cookTime = data.cookTime;
    existing.prepTime = data.prepTime;
    existing.user = data._ownerId;

    await existing.save();
    return existing;
};

module.exports = {
    create,
    getOneById,
    getAll,
    getAllOwner,
    deleteById
};