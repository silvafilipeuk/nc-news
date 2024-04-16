const {
	fetchCommentsByArticleId,
	insertComment,
} = require("../models/comments.models");
const { fetchArticlesById } = require("../models/articles.models");

function getCommentsByArticleId(req, res, next) {
	const { article_id } = req.params;

	Promise.all([
		fetchCommentsByArticleId(article_id),
		fetchArticlesById(article_id),
	])
		.then(([comments]) => {
			res.status(200).json({ comments: comments });
		})
		.catch((err) => {
			next(err);
		});
}

function postComment(req, res, next) {
	const { article_id } = req.params;
	const { username, body } = req.body;

	fetchArticlesById(article_id)
		.then((article) => {
			insertComment(article.article_id, username, body)
				.then((comment) => {
					res.status(201).json({ comment: comment });
				})
				.catch((err) => {
					next(err);
				});
		})
		.catch((err) => {
			next(err);
		});
}

module.exports = { getCommentsByArticleId, postComment };
