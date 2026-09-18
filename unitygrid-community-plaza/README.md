# WEB103 Project 3 - UnityGrid Plaza (Virtual Community Space)

Submitted by: **Nanzib Chowdhury**

About this web app: **UnityGrid Plaza is a virtual community space for browsing local events at four selectable locations using an interactive map. Users click a venue to view upcoming and past events pulled from a PostgreSQL database.**

Time spent: **≈8 hours**

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->

- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured Events table**
  - [x]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **The web app displays a title.**
- [x] **Website includes a visual interface that allows users to select a location they would like to view.**

- [x] **Each location has a detail page with its own unique URL.**
- [x] **Clicking on a location navigates to its corresponding detail page and displays list of all events from the `events` table associated with that location.**

## Video Walkthrough

Here's a walkthrough of implemented required features: 
<blockquote class="imgur-embed-pub" lang="en" data-id="M8xjURo"><a href="https://imgur.com/M8xjURo">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

## Notes

I had to add the server-side controllers and routes for `locations` and `events`, create a `reset.js` seeder, and add small ESM-compatible dotenv loader (`server/config/dotenv.js`).  The final verification step is to confirm that location detail pages display seeded events live from the Postgres table — see the checklist below to confirm while recording.

## License

Copyright 2025 Nanzib Chowdhury

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
