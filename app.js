const express = require("express");
const app = express();
const {
	getArticles,
	getArticlesById,
	patchVotesByArticleId,
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

app.use(express.json());

// Endpoints:

app.get("/api", getApiInfo);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", postComment);
app.patch("/api/articles/:article_id", patchVotesByArticleId);

// Error Handling:

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

// Invalid Endpoints:

app.use((req, res, next) => {
	res.status(404).json({ status: 404, msg: "Invalid endpoint." });
});

module.exports = app;
