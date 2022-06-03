const router = require('express').Router();
const {validationResult} = require('express-validator');

const { register, login, loguot, modifyPassword, modifyUserData, verifyToken } = require('../services/userService');

router.post(`/register`, async (req, res) => {
    const {errors} = validationResult(req)
      try {
         const { firstName, lastName, email, password, repassword } = req.body;
            if(errors.length > 0 ){
               throw errors
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

router.post(`/login`, async (req, res) => { });

router.get(`/logout`, async (req, res) => { });

router.put(`/changeUserData`, async (req, res) => { });

router.patch(`/changePassword`, async (req, res) => { });