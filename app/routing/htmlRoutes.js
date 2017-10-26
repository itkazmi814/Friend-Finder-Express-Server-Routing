function htmlRoutesListeners(app, path) {

	//Displays home.html when user accesses root
	app.get("/", (req, res) => {
		return res.sendFile(path.join(__dirname, "../public/home.html"));
	});

	//Displays survey.html when user accesses /survey
	app.get("/survey", (req, res) => {
		return res.sendFile(path.join(__dirname, "../public/survey.html"));
	});
}

module.exports = htmlRoutesListeners;