const express = require('express');

const AdvisoryController = require('../controllers/dashboard/AdvisoryController');
const AuthMiddleware = require('../middlewares/auth');

const advisoryDashboard = express.Router();

advisoryDashboard.get('/advisory-dashboard/:type', AuthMiddleware, AdvisoryController.financialData);

module.exports = advisoryDashboard;