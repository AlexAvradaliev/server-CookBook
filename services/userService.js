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
        return user;

    } catch (error) {
        console.error(error);
    };
};

async function login(email, password) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (!user) {
        throw new Error(`Invalid Email or password`);
    };

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        throw new Error(`Invalid Email or password`);
    };

    return user;
};