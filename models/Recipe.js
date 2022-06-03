const { model, Schema, Types: {ObjectId} } = require('mongoose');


const recipeSchema = new Schema(
	{
		_ownerId: {
			type:ObjectId,
			ref: 'User',
		},
		name: {
			type: String,
		},
		description: {
			type: String,
		},
		images: {
			type: [String],
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