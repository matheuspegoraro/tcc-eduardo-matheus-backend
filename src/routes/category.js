const express = require('express');

const CategoryController = require('../controllers/CategoryController');
const AuthMiddleware = require('../middlewares/auth');
const PermissionMiddleware = require('../middlewares/permission');

const category = express.Router();

const ADMINISTRATOR = 1;

category.get('/categories', AuthMiddleware, CategoryController.list);
category.get('/categories/:categoryId', AuthMiddleware, CategoryController.byId);
category.post('/categories', AuthMiddleware, CategoryController.create);
category.put('/categories/:categoryId', AuthMiddleware, CategoryController.edit);
category.delete('/categories/:categoryId', AuthMiddleware, CategoryController.delete);

module.exports = category;