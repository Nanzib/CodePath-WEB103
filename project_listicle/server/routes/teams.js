import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import teamsController from '../controllers/teams.js';

const router = express.Router();

// GET /teams -> JSON from Postgres via controller
router.get('/', teamsController.getTeams);

// GET /teams/:slug -> serve team.html (frontend will render details client-side)
router.get('/:slug', (req, res) => {
  const serverTeamHtml = path.resolve('public/team.html');           // server/public/team.html
  const clientTeamHtml = path.resolve('../client/public/team.html'); // client/public/team.html relative to server folder

  if (fs.existsSync(serverTeamHtml)) {
    return res.status(200).sendFile(serverTeamHtml);
  }

  if (fs.existsSync(clientTeamHtml)) {
    return res.status(200).sendFile(clientTeamHtml);
  }

  return res.status(404).send('<h1>404 — Team page not found</h1>');
});

export default router;
