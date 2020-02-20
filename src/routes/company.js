const express = require('express');

const CompanyController = require('../controllers/CompanyController');
const AuthMiddleware = require('../middlewares/auth');

const company = express.Router();

company.get('/companies', AuthMiddleware, CompanyController.list);
company.get('/companies/:companyId', AuthMiddleware, CompanyController.byId);
company.post('/companies', CompanyController.create);

module.exports = company;