const { fetchCommentsByArticleId } = require("../models/comments.models");
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

module.exports = { getCommentsByArticleId };
