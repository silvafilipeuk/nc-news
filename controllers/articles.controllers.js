const { fetchArticlesById } = require("../models/articles.models");

function getArticlesById(req, res, next) {
	const { article_id } = req.params;

	fetchArticlesById(article_id)
		.then((article) => {
			res.status(200).json({ article: article });
		})
		.catch((err) => {
			next(err);
		});
}

module.exports = { getArticlesById };
