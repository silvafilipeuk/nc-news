const {
	fetchArticles,
	fetchArticlesById,
} = require("../models/articles.models");

function getArticles(req, res, next) {
	fetchArticles()
		.then((articles) => {
			res.status(200).json({ articles: articles });
		})
		.catch((err) => {
			next(err);
		});
}

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

module.exports = { getArticles, getArticlesById };
