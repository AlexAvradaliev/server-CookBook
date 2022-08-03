const { model, Schema } = require('mongoose');


const userSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    hashedPassword: {
        type: String,
    },
    photo: {
        type: String,
        default: '/assets/images/user.webp'
    },
    idUrl: {
        type: String,
    }
},
    { timestamps: true }
);


userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 1
    }
})

const User = model('User', userSchema);
module.exports = User;