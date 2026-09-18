import 'dotenv/config';

import { pool } from './database.js';
import teams from '../data/teams.js';

const createTeamsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS teams;
    CREATE TABLE IF NOT EXISTS teams (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      city VARCHAR(255),
      founded INTEGER,
      arena VARCHAR(255),
      conference VARCHAR(100),
      image TEXT,
      short TEXT,
      description TEXT,
      website TEXT,
      submittedBy VARCHAR(255),
      submittedOn TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('🎉 teams table created successfully');
  } catch (err) {
    console.error('⚠️ error creating teams table', err);
    throw err;
  }
};

const seedTeamsTable = async () => {
  try {
    await createTeamsTable();

    const insertText = `
      INSERT INTO teams
        (slug, name, city, founded, arena, conference, image, short, description, website, submittedBy, submittedOn)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING id;
    `;

    for (const t of teams) {
      const values = [
        t.slug,
        t.name,
        t.city,
        t.founded || null,
        t.arena,
        t.conference,
        t.image,
        t.short,
        t.description,
        t.website,
        t.submittedBy,
        t.submittedOn ? new Date(t.submittedOn) : null
      ];

      try {
        await pool.query(insertText, values);
        console.log(`✅ ${t.name} added successfully`);
      } catch (err) {
        console.error(`⚠️ error inserting ${t.name}`, err.message || err);
      }
    }
  } catch (err) {
    console.error('Seeding failed', err);
    throw err;
  } finally {
    // Close the pool so the script can exit cleanly
    await pool.end().catch(() => {});
  }
};

seedTeamsTable().catch(err => {
  console.error('Reset script failed', err);
  process.exit(1);
});
