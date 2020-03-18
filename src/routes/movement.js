const express = require('express');

const ExpenseController = require('../controllers/ExpenseController');
const AuthMiddleware = require('../middlewares/auth');

const movement = express.Router();

movement.get('/movements', AuthMiddleware, ExpenseController.list);
movement.get('/movements/:movementId', AuthMiddleware, ExpenseController.byId);
movement.post('/movements', AuthMiddleware, ExpenseController.create);
movement.put('/movements/:movementId', AuthMiddleware, ExpenseController.update);
movement.delete('/movements/:movementId', AuthMiddleware, ExpenseController.delete);
movement.post('/movements/make-payment', AuthMiddleware, ExpenseController.makePayment);
movement.put('/movements/undo-payment/:movementId', AuthMiddleware, ExpenseController.undoPayment);

module.exports = movement;