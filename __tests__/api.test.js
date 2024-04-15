const app = require("../app");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data");

beforeEach(() => seed(data));
afterAll(() => db.end());

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
			});
	});
	test("GET STATUS 404: should return appropriate message for the client when requested an invalid endpoint", () => {
		return request(app)
			.get("/api/t0pics")
			.expect(404)
			.then((response) => {
				expect(response.body.msg).toBe("Invalid endpoint.");
			});
	});
});
