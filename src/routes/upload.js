const express = require('express');
const multer = require('multer');

const UploadController = require('../controllers/UploadController');
const AuthMiddleware = require('../middlewares/auth');
const multerConfig = require('../configs/multer');

const upload = express.Router();

upload.post('/upload/ofx/confirm', AuthMiddleware, UploadController.confirm);
upload.post('/upload/ofx', AuthMiddleware, multer(multerConfig).single('fileOfx'), UploadController.upload);

module.exports = upload;