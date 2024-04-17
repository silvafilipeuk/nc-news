const db = require("../db/connection");

function selectUsers() {
	return db.query("SELECT * FROM USERS").then((users) => {
		return users.rows;
	});
}

module.exports = { selectUsers };
