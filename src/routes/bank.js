const express = require('express');

const BankController = require('../controllers/BankController');
const AuthMiddleware = require('../middlewares/auth');
const PermissionMiddleware = require('../middlewares/permission');

const bank = express.Router();

const ADMINISTRATOR = 1;

bank.get('/banks', AuthMiddleware, BankController.list);
bank.get('/banks/:bankId', AuthMiddleware, BankController.byId);
bank.post('/banks', AuthMiddleware, PermissionMiddleware(ADMINISTRATOR), BankController.create);

module.exports = bank;