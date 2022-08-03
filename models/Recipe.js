const { model, Schema, Types: {ObjectId} } = require('mongoose');


const recipeSchema = new Schema(
	{
		_ownerId: {
			type:ObjectId,
			ref: 'User',
		},
		title: {
			type: String,
		},
		description: {
			type: String,
		},
		images: {
			type: Object,
		},
		cuisine: {
			type: String,
		},
		level: {
			type: String,
		},
		prepTime: {
			type: String,
		},
		cookTime: {
			type: String,
		},
		ingredients: {
			type: [String],
		},
		groups: {
			type: [String],
		},
		steps: {
			type: [String],
		},
	},
	{ timestamps: true }
);

const Recipe = model('Recipe', recipeSchema);
module.exports = Recipe;