const express = require('express');

const BillController = require('../controllers/BillController');
const AuthMiddleware = require('../middlewares/auth');
const PermissionMiddleware = require('../middlewares/permission');

const bill = express.Router();

const ADMINISTRATOR = 1;

bill.get('/bills', AuthMiddleware, BillController.list);
bill.get('/bills/:billId', AuthMiddleware, BillController.byId);
bill.post('/bills', AuthMiddleware, PermissionMiddleware(ADMINISTRATOR), BillController.create);
bill.put('/bills/:billId', AuthMiddleware, BillController.edit);
bill.delete('/bills/:billId', AuthMiddleware, BillController.delete);

module.exports = bill;