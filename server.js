var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;

 
app.use(express.static(path.join(__dirname, "./app/public")));
app.use(bodyParser.urlencoded({encoded: false, extended: true}));
app.use(bodyParser.json());

//Imports listeners used to route between the client and servers
var apiRoutesListeners = require("./app/routing/apiRoutes.js");
var htmlRoutesListeners = require("./app/routing/htmlRoutes.js");

//Calls the listeners
apiRoutesListeners(app)
htmlRoutesListeners(app,path);

app.listen(PORT);
