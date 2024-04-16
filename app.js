const express = require("express");
const app = express();
const {
	getArticles,
	getArticlesById,
} = require("./controllers/articles.controllers");
const {
	getCommentsByArticleId,
	postComment,
} = require("./controllers/comments.controllers");
const { getTopics } = require("./controllers/topics.controllers");
const { getApiInfo } = require("./controllers/api.controllers");
const {
	handleCustomErrors,
	handlePsqlErrors,
	handleServerErrors,
} = require("./middlewares/errorHandling");

// Endpoints:

app.get("/api", getApiInfo);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
//app.post("/api/articles/:article_id/comments", postComment);

// Error Handling:

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

// Invalid Endpoints:

app.use((req, res, next) => {
	res.status(404).json({ status: 404, msg: "Invalid endpoint." });
});

module.exports = app;
