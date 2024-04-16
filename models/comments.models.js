const db = require("../db/connection");

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

module.exports = { fetchCommentsByArticleId };
