const router = require('express').Router();
const { validationResult } = require('express-validator');
const { isAuth, isGuest } = require('../middleweare/guards');
const { validateRegister, validateLogin } = require('../middleweare/validation/user');

const { register, login, loguot, modifyPassword, modifyUserData, verifyToken } = require('../services/userService');

router.post(`/register`, isGuest(), validateRegister, async (req, res) => {
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

router.post(`/login`, isGuest(), validateLogin, async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const result = await login(email, password);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    };
});

router.get(`/logout`,isAuth(), async (req, res) => {
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

router.patch(`/changePassword`, async (req, res) => {
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    const userId = req.users._id;

    try {
        if (newPassword != confirmPassword) {
            throw new error('');
        };

        const result = await modifyPassword(currentPassword, newPassword, userId);
        res.status(202).json(result);
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;