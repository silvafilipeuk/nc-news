const { fetchTopics } = require("../models/topics.models");

function getTopics(req, res, next) {
	fetchTopics().then((topics) => {
		res.status(200).json({
			topics: topics,
		});
	});
}

module.exports = { getTopics };
