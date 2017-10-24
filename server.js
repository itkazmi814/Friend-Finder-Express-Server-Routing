var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var getAllFriends = require("./app/routing/apiRoutes.js");

var app = express();
var PORT = process.env.PORT || 3050;

//this line displays a "body-parser deprecated" error
// app.use(bodyParser.urlencoded({encoded: false}));
app.use(bodyParser.json());
	
console.log(getAllFriends);

getAllFriends(app)


// function getAllFriends(app) {
// 	app.get("/api/friends", (req,res) => {
// 		return res.json(friendsArr)
// 	})
// }

app.listen(PORT, () => {
	console.log("App listening on PORT " + PORT);
})
