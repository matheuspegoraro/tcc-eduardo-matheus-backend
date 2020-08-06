const express = require('express');

const RelationshipCompanyController = require('../controllers/RelationshipCompanyController');
const RevenueController = require('../controllers/RevenueController');
const ExpenseController = require('../controllers/ExpenseController');
const TransfersController = require('../controllers/TransfersController');

const AuthMiddleware = require('../middlewares/auth');

const company = express.Router();

company.get('/relationship-company', AuthMiddleware, RelationshipCompanyController.byCompanyId);
company.get('/relationship-company/:clientId', AuthMiddleware, RelationshipCompanyController.byClientId);
company.post('/relationship-company', AuthMiddleware, RelationshipCompanyController.create);
company.delete('/relationship-company/:relationshipId', AuthMiddleware, RelationshipCompanyController.delete);

company.get('/relationship-company/revenues/:clientCompanyId', AuthMiddleware, RevenueController.list);
company.get('/relationship-company/expenses/:clientCompanyId', AuthMiddleware, ExpenseController.list);
company.get('/relationship-company/transfers/:clientCompanyId', AuthMiddleware, TransfersController.list);

module.exports = company;