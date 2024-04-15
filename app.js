const express = require("express");
const app = express();
const { getArticlesById } = require("./controllers/articles.controllers");
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
app.get("/api/articles/:article_id", getArticlesById);

// Error Handling:

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

// Invalid Endpoints:

app.use((req, res, next) => {
	res.status(400).json({ status: 400, msg: "Invalid endpoint." });
});

module.exports = app;
