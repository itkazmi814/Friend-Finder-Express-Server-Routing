var friendsArr = require("../data/friends.js")

function totalDifference () {
	// User 1: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
	// User 2: [3, 2, 6, 4, 5, 1, 2, 5, 4, 1]
	// Total Difference: 2 + 1 + 2 = 5

	//use Math.abs to calculate difference
	//Closest match => user with least amount of difference
}

function getAllFriends(app) {
	app.get("/api/friends", (req,res) => {
		return res.json(friendsArr)
	})
}

console.log("friendsArr: ");
console.log(friendsArr);

module.exports = getAllFriends;

