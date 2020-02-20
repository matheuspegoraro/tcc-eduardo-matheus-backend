const express = require('express');

const UserController = require('../controllers/UserController');
const AuthMiddleware = require('../middlewares/auth');
const PermissionMiddleware = require('../middlewares/permission');

const user = express.Router();

const ADMINISTRATOR = 1;

user.get('/users', AuthMiddleware, PermissionMiddleware(ADMINISTRATOR), UserController.allUsers);
user.get('/users/:userId', AuthMiddleware, UserController.userById);
user.post('/users', UserController.createUser);

module.exports = user;