import pg from 'pg';
const { Pool } = pg;

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  database: process.env.PGDATABASE,
  ssl: { rejectUnauthorized: false }
};

export const pool = new Pool(config);
