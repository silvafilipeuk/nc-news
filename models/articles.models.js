const db = require("../db/connection");

function fetchArticles(topic) {
	let sqlString = `SELECT a.article_id, a.author, a.title, a.topic, a.created_at, a.votes, a.article_img_url, count(b.article_id)::int as comment_count FROM articles a
	LEFT JOIN comments b
	ON a.article_id = b.article_id `;

	if (topic) {
		sqlString += `WHERE a.topic = '${topic}' `;
	}

	sqlString += `GROUP BY a.article_id
	ORDER BY a.created_at desc`;

	return db.query(sqlString).then((articles) => {
		return articles.rows;
	});
}

function fetchArticlesById(article_id) {
	return db
		.query("SELECT * FROM articles WHERE article_id = $1", [article_id])
		.then((article) => {
			if (article.rows.length === 0) {
				return Promise.reject({
					status: 404,
					msg: "Article not found!",
				});
			}
			return article.rows[0];
		});
}

function updateArticlesById(article_id, inc_votes) {
	if (!inc_votes) {
		return Promise.reject({ status: 400, msg: "Bad request." });
	}

	return db
		.query(
			`UPDATE articles SET votes =
			CASE
				WHEN votes + $1 >= 0 THEN votes + $1
				ELSE 0
			END
			WHERE article_id = $2 RETURNING *`,
			[inc_votes, article_id]
		)
		.then((updatedArticle) => {
			return updatedArticle.rows;
		});
}

module.exports = { fetchArticles, fetchArticlesById, updateArticlesById };
