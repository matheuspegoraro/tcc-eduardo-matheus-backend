const express = require('express');

const BillTypeController = require('../controllers/BillTypeController');
const AuthMiddleware = require('../middlewares/auth');
const PermissionMiddleware = require('../middlewares/permission');

const billType = express.Router();

const ADMINISTRATOR = 1;

billType.get('/bill-types', AuthMiddleware, BillTypeController.list);
billType.get('/bill-types/:billTypeId', AuthMiddleware, BillTypeController.byId);
billType.post('/bill-types', AuthMiddleware, PermissionMiddleware(ADMINISTRATOR), BillTypeController.create);

module.exports = billType;