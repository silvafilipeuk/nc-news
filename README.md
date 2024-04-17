# Northcoders News API

## Setup instructions:

**The project uses two different databases for different purposes:**

-   Test database: used during the testing phase.
-   Dev database: used during development phase.

You need to create two different .env files to setup the databases as follows:

-   **.env.development** - Uses the development database, set the variable PGDATABASE to the correct database (PGDATABASE=database_name_here)

-   **.env.test** - Uses the test database, set the variable PGDATABASE to the correct database (PGDATABASE=database_name_here)

-   Please refer to db/setup.sql file for the correct database names, and also to create the databases locally;

-   **To install the databases:** npm run setup-dbs on your terminal.

-   **To seed the databases:** npm run seed

# API endpoints:

**GET /api** - returns an object describing all the available endpoints on your API.

**GET /api/topics** - returns an array of topic objects: Example:

```
  "exampleResponse": {
    "topics": [{ "slug": "football", "description": "Footie!" }]
  } 
```
**GET /api/articles** - return an array of articles objects.

```
"exampleResponse": {
    "articles": [
      {
        "article_id": 3,
        "title": "Eight pug gifs that remind me of mitch",
        "topic": "mitch",
        "author": "icellusedkars",
        "article_img_url": "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        "created_at": "2020-11-03T09:12:00.000Z",
        "votes": 0,
        "comment_count": 2
      }
    ]
  }
```

**GET /api/articles/:article_id** - return an array with the object corresponding to the given id
```
  "exampleResponse": {
    "article": [
      {
        "article_id": "1",
        "title": "Living in the shadow of a great man",
        "topic": "mitch",
        "author": "butter_bridge",
        "body": "I find this existence challenging",
        "created_at": "2020-07-09T20:11:00.000Z",
        "votes": 100,
        "article_img_url": "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
      }
    ]
  }
```
**GET /api/articles/:article_id/comments** - return an array of comments for a given article

```

"exampleResponse": {
			"comments": [
				{
					"comment_id": "6",
					"votes": "1",
					"created_at": "2020-10-11T16:23:00.000Z",
					"author": "butter_bridge",
					"body": "This is a bad article name",
					"article_id": "6"
				}
			]
  	}
```

**POST /api/articles/:article_id/comments** - Adds a comment to the given article, returns the added comment.

Body format: { "username": "icellusedkars",	"body": "This is the icellusedkars new omment!" }

```
"exampleResponse": {
			"comment": [
				{
					"comment_id": "19",
					"votes": "0",
					"created_at": "2024-04-16T14:59:56.973Z",
					"author": "icellusedkars",
					"body": "This is the icellusedkars new comment!",
					"article_id": "2"
				}
			]
		}
```
**PATCH /api/articles/:article_id** - Update the number of votes for a given article by the number passed on the patch body:

Body format: { inc_votes: 1} Votes was 100, updated by 1 is now 101.

```
"exampleResponse": {
			"article": [
				{
					"article_id": "1",
					"title": "Living in the shadow of a great man",
					"topic": "mitch",
					"author": "butter_bridge",
					"body": "I find this existence challenging",
					"created_at": "2020-07-09T21:11:00.000Z",
					"votes": "101",
					"article_img_url": "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
				}
			]
		}
```
**DELETE /api/comments/:comment_id** - Delete the given comment from the databse. Returns status 204 if deleted.

```status: 204.
"exampleResponse": {}
```

**GET /api/users** - Get all the users from the database. Returns an array of user objects.

```
"exampleResponse": [
			{
				"username": "butter_bridge",
				"name": "jonny",
				"avatar_url": "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
			},
			{
				"username": "icellusedkars",
				"name": "sam",
				"avatar_url": "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4"
			}
		]
```
