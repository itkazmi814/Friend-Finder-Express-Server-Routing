//using an on submit for the form instead of an on click
	// form . on submit =>
	//$("#id of the form").on("submit", event => fxn)
$("#submit-btn").on("click", event => {
	event.preventDefault();
	//this prevents the event from triggering anything on parent elements
	//good example -> if you click on a submit btn in a form, you only want to click the listener attached to that submit, not any listeners attached to any other elements of the form that technically also did get clicked. this is called event bubbling
	//tldr - stops any parent listeners from triggering
	event.stopPropagation();

	var scores = []

	for(var i=0; i<10; i++) {
		scores.push($(`#q${i+1}Answer`).val());
	}


	//Add Input Validation
	//consider **file input** to make sure something is a photo
	//check format of text
		//easier -> - correct file extensions? valid url in general?
		//more difficult -> go to url and verify contents
		var newFriend = {
			name: $("#name-answer").val().trim(),
			photo: $("#photo-answer").val().trim(),
			scores: scores,
			total
		//for expansion - scores
		//instead of an array, make an object
		//make an array of objects
		//each of those objects holds data related to the question itself (question title, id, response)
		//this keeps how you handle questions in the future more modular
	}

	$.post("/api/friends/new", newFriend, match => {
		$("#match-name").text(match.name) 
		$("#match-photo").attr("src",match.photo);
	}).then( () => $("#match-modal").modal() )
	
	//return false inside of your listener is the equivallent of having both event.preventDefault and event.stopPropogation
});