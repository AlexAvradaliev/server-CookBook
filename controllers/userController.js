const router = require('express').Router();
const { validationResult } = require('express-validator');
const { isAuth, isGuest } = require('../middleweare/guards');
const { validateRegister, validateLogin, validateUserData, validateChangePassword } = require('../middleweare/validation/user');
const { errorWrapper, mapperStatus } = require('../utils/errorWrapper')
const user = require('../services/userService');

router.post(`/register`, isGuest(), validateRegister, async (req, res, next) => {

    try {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            throw errorWrapper(mapperStatus(errors,400));
           
        };

        const { firstName, lastName, email, password } = req.body;
        const result = await user.register(firstName, lastName, email, password);
        res.status(201).json(result);
    } catch (err) {
        next(err)
    };
});

router.post(`/login`, isGuest(), validateLogin, async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await user.login(email, password);
        res.status(200).json(result);
    } catch (err) {
        next(err)
    };
});

router.get(`/logout`, isAuth(), async (req, res, next) => {
    res.status(204).json({ succes: true });
});

router.put(`/changeUserData`, isAuth(), validateUserData, async (req, res, next) => {

    try {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            throw errorWrapper(mapperStatus(errors,400));
        };

        const { firstName, lastName, email } = req.body;
        const userId = req.users._id

        const result = await user.modifyUserData(firstName, lastName, email, userId);
        res.status(202).json(result);

    } catch (err) {
        next(err)
    };
});

router.patch(`/changePassword`, isAuth(), validateChangePassword, async (req, res, next) => {

    try {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            throw errorWrapper(mapperStatus(errors,400))
        };

        const { currentPassword, newPassword } = req.body;
        const userId = req.users._id;

        const result = await user.modifyPassword(currentPassword, newPassword, userId);
        res.status(202).json(result);
    } catch (err) {
        next(err)

    }
});

module.exports = router;