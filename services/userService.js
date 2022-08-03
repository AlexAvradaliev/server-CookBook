const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const { errorWrapper } = require('../utils/errorWrapper');
const User = require('../models/User');

dotenv.config();

async function register(firstName, lastName, email, password) {

    try {

        const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

        if (existing) {
            const err = {
                status: 400,
                msg: `${email} already exists`,
                param: 'email'
            };
            throw errorWrapper([err])
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
        throw err;
    };
};

async function login(email, password) {

    try {
        const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
        if (!user) {
            const err = {
                status: 400,
                msg: 'Invalid Email or password',
                param: 'custom'
            };
            throw errorWrapper([err])

        };

        const match = await bcrypt.compare(password, user.hashedPassword);

        if (!match) {
            const err = {
                status: 400,
                msg: 'Invalid Email or password',
                param: 'custom'
            };
            throw errorWrapper([err])

        };

        return createToken(user);

    } catch (err) {
        throw err;
    };
};

function loguot() {

};

async function modifyPassword(currentPassword, newPassword, userId) {
    try {

        const user = await User.findById(userId);

        const match = await bcrypt.compare(currentPassword, user.hashedPassword);

        if (!match) {
            const err = {
                status: 400,
                msg: 'Invalid password',
                param: 'password'
            };
            throw errorWrapper([err])

        };

        user.hashedPassword = await bcrypt.hash(newPassword, 10);

        await user.save();
        return createToken(user);

    } catch (err) {
        throw err;
    };
};

async function modifyUserData(firstName, lastName, email, userId) {
    try {
        const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
        if (existing._id = !userId) {
            if (existing) {
                const err = {
                    status: 400,
                    msg: `${email} already exists`,
                    param: 'email'
                };
                throw errorWrapper([err])
            };
        };
        const user = await User.findById(userId)
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;

        await user.save();
        return createToken(user);
    } catch (err) {
        throw err;
    }
};

async function getAvatarId(userId) {
    try {
        const user = await User.findById(userId);

        return user.idUrl
    } catch (err) {
        throw err;
    };
};

async function modifyAvatar(userId, imgUrl, imgId) {
    try {

        const user = await User.findById(userId);
        user.photo = imgUrl;
        user.idUrl = imgId;
        
        await user.save();
        return createToken(user);

    } catch (err) {
        throw err;
    }
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
    const payload = jwt.verify(token, process.env.JWT_SECRET);
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
    verifyToken,
    modifyAvatar,
    getAvatarId
};