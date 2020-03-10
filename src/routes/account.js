const express = require('express');

const MovementController = require('../controllers/MovementController');
const AuthMiddleware = require('../middlewares/auth');
const PermissionMiddleware = require('../middlewares/permission');

const movement = express.Router();

const ADMINISTRATOR = 1;

movement.get('/movements', AuthMiddleware, MovementController.list);
movement.get('/movements/:movementId', AuthMiddleware, MovementController.byId);
movement.post('/movements', AuthMiddleware, PermissionMiddleware(ADMINISTRATOR), MovementController.create);
movement.put('/movements/:movementId', AuthMiddleware, PermissionMiddleware(ADMINISTRATOR), MovementController.update);

module.exports = movement;