var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var apiRoutesListeners = require("./app/routing/apiRoutes.js");
var htmlRoutesListeners = require("./app/routing/htmlRoutes.js");

var app = express();
var PORT = process.env.PORT || 3000;

//this line displays a "body-parser deprecated" error
app.use(bodyParser.urlencoded({encoded: false, extended: true}));
app.use(bodyParser.json());


apiRoutesListeners(app)

htmlRoutesListeners(app,path);

app.listen(PORT, () => {
	console.log("App listening on PORT " + PORT);
})

//