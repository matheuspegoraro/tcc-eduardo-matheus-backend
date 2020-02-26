const express = require('express');

const BankController = require('../controllers/BankController');
const AuthMiddleware = require('../middlewares/auth');
const PermissionMiddleware = require('../middlewares/permission');

const bank = express.Router();

const ADMINISTRATOR = 1;

bank.get('/banks', AuthMiddleware, BankController.list);
bank.get('/banks-default', AuthMiddleware, BankController.listDefaults);
bank.get('/banks/:bankId', AuthMiddleware, BankController.byId);
bank.post('/banks', AuthMiddleware, BankController.create);
bank.delete('/banks/:bankId', AuthMiddleware, BankController.delete);
bank.put('/banks/:bankId', AuthMiddleware, BankController.edit);

module.exports = bank;