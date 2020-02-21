const express = require("express");
const fs = require('fs');

const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

//const io = require('socket.io')(server);
//socket = io.listen(process.env.PORT);

const port = process.env.PORT || 5000;

require('./database');

app.use(express.json());
app.use(cors());

fs.readdir(__dirname + '/routes', (err, routes) => {
    routes.forEach(route => {
        app.use(require(__dirname + '/routes/' + route));
    });
});

server.listen(port, () => console.log(`Listening on ${ port } port`));