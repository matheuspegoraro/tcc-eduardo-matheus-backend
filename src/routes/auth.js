const express = require('express');

const AuthController = require('../controllers/AuthController');

const auth = express.Router();

auth.post('/authenticate', AuthController.authenticate);
auth.post('/forgot-password', AuthController.forgotPassword);
auth.post('/reset-password', AuthController.resetPassword);

module.exports = auth;