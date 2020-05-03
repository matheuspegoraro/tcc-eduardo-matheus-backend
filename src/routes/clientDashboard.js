const express = require('express');

const ClientController = require('../controllers/dashboard/ClientController');
const AuthMiddleware = require('../middlewares/auth');

const clientDashboard = express.Router();

clientDashboard.get('/client-dashboard/monthly-increase', AuthMiddleware, ClientController.monthlyIncrease);
clientDashboard.get('/client-dashboard/:type', AuthMiddleware, ClientController.financialData);

module.exports = clientDashboard;