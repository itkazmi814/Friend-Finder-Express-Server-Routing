//default, catch-all route that leads to home.html
function htmlRoutesListeners(app, path) {
	app.get("/", (req, res) => {
		return res.sendFile(path.join(__dirname, "../public/home.html"));
	});

	app.get("/survey", (req, res) => {
		return res.sendFile(path.join(__dirname, "../public/survey.html"));
	});
}

module.exports = htmlRoutesListeners;