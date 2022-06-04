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

async function getAll(queryInfo) {
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
};

async function getAllOwner(userId) {

    return Recipe.find({_ownerId: userId})
    .sort("-createdAt")
    .populate( "_ownerId", "firstName lastName photo" );
};

module.exports = {
    create,
    getOneById,
    getAll,
    getAllOwner
};