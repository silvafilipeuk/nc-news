const {
	fetchArticles,
	fetchArticlesById,
	updateArticlesById,
	insertArticle,
} = require("../models/articles.models");
const { fetchTopics } = require("../models/topics.models");

function getArticles(req, res, next) {
	const { sort_by, topic, order } = req.query;

	Promise.all([fetchArticles(topic, sort_by, order), fetchTopics(topic)])
		.then(([articles]) => {
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

function postArticle(req, res, next) {
	const article = req.body;

	insertArticle(article)
		.then((article) => {
			res.status(201).json({ article: article });
		})
		.catch((err) => {
			next(err);
		});
}

module.exports = {
	getArticles,
	getArticlesById,
	patchVotesByArticleId,
	postArticle,
};
