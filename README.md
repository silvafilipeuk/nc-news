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

**/api** - returns an object describing all the available endpoints on your API.

**/api/topics** - returns an array of topic objects: Example:

```
  "exampleResponse": {
    "topics": [{ "slug": "football", "description": "Footie!" }]
  } 
```
**/api/articles** - return an array of articles objects.

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

**/api/articles/:article_id** - return an array with the object corresponding to the given id
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
