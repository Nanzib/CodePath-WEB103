# WEB103 Project 2 - NHL Teams Listicle (2)

Submitted by: **Nanzib Chowdhury**

About this web app:  
This is a simple listicle web app that displays NHL teams.  
It is built with HTML, CSS, and JavaScript and is connected to a PostgreSQL database hosted on Render.  
Users can view a list of teams and click into detail pages at unique URLs.

Time spent: **6** hours

---

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured database table for the list items**
  - [x] **Walkthrough includes a view of the Render dashboard showing that the Postgres database is available**
  - [x] **Walkthrough includes a demonstration of the table contents using the psql command `SELECT * FROM teams;`**

---

## Video Walkthrough

Here’s a walkthrough of implemented required features:
https://imgur.com/a/mTHrbvg

---

## Notes

Some challenges I encountered:
- Connecting the app to the remote Postgres database on Render (initial `ECONNREFUSED` errors until `.env` and connection pool were configured correctly).
- Debugging environment variable loading with `dotenv` across the server and reset scripts.

---

## License

Copyright 2025 [Nanzib Chowdhury]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.  
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
