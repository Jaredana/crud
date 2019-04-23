var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AuthController = require('./auth/authcontroller');
var TicketController = require('./ticket/ticketcontroller');
const path = require('path');
var app = express();

var distDir = path.join('/app' + '/dist/crud/');
app.use(express.static(distDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())


app.get('*', (req,res) => {
    res.sendFile(distDir + 'index.html');
});

//urls must have /api/ in front due to proxy config'd in angular app(to deal with CORS)

app.use('/api/auth', AuthController);
app.use('/api/ticket', TicketController);
module.exports = app;
