var friendsArr = require("../data/friends.js")

function apiRoutesListeners(app) {

	//Grabs friendsArr and displays as a JSON object when user accesses /api/friends
	app.get("/api/friends", (req,res) => {
		return res.json(friendsArr)
	})

	//When a new friend is posted to /api/friends/new,
	app.post("/api/friends/new", (req, res) => { 
		var newFriend = req.body;
		//create a copy of the friendsArr to work off of that will not update the friendsArr reference
		const differences = friendsArr.slice();
		console.log(friendsArr)
	
		// For every existing person 
		for(var i=0; i<differences.length; i++) {

			var total = 0;

			for(var j=0; j<newFriend.scores.length; j++) {
				//compare their score against yours and add the numbers up
				total += updateScoreTotal(newFriend.scores[j],differences[i].scores[j])
			}
			//Add the calculated total as a key to person we ae calculating against
			differences[i].total = total;
		}
		//Sort smallest to largest by total
		differences.sort((a,b) => a.total-b.total );
		console.log("DIFFERENCES")
		console.log(differences)
		console.log("FRIENDS ARR")
		console.log(friendsArr)

		var match = differences[0];
		console.log("your match is " + match.name)
		friendsArr.push(newFriend)	
		
		//Return differences[0] as the match
		res.json(match);
	})
}
		// 	//a better way to do this:
		// 	//store the differences value in the person's object in the friendsArr
		// 	//do differences = friendsArr and then do all of this with that array so any changes and resorting are local
		// 	//CONCERN: updating a value in an object in differences may update in friendsArr. this happens for sure for objects, need to see if it is the case for arrays. see the code I got from daniel. 
		// 	//pass by reference (or pointer in some languages. tells the spot in memory to point to, not the value to go to) vs pass by value 
		// 	//look at ways to duplicate my array. try slice? then i can do a proper sort

function updateScoreTotal (newFriendScore, otherFriendScore) {
	var newFriendInt = parseInt(newFriendScore);
	var otherFriendInt = parseInt(otherFriendScore);
	var diff = Math.abs(newFriendInt - otherFriendInt);

	return diff;
}
	
module.exports = apiRoutesListeners;