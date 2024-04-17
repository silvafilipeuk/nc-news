const app = require("../app");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data");
const { convertTimestampToDate } = require("../db/seeds/utils");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/api", () => {
	test("GET STATUS 200: should return an object describing all the available endpoinst on the API.", () => {
		const endpoints = require("../endpoints.json");
		return request(app)
			.get("/api")
			.expect(200)
			.then((apiEndpoints) => {
				expect(apiEndpoints.body.endpoints).toEqual(endpoints);
			});
	});
});

describe("/api/topics", () => {
	test("GET STATUS 200: should return an array of all topic objects with slug and description properties.", () => {
		return request(app)
			.get("/api/topics")
			.expect(200)
			.then((topics) => {
				expect(topics.body.topics.length).toBe(3);
				topics.body.topics.forEach((topic) => {
					expect(typeof topic.description).toBe("string");
					expect(typeof topic.slug).toBe("string");
				});
				expect(topics.body.topics[0]).toMatchObject({
					description: "The man, the Mitch, the legend",
					slug: "mitch",
				});
			});
	});
	test("GET STATUS 400: should return appropriate message for the client when requested an invalid endpoint", () => {
		return request(app)
			.get("/api/t0pics")
			.expect(404)
			.then((response) => {
				expect(response.body.status).toBe(404);
				expect(response.body.msg).toBe("Invalid endpoint.");
			});
	});
});

describe("/api/articles", () => {
	test("GET STATUS 200: should return an array of articles objects with their respective properties.", () => {
		return request(app)
			.get("/api/articles")
			.expect(200)
			.then((articles) => {
				expect(articles.body.articles.length).toBe(13);
				expect(articles.body.articles[0]).toMatchObject({
					article_id: 3,
					author: "icellusedkars",
					title: "Eight pug gifs that remind me of mitch",
					topic: "mitch",
					created_at: convertTimestampToDate(1604394720000),
					votes: 0,
					article_img_url:
						"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
					comment_count: 2,
				});
				expect(articles.body.articles).toBeSortedBy("created_at", {
					descending: true,
				});
			});
	});
	test("GET STATUS 400: should return appropriate message for the client when requested an invalid endpoint", () => {
		return request(app)
			.get("/api/art1cles")
			.expect(404)
			.then((response) => {
				expect(response.body.status).toBe(404);
				expect(response.body.msg).toBe("Invalid endpoint.");
			});
	});
});

describe("/api/articles/:article_id", () => {
	test("GET STATUS 200: should return an article object for a given id.", () => {
		return request(app)
			.get("/api/articles/1")
			.expect(200)
			.then((article) => {
				expect(article.body.article).toMatchObject({
					title: "Living in the shadow of a great man",
					topic: "mitch",
					author: "butter_bridge",
					body: "I find this existence challenging",
					created_at: convertTimestampToDate(1594329060000),
					votes: 100,
					article_img_url:
						"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
				});
			});
	});

	test("GET STATUS 404: should return an appropriate response if given an ID that is not in the database.", () => {
		return request(app)
			.get("/api/articles/9999")
			.expect(404)
			.then((response) => {
				expect(response.body.status).toBe(404);
				expect(response.body.msg).toBe("Article not found!");
			});
	});

	test(`GET STATUS 400: should return an appropriate response if given an ID that is not in the database.
		This test is forcing a PSQL ERROR to be treated. (id out of the psql integer range)`, () => {
		return request(app)
			.get("/api/articles/999999999999999999")
			.expect(400)
			.then((response) => {
				expect(response.body.status).toBe(400);
				expect(response.body.msg).toBe("Bad request.");
			});
	});
	test(`GET STATUS 400: should return an appropriate response if given an ID that is not in the database.
		This test is forcing a PSQL ERROR to be treated. (invalid input syntax for type integer: "string")`, () => {
		return request(app)
			.get("/api/articles/ddd")
			.expect(400)
			.then((response) => {
				expect(response.body.status).toBe(400);
				expect(response.body.msg).toBe("Bad request.");
			});
	});
	test(`GET STATUS 400: should return an appropriate response if misstyped endpoint)`, () => {
		return request(app)
			.get("/api/article/1")
			.expect(404)
			.then((response) => {
				expect(response.body.status).toBe(404);
				expect(response.body.msg).toBe("Invalid endpoint.");
			});
	});
});

describe("/api/articles/:article_id/comments", () => {
	test("GET STATUS 200: should return an array of comments for the given article_id.", () => {
		return request(app)
			.get("/api/articles/1/comments")
			.expect(200)
			.then((comments) => {
				expect(comments.body.comments.length).toBe(11);
				comments.body.comments.forEach((comment) => {
					expect(comment).toMatchObject({
						comment_id: expect.any(Number),
						body: expect.any(String),
						votes: expect.any(Number),
						author: expect.any(String),
						article_id: expect.any(Number),
						created_at: expect.any(String),
					});
				});
				expect(comments.body.comments).toBeSortedBy("created_at", {
					descending: true,
				});
			});
	});
	test("GET STATUS 200: shoud return an empty array for an article that have no comments.", () => {
		return request(app)
			.get("/api/articles/2/comments")
			.expect(200)
			.then((comments) => {
				expect(comments.body.comments.length).toBe(0);
			});
	});
	test("GET STATUS 404: should return an appropriate message if the article does not exist.", () => {
		return request(app)
			.get("/api/articles/9999/comments")
			.expect(404)
			.then((response) => {
				expect(response.body.status).toBe(404);
				expect(response.body.msg).toBe("Article not found!");
			});
	});
	test(`GET STATUS 400: should return an appropriate response if given an ID that is not in the database.
		This test is forcing a PSQL ERROR to be treated. (id out of the psql integer range)`, () => {
		return request(app)
			.get("/api/articles/999999999999999999/comments")
			.expect(400)
			.then((response) => {
				expect(response.body.status).toBe(400);
				expect(response.body.msg).toBe("Bad request.");
			});
	});
	test(`GET STATUS 400: should return an appropriate response if given an ID that is not in the database.
		This test is forcing a PSQL ERROR to be treated. (invalid input syntax for type integer: "string")`, () => {
		return request(app)
			.get("/api/articles/ddd/comments")
			.expect(400)
			.then((response) => {
				expect(response.body.status).toBe(400);
				expect(response.body.msg).toBe("Bad request.");
			});
	});
	test(`GET STATUS 404: should return an appropriate response if misstyped endpoint)`, () => {
		return request(app)
			.get("/api/articles/1/comm3nts")
			.expect(404)
			.then((response) => {
				expect(response.body.status).toBe(404);
				expect(response.body.msg).toBe("Invalid endpoint.");
			});
	});
});

describe("POST - /api/articles/:article_id/comments", () => {
	test("POST STATUS 201: Should post a comment in the database and return the posted comment.", () => {
		const newPost = {
			username: "icellusedkars",
			body: "This is the icellusedkars new comment!",
		};

		return request(app)
			.post("/api/articles/2/comments")
			.send(newPost)
			.expect(201)
			.then((comment) => {
				expect(comment.body.comment.length).toBe(1);
				expect(comment.body.comment[0]).toMatchObject({
					comment_id: 19,
					body: "This is the icellusedkars new comment!",
					article_id: 2,
					author: "icellusedkars",
					votes: 0,
					created_at: expect.any(String),
				});
			});
	});
	test("POST STATUS 201: Should ignore not needed keys on the body object, post a comment in the database and return the posted comment.", () => {
		const newPost = {
			username: "icellusedkars",
			body: "This is the icellusedkars new comment!",
			votes: 100,
		};

		return request(app)
			.post("/api/articles/2/comments")
			.send(newPost)
			.expect(201)
			.then((comment) => {
				expect(comment.body.comment.length).toBe(1);
				expect(comment.body.comment[0]).toMatchObject({
					comment_id: 19,
					body: "This is the icellusedkars new comment!",
					article_id: 2,
					author: "icellusedkars",
					votes: 0,
					created_at: expect.any(String),
				});
			});
	});
	test("POST STATUS 400: Should return an appropriate message when passed an incomplete body (No username)", () => {
		const newPost = {
			body: "This is the icellusedkars new comment!",
		};
		return request(app)
			.post("/api/articles/2/comments")
			.send(newPost)
			.expect(400)
			.then((response) => {
				expect(response.body.msg).toBe("Bad request.");
			});
	});
	test("POST STATUS 400: Should return an appropriate message when passed an incomplete body (No body)", () => {
		const newPost = {
			username: "icellusedkars",
		};
		return request(app)
			.post("/api/articles/2/comments")
			.send(newPost)
			.expect(400)
			.then((response) => {
				expect(response.body.msg).toBe("Bad request.");
			});
	});
	test("POST STATUS 400: Should return an appropriate message when passed an invalid article ID", () => {
		const newPost = {
			username: "icellusedkars",
			body: "This is the icellusedkars new comment!",
		};
		return request(app)
			.post("/api/articles/ddd/comments")
			.send(newPost)
			.expect(400)
			.then((response) => {
				expect(response.body.msg).toBe("Bad request.");
			});
	});
	test("POST STATUS 404: Should return an appropriate message when passed an inexistent article ID", () => {
		const newPost = {
			username: "icellusedkars",
			body: "This is the icellusedkars new comment!",
		};
		return request(app)
			.post("/api/articles/999/comments")
			.send(newPost)
			.expect(404)
			.then((response) => {
				expect(response.body.msg).toBe("Article not found!");
			});
	});
	test("POST STATUS 404: Should return an appropriate message when passed an inexistent username", () => {
		const newPost = {
			username: "Filipe",
			body: "This is the Filipe's new comment!",
		};
		return request(app)
			.post("/api/articles/2/comments")
			.send(newPost)
			.expect(404)
			.then((response) => {
				expect(response.body.msg).toBe("Username not found.");
			});
	});
});

describe("PATCH /api/articles/:article_id", () => {
	test("STATUS 200: Should update the article with the new quantity of votes passed in the body object", () => {
		const newVote = { inc_votes: 1 };

		return request(app)
			.patch("/api/articles/1")
			.send(newVote)
			.expect(200)
			.then((updatedArticle) => {
				expect(updatedArticle.body.article.length).toBe(1);
				expect(updatedArticle.body.article[0]).toMatchObject({
					article_id: 1,
					title: "Living in the shadow of a great man",
					topic: "mitch",
					author: "butter_bridge",
					body: "I find this existence challenging",
					created_at: expect.any(String),
					votes: 101,
					article_img_url:
						"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
				});
			});
	});
	test("STATUS 200: Should update the article with the new quantity of votes passed in the body object (Testing for negative update)", () => {
		const newVote = { inc_votes: -50 };

		return request(app)
			.patch("/api/articles/1")
			.send(newVote)
			.expect(200)
			.then((updatedArticle) => {
				expect(updatedArticle.body.article.length).toBe(1);
				expect(updatedArticle.body.article[0]).toMatchObject({
					article_id: 1,
					title: "Living in the shadow of a great man",
					topic: "mitch",
					author: "butter_bridge",
					body: "I find this existence challenging",
					created_at: expect.any(String),
					votes: 50,
					article_img_url:
						"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
				});
			});
	});
	test("STATUS 200: Should update the article votes to ZERO when trying to decrease more than the current number of votes", () => {
		const newVote = { inc_votes: -110 };

		return request(app)
			.patch("/api/articles/1")
			.send(newVote)
			.expect(200)
			.then((updatedArticle) => {
				expect(updatedArticle.body.article.length).toBe(1);
				expect(updatedArticle.body.article[0]).toMatchObject({
					article_id: 1,
					title: "Living in the shadow of a great man",
					topic: "mitch",
					author: "butter_bridge",
					body: "I find this existence challenging",
					created_at: expect.any(String),
					votes: 0,
					article_img_url:
						"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
				});
			});
	});
	test("STATUS 200: Should ignore unecessary keys on the body object and still update votes", () => {
		const newVote = { inc_votes: 1, username: "Filipe" };

		return request(app)
			.patch("/api/articles/1")
			.send(newVote)
			.expect(200)
			.then((updatedArticle) => {
				expect(updatedArticle.body.article.length).toBe(1);
				expect(updatedArticle.body.article[0]).toMatchObject({
					article_id: 1,
					title: "Living in the shadow of a great man",
					topic: "mitch",
					author: "butter_bridge",
					body: "I find this existence challenging",
					created_at: expect.any(String),
					votes: 101,
					article_img_url:
						"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
				});
			});
	});
	test("STATUS 200: Should consider string '2' for inc_votes and still update the article.", () => {
		const newVote = { inc_votes: "2" };

		return request(app)
			.patch("/api/articles/1")
			.send(newVote)
			.expect(200)
			.then((updatedArticle) => {
				expect(updatedArticle.body.article.length).toBe(1);
				expect(updatedArticle.body.article[0]).toMatchObject({
					article_id: 1,
					title: "Living in the shadow of a great man",
					topic: "mitch",
					author: "butter_bridge",
					body: "I find this existence challenging",
					created_at: expect.any(String),
					votes: 102,
					article_img_url:
						"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
				});
			});
	});
	test("STATUS 404: Should return appropriate message for an inexistent article ID", () => {
		const newVote = { inc_votes: 1 };

		return request(app)
			.patch("/api/articles/999")
			.send(newVote)
			.expect(404)
			.then((response) => {
				expect(response.body.status).toBe(404);
				expect(response.body.msg).toBe("Article not found!");
			});
	});
	test("STATUS 400: Should return appropriate message for an invalid id type", () => {
		const newVote = { inc_votes: 1 };

		return request(app)
			.patch("/api/articles/ddd")
			.send(newVote)
			.expect(400)
			.then((response) => {
				expect(response.body.status).toBe(400);
				expect(response.body.msg).toBe("Bad request.");
			});
	});
	test("STATUS 400: Should return appropriate message for an invalid inc_votes type on the body object", () => {
		const newVote = { inc_votes: "string" };

		return request(app)
			.patch("/api/articles/1")
			.send(newVote)
			.expect(400)
			.then((response) => {
				expect(response.body.status).toBe(400);
				expect(response.body.msg).toBe("Bad request.");
			});
	});
	test("STATUS 400: Should return appropriate message for an invalid body object", () => {
		const newVote = { update_votes: 1 };

		return request(app)
			.patch("/api/articles/1")
			.send(newVote)
			.expect(400)
			.then((response) => {
				expect(response.body.status).toBe(400);
				expect(response.body.msg).toBe("Bad request.");
			});
	});
});

describe("DELETE /api/comments/:comment_id", () => {
	test("STATUS 200: Shoud delete a given comment and respond with status 204 and no content.", () => {
		return request(app)
			.delete("/api/comments/13")
			.expect(204)
			.then((response) => {
				expect(response.body).toEqual({});
			});
	});
	test("STATUS 404: Should return appropriate message when trying to remove an inexistent comment", () => {
		return request(app)
			.delete("/api/comments/99")
			.expect(404)
			.then((response) => {
				expect(response.body.status).toBe(404);
				expect(response.body.msg).toBe("Comment not found.");
			});
	});
	test("STATUS 400: Should return appropriate message when pass an invalid id to be removed", () => {
		return request(app)
			.delete("/api/comments/ddd")
			.expect(400)
			.then((response) => {
				expect(response.body.status).toBe(400);
				expect(response.body.msg).toBe("Bad request.");
			});
	});
});
