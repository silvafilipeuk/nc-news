const db = require("../db/connection");
const { convertTimestampToDate } = require("../db/seeds/utils");

function fetchCommentsByArticleId(article_id) {
	return db
		.query(
			"select * FROM comments WHERE article_id = $1 order by created_at desc",
			[article_id]
		)
		.then((comments) => {
			return comments.rows;
		});
}

function insertComment(article_id, username, body) {
	const { created_at } = convertTimestampToDate({
		created_at: new Date().getTime(),
	});

	return db
		.query(
			`INSERT INTO comments (body, article_id, author, votes, created_at) values
			($1, $2, $3, $4, $5) RETURNING *`,
			[body, article_id, username, 0, created_at]
		)
		.then((comment) => {
			return comment.rows;
		});
}

function selectCommentById(comment_id) {
	return db
		.query("SELECT * FROM comments WHERE comment_id = $1", [comment_id])
		.then((response) => {
			console.log(response.rows);
			if (response.rows.length === 0) {
				return Promise.reject({
					status: 404,
					msg: "Comment not found.",
				});
			}
			return response.rows;
		});
}

function removeCommentById(comment_id) {
	return db
		.query("DELETE FROM comments WHERE comment_id = $1", [comment_id])
		.then((response) => {
			return response.rows;
		});
}

module.exports = {
	fetchCommentsByArticleId,
	insertComment,
	selectCommentById,
	removeCommentById,
};
