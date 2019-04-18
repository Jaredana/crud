var app = require('./app');
var port = process.env.PORT || 3000;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Custom-header, token");
  res.header("Access-Control-Expose-Headers: X-Custom-header, token");
  next();
});
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});