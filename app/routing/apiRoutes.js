var friendsArr = require("../data/friends.js")

function apiRoutesListeners(app) {

	//Grabs friendsArr and displays as a JSON object when user accesses /api/friends
	app.get("/api/friends", (req,res) => {
		return res.json(friendsArr)
	})

	//When a new friend is posted to /api/friends/new,
	app.post("/api/friends/new", (req, res) => { 
		var newFriend = req.body;
		//Creates a deep copy of the friendsArr - is there a more efficient way to do this?
		var differencesArr = JSON.parse(JSON.stringify(friendsArr));
		//Calculates the difference in scores between newFriend and all existing people
		differencesArr = calculateDifferences(differencesArr, newFriend);
		//Sort people smallest to largest, using total
		differencesArr.sort((a,b) => a.total-b.total );
		friendsArr.push(newFriend);
	
		//Return person with smallest total as the match
		res.json(differencesArr[0]);
	})
}

function calculateDifferences (differencesArr,newFriend) {
	// For every existing person 
	differencesArr.forEach( person => {
		var total = 0;
		//compare their score against yours and add the numbers up
		for(var i=0; i<newFriend.scores.length; i++) {
			total += Math.abs(newFriend.scores[i] - person.scores[i]) 
		}
		//Store the calculated total as a key to person we ae calculating against
		person.total = total;
	}) 
	//why did this work when it returned differences? diferences dne anywhere
	return differencesArr;
}
	
module.exports = apiRoutesListeners; 
