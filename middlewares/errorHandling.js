const handleCustomErrors = (err, req, res, next) => {
	if (err.status && err.msg) {
		res.status(err.status).json({ status: err.status, msg: err.msg });
	}

	next(err);
};

const handlePsqlErrors = (err, req, res, next) => {
	// CODE 22003 - Value is out of range for type integer
	if (err.code === "22003") {
		res.status(400).json({ status: 400, msg: "Invalid ID." });
	}

	// CODE 22P02 - Invalid input syntax for type integer
	if (err.code === "22P02") {
		res.status(400).json({ status: 400, msg: "Invalid ID." });
	}

	// CODE 23502 - SQL Violation of not-null constraint
	if (err.code === "23502") {
		res.status(400).json({ status: 400, msg: "Bad request." });
	}

	// CODE 23503 = SQL Violation of foreign key constraint
	if (err.code === "23503") {
		res.status(403).json({ status: 403, msg: "Username not found." });
	}

	next(err);
};

const handleServerErrors = (err, req, res, next) => {
	res.status(500).json({
		status: 500,
		msg: "Internal Server Error, please try again later.",
	});
};

module.exports = { handleCustomErrors, handlePsqlErrors, handleServerErrors };
