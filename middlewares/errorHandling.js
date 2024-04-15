const handleCustomErrors = (err, req, res, next) => {
	if (err.status && err.msg) {
		res.status(err.status).json({ status: err.msg, msg: err.msg });
	} else next(err);
};

module.exports = handleCustomErrors;
