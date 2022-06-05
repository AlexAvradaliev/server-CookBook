const { model, Schema, Types: {ObjectId} } = require('mongoose');

const ratingSchema = new Schema({
    _ownerId: {
        type:ObjectId,
			required: true,
			ref: 'User',
    },
    recipe: {
        type:ObjectId,
			required: true,
			ref: 'Recipe',
    },
    value: {
        type: Number,
    },
},
{ timestamps: true }
);

const Ratings = model('Rating', ratingSchema);
module.exports = Ratings;
