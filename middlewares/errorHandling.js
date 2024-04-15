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

	next(err);
};

const handleServerErrors = (err, req, res, next) => {
	res.status(500).json({
		status: 500,
		msg: "Internal Server Error, please try again later.",
	});
};

module.exports = { handleCustomErrors, handlePsqlErrors, handleServerErrors };
