// import express from 'express';
// const router = express.Router();
const router = require('express').Router();
const { register, login } = require('../controllers/auth.js');
// import * as mAuth from '../middlewares/auth.js';

router.post('/register', register);

router.post('/login', login);

// router.post('/forgotpassword',  auth.forgotPassword);
// router.put('/resetpassword/:resetToken', auth.resetPassword);

// router.put('/update', mAuth.verify, auth.updateUserInfo);

module.exports = router;
