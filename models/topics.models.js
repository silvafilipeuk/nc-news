const db = require("../db/connection");

function fetchTopics(topic) {
	let sqlString = "SELECT * FROM topics ";

	if (topic) {
		sqlString += `where slug = '${topic}'`;
	}
	return db.query(sqlString).then((topics) => {
		if (topics.rows.length === 0) {
			return Promise.reject({ status: 404, msg: "Topic not found." });
		}
		return topics.rows;
	});
}

module.exports = { fetchTopics };
