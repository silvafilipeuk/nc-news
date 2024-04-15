# Northcoders News API

## Setup instructions:

**The project uses two different databases for different purposes:**

-   Test database: used during the testing phase.
-   Dev database: used during development phase.

You need to create two different .env files to setup the databases as follows:

-   **.env.development** - Uses the development database, set the variable PGDATABASE to the correct database (PGDATABASE=database_name_here)

-   **.env.test** - Uses the test database, set the variable PGDATABASE to the correct database (PGDATABASE=database_name_here)

-   Please refer to db/setup.sql file for the correct database names, and also to create the databases locally;
