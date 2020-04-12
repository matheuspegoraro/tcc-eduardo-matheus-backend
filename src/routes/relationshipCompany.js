const express = require('express');

const RelationshipCompanyController = require('../controllers/RelationshipCompanyController');
const AuthMiddleware = require('../middlewares/auth');

const company = express.Router();

company.get('/relationship-company/:advisoryId', AuthMiddleware, RelationshipCompanyController.byId);
company.post('/relationship-company', AuthMiddleware, RelationshipCompanyController.create);

module.exports = company;