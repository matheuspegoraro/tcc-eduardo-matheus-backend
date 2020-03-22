const express = require('express');

const ExpenseController = require('../controllers/ExpenseController');
const RevenueController = require('../controllers/RevenueController');
const AuthMiddleware = require('../middlewares/auth');

const movement = express.Router();

//EXPENSES
movement.get('/movements/expenses', AuthMiddleware, ExpenseController.list);
movement.get('/movements/expenses/:movementId', AuthMiddleware, ExpenseController.byId);
movement.post('/movements/expenses', AuthMiddleware, ExpenseController.create);
movement.put('/movements/expenses/:movementId', AuthMiddleware, ExpenseController.update);
movement.delete('/movements/expenses/:movementId', AuthMiddleware, ExpenseController.delete);
movement.post('/movements/expenses/make-payment', AuthMiddleware, ExpenseController.makePayment);
movement.put('/movements/expenses/undo-payment/:movementId', AuthMiddleware, ExpenseController.undoPayment);

//REVENUES
movement.get('/movements/revenues', AuthMiddleware, RevenueController.list);
movement.get('/movements/revenues/:movementId', AuthMiddleware, RevenueController.byId);
movement.post('/movements/revenues', AuthMiddleware, RevenueController.create);
movement.put('/movements/revenues/:movementId', AuthMiddleware, RevenueController.update);
movement.delete('/movements/revenues/:movementId', AuthMiddleware, RevenueController.delete);
movement.post('/movements/revenues/make-receipt', AuthMiddleware, RevenueController.makeReceipt);
movement.put('/movements/revenues/undo-receipt/:movementId', AuthMiddleware, RevenueController.undoReceipt);

//TRANSFERS

module.exports = movement;