const { selectUsers } = require("../models/users.models");

function getUsers(req, res, next) {
	selectUsers()
		.then((users) => {
			res.status(200).json({ users: users });
		})
		.catch((err) => {
			next(err);
		});
}

module.exports = { getUsers };
