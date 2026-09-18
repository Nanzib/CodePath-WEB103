import { pool } from '../config/database.js';

export const getTeams = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM teams ORDER BY id');
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error querying teams', error);
    return res.status(500).json({ error: error.message });
  }
};

export default { getTeams };
