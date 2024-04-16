const {
	fetchArticles,
	fetchArticlesById,
	updateArticlesById,
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

function patchVotesByArticleId(req, res, next) {
	const { article_id } = req.params;
	const { inc_votes } = req.body;

	Promise.all([
		updateArticlesById(article_id, inc_votes),
		fetchArticlesById(article_id),
	])
		.then(([updatedArticle]) => {
			res.status(200).json({ article: updatedArticle });
		})
		.catch((err) => {
			next(err);
		});
}

module.exports = { getArticles, getArticlesById, patchVotesByArticleId };
