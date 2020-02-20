const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const { host, port, user, pass } = require('../configs/mail.json');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
});

transport.use('compile', hbs({
    viewEngine: {
        extName: '.html',
        partialsDir: path.resolve('./src/resources/templates/'),
        layoutsDir: path.resolve('./src/resources/templates/'),
        defaultLayout: 'mail-forgot-password.html',
    },
    viewPath: path.resolve('./src/resources/templates/'),
    extName: '.html',
}));

module.exports = transport;

