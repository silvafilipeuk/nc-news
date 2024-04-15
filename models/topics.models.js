const db = require("../db/connection");

function fetchTopics() {
	return db.query("SELECT * FROM topics").then((topics) => {
		return topics.rows;
	});
}

module.exports = { fetchTopics };
