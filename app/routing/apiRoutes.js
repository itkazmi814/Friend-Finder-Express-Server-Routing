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
		var differences = JSON.parse(JSON.stringify(friendsArr));
		//Calculates the difference in scores between newFriend and all existing people
		differences = calculateDifferences(differences, newFriend);
		//Sort people smallest to largest, using total
		differences.sort((a,b) => a.total-b.total );
		friendsArr.push(newFriend);
		
		console.log("DIFFERENCES");
		console.log(differences);
		console.log("FRIENDS ARR");
		console.log(friendsArr);
		console.log("Your match: ");
		console.log(differences[0]);

		//Return person with smallest total as the match
		res.json(differences[0]);
	})
}

function calculateDifferences (differences,newFriend) {
	// For every existing person 
	differences.forEach( person => {
		var total = 0;
		for(var j=0; j<newFriend.scores.length; j++) {
			//compare their score against yours and add the numbers up
			total += Math.abs(newFriend.scores[j] - person.scores[j]) 
		}
		//Store the calculated total as a key to person we ae calculating against
		person.total = total;
	}) 
	
	return differences;
}
	
module.exports = apiRoutesListeners;