const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controllers");
const handleCustomErrors = require("./middlewares/errorHandling");

app.use(express.json());
app.use(handleCustomErrors);

app.get("/api/topics", getTopics);

app.use((req, res, next) => {
	res.status(404).json({ msg: "Invalid endpoint." });
});

module.exports = app;
