var friendsArr = require("../data/friends.js")

function determineMatch (newFriend) {
	var differences = [];
	var match = 0;
	//for every single person currently in the friends array
	for(var i=0; i<friendsArr.length; i++) {
		//create a comparison value
		var total = 0;
		//for each question
		for(var j=0; j<newFriend.scores.length; j++) {
			//compare their score against yours and add the numbers up
			var newFriendScore = parseInt(newFriend.scores[j])
			var otherFriendScore = parseInt(friendsArr[i].scores[j]);
			total += Math.abs(newFriendScore - otherFriendScore)
		}
		//store the total score difference in an array
		differences.push(total);
		//check if there is a better match
		if(i===0){
			match = differences[i]
		} else if(differences[i] < match) {
			match = i;
		}
			
	}
	console.log("differences: " + differences)
	console.log("your match is " + friendsArr[match].name)
}



function apiRoutesListeners(app) {

	app.get("/api/friends", (req,res) => {
		return res.json(friendsArr)
	})

	app.post("/api/friends/new", (req, res) => { 
		var newFriend = req.body;
		determineMatch(newFriend);
		friendsArr.push(newFriend)		
	})
}

module.exports = apiRoutesListeners;

