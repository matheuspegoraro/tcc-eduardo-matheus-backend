const express = require('express');

const ClientController = require('../controllers/ClientController');
const AuthMiddleware = require('../middlewares/auth');

const company = express.Router();

company.get('/clients', AuthMiddleware, ClientController.list);

module.exports = company;