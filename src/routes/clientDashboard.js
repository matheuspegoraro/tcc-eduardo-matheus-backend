const express = require('express');

const ClientController = require('../controllers/dashboard/ClientController');
const AuthMiddleware = require('../middlewares/auth');

const clientDashboard = express.Router();

clientDashboard.get('/client-dashboard/higher-category-spending', AuthMiddleware, ClientController.higherCategorySpending);
clientDashboard.get('/client-dashboard/projected-liquidity', AuthMiddleware, ClientController.projectedLiquidity);
clientDashboard.get('/client-dashboard/current-liquidity', AuthMiddleware, ClientController.currentLiquidity);
clientDashboard.get('/client-dashboard/:type', AuthMiddleware, ClientController.financialData);

module.exports = clientDashboard;