// server/test-conn.js
import './config/dotenv.js'   // ensure env loaded
import { pool } from './config/database.js'

const run = async () => {
  try {
    const res = await pool.query('SELECT NOW() as now')
    console.log('✅ Connected OK — server time:', res.rows[0].now)
  } catch (err) {
    console.error('❌ Connection failed', err)
  } finally {
    await pool.end()
  }
}

run()
