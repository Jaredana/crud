var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AuthController = require('./auth/authcontroller');
var TicketController = require('./ticket/ticketcontroller');
const path = require('path');
var app = express();
/* TODO:
display a login page for root website directory '/'
build a form in angular, and link it to register view, so users can be registered from angular site
allow users to be viewed from angular page(pretty much just connect node and angular)
*/
//need to serve index.html in dist to node serer, it is entrance to angular app
var distDir = path.join(__dirname + '/dist/crud/');
console.log('directory chose: ' + distDir);
app.use(express.static(distDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())


app.get('*', (req,res) => {
    res.sendFile(__dirname + '/dist/index.html');
});
//urls must have /api/ in front due to proxy config'd in angular app(to deal with CORS)


app.use('/api/auth', AuthController);
app.use('/api/ticket', TicketController);
module.exports = app;
