const express = require('express');

const ProfileController = require('../controllers/ProfileController');
const AuthMiddleware = require('../middlewares/auth');

const user = express.Router();

user.get('/profile', AuthMiddleware, ProfileController.profileById);
user.put('/profile', AuthMiddleware, ProfileController.update);


module.exports = user;