// server/config/reset.js
import './dotenv.js'    // loads server/.env
import { pool } from './database.js'

const createTable = `
DROP TABLE IF EXISTS customitems;

CREATE TABLE IF NOT EXISTS customitems (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  feature_a VARCHAR(255),
  feature_b VARCHAR(255),
  feature_c VARCHAR(255),
  image TEXT,
  price NUMERIC,
  notes TEXT,
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`

const seedData = [
  {
    name: 'Bolt Racer',
    feature_a: 'red',
    feature_b: 'V8',
    feature_c: 'alloy wheels',
    image: '/lightning.png',
    price: 1299.50,
    notes: 'Demo build'
  },
  {
    name: 'Urban Cruiser',
    feature_a: 'black',
    feature_b: 'electric',
    feature_c: 'steel wheels',
    image: '/lightning.png',
    price: 899.00,
    notes: 'City commuter'
  },
  {
    name: 'Beach Cruiser',
    feature_a: 'blue',
    feature_b: 'V6',
    feature_c: 'whitewalls',
    image: '/lightning.png',
    price: 999.00,
    notes: 'Lightweight'
  },
  {
    name: 'Night Runner',
    feature_a: 'matte-black',
    feature_b: 'turbo',
    feature_c: 'carbon wheels',
    image: '/lightning.png',
    price: 1599.99,
    notes: 'Limited edition'
  }
]

const createAndSeed = async () => {
  try {
    await pool.query(createTable)
    console.log('✅ customitems table created/dropped if existed')

    for (const item of seedData) {
      const { name, feature_a, feature_b, feature_c, image, price, notes } = item
      await pool.query(
        `INSERT INTO customitems (name, feature_a, feature_b, feature_c, image, price, notes)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [name, feature_a, feature_b, feature_c, image, price, notes]
      )
      console.log(`  ➕ ${name}`)
    }

    console.log('🎉 Seeding complete')
  } catch (err) {
    console.error('⚠️ seeding failed', err)
  } finally {
    await pool.end()
    process.exit(0)
  }
}

createAndSeed()
