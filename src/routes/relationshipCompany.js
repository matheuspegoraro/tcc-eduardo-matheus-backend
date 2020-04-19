const express = require('express');

const RelationshipCompanyController = require('../controllers/RelationshipCompanyController');
const AuthMiddleware = require('../middlewares/auth');

const company = express.Router();

company.get('/relationship-company/:clientId', AuthMiddleware, RelationshipCompanyController.byClientId);
company.post('/relationship-company', AuthMiddleware, RelationshipCompanyController.create);
company.delete('/relationship-company/:relationshipId', AuthMiddleware, RelationshipCompanyController.delete);

module.exports = company;