var friends = require("../data/friends.js")


$("#submit-btn").on("click", event => {
	event.preventDefault();

	var newFriend = {
		"name": "testName",
		"photo": "testPhoto",
		"scores": [1,2,3,4,5,6,7,8,9,10]
	}

	$.post("/api/friends/new", newFriend).done( data => {
		console.log(data);
		alert("Adding character...");
	})
});
