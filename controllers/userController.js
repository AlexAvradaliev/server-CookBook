const router = require('express').Router();
const { validationResult } = require('express-validator');

const { register, login, loguot, modifyPassword, modifyUserData, verifyToken } = require('../services/userService');

router.post(`/register`, async (req, res) => {
    const { errors } = validationResult(req);
    try {
        const { firstName, lastName, email, password, repassword } = req.body;
        if (errors.length > 0) {
            throw errors;
        }
        if (password != repassword) {
            throw new Error('');
        };
        const result = await register(firstName, lastName, email, password);
        res.status(201).json(result);
    } catch (err) {
        console.log(err);
    };
});

router.post(`/login`, async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const result = await login(email, password);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    };
});

router.get(`/logout`, async (req, res) => {
    res.status(204).end();
});

router.put(`/changeUserData`, async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const userId = req.users._id

    try {
        const result = await modifyUserData(firstName, lastName, email, userId);
        res.status(202).json(result);
    } catch (err) {
        console.log(err);
    };
});

router.patch(`/changePassword`, async (req, res) => { });