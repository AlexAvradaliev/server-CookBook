const {model, Schema, Types: {ObjectId}} = require('mongoose');

const commentShema = new Schema(
    {
recipe: {
    type: ObjectId,
    ref: 'Recipe'
},
_ownerId: {
    type: ObjectId,
    ref:'User'
},
text: {
    type: String,
},
recipeOwnerId: {
    type: String
},
isNewComment: {
    type: String,
    default: 'true'
},
    },
    {timestamps: true}
);

const Comment = model('Comment', commentShema);
module.exports = Comment;