/**
 * server.js
 * Minimal Express server for Listicle project.
 * Serves:
 *  - API: GET /teams -> JSON array
 *  - Page: GET /teams/:slug -> serves detail HTML (frontend handles rendering)
 *  - Static files from ./public
 */

import express from 'express';
import path from 'path';
import teamsRouter from './routes/teams.js';

const app = express();

// serve built client static if present (optional)
app.use('/public', express.static(path.resolve('public')));
app.use('/scripts', express.static(path.resolve('public/scripts')));
app.use('/assets', express.static(path.resolve('public/assets')));

// API router
app.use('/teams', teamsRouter);

// root health-check
app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align:center;margin-top:40px">NHL Teams API</h1>');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
