const express = require('express');

const CreditCardController = require('../controllers/CreditCardController');
const AuthMiddleware = require('../middlewares/auth');
const PermissionMiddleware = require('../middlewares/permission');

const creditCard = express.Router();

const ADMINISTRATOR = 1;

creditCard.get('/credit-cards', AuthMiddleware, CreditCardController.list);
creditCard.get('/credit-cards/:creditCardId', AuthMiddleware, CreditCardController.byId);
creditCard.post('/credit-cards', AuthMiddleware, PermissionMiddleware(ADMINISTRATOR), CreditCardController.create);

module.exports = creditCard;