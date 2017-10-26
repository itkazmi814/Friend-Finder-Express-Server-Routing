var friendsArr = require("../data/friends.js")

function apiRoutesListeners(app) {

	//Grabs friendsArr and displays as a JSON object when user accesses /api/friends
	app.get("/api/friends", (req,res) => {
		return res.json(friendsArr)
	})

	//When a new friend is posted to /api/friends/new,
	app.post("/api/friends/new", (req, res) => { 
		var newFriend = req.body;
	
		var differences = [];

		var matchIndex = 0;

		for(var i=0; i<friendsArr.length; i++) {
			//create a comparison value
			var total = 0;
			//for each question
			for(var j=0; j<newFriend.scores.length; j++) {
				//compare their score against yours and add the numbers up
				total += updateScoreTotal(newFriend.scores[j],friendsArr[i].scores[j])
			}
			//store the total score difference in an array
			differences.push(total);
			//check if there is a better match
			//look into a proper sorting algorithm for this
			//some sort that returns the index of the smallest value in the array
			//a better way to do this:
			//store the differences value in the person's object in the friendsArr
			//do differences = friendsArr and then do all of this with that array so any changes and resorting are local
			//CONCERN: updating a value in an object in differences may update in friendsArr. this happens for sure for objects, need to see if it is the case for arrays. see the code I got from daniel. 
			//pass by reference (or pointer in some languages. tells the spot in memory to point to, not the value to go to) vs pass by value 
			//probably just use a proper sort function and move around the indexes of my friends arr
			//look at ways to duplicate my array. try slice? then i can do a proper sort
			matchIndex = updateMatchIndex(i,matchIndex,total,differences[matchIndex])
		}
		
		console.log("differences:")
			console.log(differences)
		var match = friendsArr[matchIndex];
		console.log("your match is " + match.name)

		friendsArr.push(newFriend)	
		//returns this value to the post ajax call on the client side
		res.json(match);

	})
}


function determineMatch (newFriend, friendsArr){
}

function updateMatchIndex (i, currentMatchIndex, currentTotal, currentMatchTotal) {
	if(i === 0){
		return 0;
	} else if (currentTotal < currentMatchTotal) { 
		return i;
	}
	return currentMatchIndex;
}

function updateScoreTotal (newFriendScore, otherFriendScore) {
	var newFriendInt = parseInt(newFriendScore);
	var otherFriendInt = parseInt(otherFriendScore);
	var diff = Math.abs(newFriendInt - otherFriendInt);

	return diff;
}
	


module.exports = apiRoutesListeners;