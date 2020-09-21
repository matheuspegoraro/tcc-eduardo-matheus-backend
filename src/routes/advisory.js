const express = require('express');

const AdvisoryController = require('../controllers/AdvisoryController');
const AuthMiddleware = require('../middlewares/auth');

const company = express.Router();

company.get('/advisories', AuthMiddleware, AdvisoryController.list);
company.get('/relationship-clients', AuthMiddleware, AdvisoryController.byAdvisory);

module.exports = company;