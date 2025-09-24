import express from 'express';
import path from 'path';
import fs from 'fs';
import teams from '../data/teams.js';

const router = express.Router();

// GET /teams -> return JSON array
router.get('/', (req, res) => {
  res.status(200).json(teams);
});

// GET /teams/:slug -> serve the team detail HTML file (lab expects unique endpoint)
router.get('/:slug', (req, res) => {
  // Prefer the server/public/team.html (production build). If not present (dev), fall back to client/public/team.html
  const serverTeamHtml = path.resolve('public/team.html');           // server/public/team.html
  const clientTeamHtml = path.resolve('../client/public/team.html'); // client/public/team.html relative to server folder

  if (fs.existsSync(serverTeamHtml)) {
    return res.status(200).sendFile(serverTeamHtml);
  }

  if (fs.existsSync(clientTeamHtml)) {
    return res.status(200).sendFile(clientTeamHtml);
  }

  // not found -> 404
  return res.status(404).send('<h1>404 — Team page not found</h1>');
});

export default router;
