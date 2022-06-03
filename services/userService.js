const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

dotenv.config();

async function register(firstName, lastName, email, password) {

    try {

        const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

        if (existing) {
            throw new Error(`${email} already exists`);
        };

        const user = new User({
            firstName,
            lastName,
            email,
            hashedPassword: await bcrypt.hash(password, 10),
        });

        await user.save();
        return createToken(user);

    } catch (err) {
        console.error(err);
    };
};

async function login(email, password) {

    try {
        const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
        if (!user) {
            throw new Error(`Invalid Email or password`);
        };

        const match = await bcrypt.compare(password, user.hashedPassword);

        if (!match) {
            throw new Error(`Invalid Email or password`);
        };

        return createToken(user);

    } catch (err) {
        console.log(err)
    };
};

function loguot() {

};

async function modifyPassword(currentPassword, newPassword, userId) {
    try {

        const user = await User.findById(userId);

        const match = await bcrypt.compare(currentPassword, user.hashedPassword);

        if (!match) {
            throw new Error(`Invalid password`);
        };

        user.hashedPassword = await bcrypt.hash(newPassword, 10);

        await user.save();
        return createToken(user);

    } catch (error) {
        console.log(err);
    };
};

async function modifyUserData(firstName, lastName, email, userId) {

    const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (existing._id = !userId) {
        if (existing) {
            throw new Error(`${email} already exists`);
        };
    };

    const user = await User.findById(userId)
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    await user.save();
    return createToken(user);
};


function createToken(user) {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        photo: user.photo,
        _id: user._id,
        accessToken: jwt.sign({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            photo: user.photo,
            _id: user._id,
        }, process.env.JWT_SECRET)
    };
};

function verifyToken(token) {
    const payload = jwt.verify(token, JWT_SECRET);
    return {
        firstName: payload.firstName,
        lastName: payload.lastName,
        photo: payload.photo,
        _id: payload._id,
        token
    };
};

module.exports = {
    register,
    login,
    loguot,
    modifyPassword,
    modifyUserData,
    verifyToken
};