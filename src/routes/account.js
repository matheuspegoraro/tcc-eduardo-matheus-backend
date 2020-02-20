const express = require('express');

const AccountController = require('../controllers/AccountController');
const AuthMiddleware = require('../middlewares/auth');
const PermissionMiddleware = require('../middlewares/permission');

const account = express.Router();

const ADMINISTRATOR = 1;

account.get('/accounts', AuthMiddleware, AccountController.list);
account.get('/accounts/:accountId', AuthMiddleware, AccountController.byId);
account.post('/accounts', AuthMiddleware, PermissionMiddleware(ADMINISTRATOR), AccountController.create);
account.put('/accounts/:accountId', AuthMiddleware, PermissionMiddleware(ADMINISTRATOR), AccountController.update);

module.exports = account;