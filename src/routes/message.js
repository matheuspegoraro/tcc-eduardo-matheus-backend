const express = require('express');

const MessageController = require('../controllers/MessageController');

const AuthMiddleware = require('../middlewares/auth');

const messages = express.Router();

messages.get('/messages', AuthMiddleware, MessageController.history);
messages.post('/messages', AuthMiddleware, MessageController.create);

module.exports = messages;