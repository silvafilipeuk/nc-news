const db = require("../db/connection");

function fetchArticles() {
	return db
		.query(
			`SELECT a.article_id, a.author, a.title, a.topic, a.created_at, a.votes, a.article_img_url, count(b.article_id)::int as comment_count FROM articles a
			LEFT JOIN comments b
			ON a.article_id = b.article_id
			GROUP BY a.article_id
			ORDER BY a.created_at desc`
		)
		.then((articles) => {
			return articles.rows;
		});
}

function fetchArticlesById(article_id) {
	return db
		.query("SELECT * from articles WHERE article_id = $1", [article_id])
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

module.exports = { fetchArticles, fetchArticlesById };
