// server/config/reset.js
import './dotenv.js'
import { pool } from './database.js'

const createTables = async () => {
  const q = `
  DROP TABLE IF EXISTS events;
  DROP TABLE IF EXISTS locations;

  CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address TEXT
  );

  CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    date TIMESTAMP,
    time VARCHAR(50),
    image TEXT,
    description TEXT
  );
  `
  await pool.query(q)
  console.log('✅ Tables created')
}

const seed = async () => {
  await createTables()

  const locations = [
    { slug: 'echolounge', name: 'Echo Lounge', description: 'Intimate music venue', address: '123 Echo St' },
    { slug: 'houseofblues', name: 'House of Blues', description: 'Big stage & bands', address: '456 Blues Ave' },
    { slug: 'pavilion', name: 'The Pavilion', description: 'Outdoor festivals', address: '789 Pavilion Pkwy' },
    { slug: 'americanairlines', name: 'American Airlines Center', description: 'Arena events', address: '1000 Victory Rd' }
  ]

  const locIds = []
  for (const loc of locations) {
    const res = await pool.query(
      `INSERT INTO locations (slug, name, description, address) VALUES ($1,$2,$3,$4) RETURNING id`,
      [loc.slug, loc.name, loc.description, loc.address]
    )
    locIds.push(res.rows[0].id)
    console.log(`✅ Added location: ${loc.name}`)
  }

  const events = [
    { locationIndex: 0, title: 'Open Mic Night', date: new Date(Date.now() + 86400000).toISOString(), time: '7:30 PM', image: '/party.png', description: 'Local talent.' },
    { locationIndex: 0, title: 'Indie Night', date: new Date(Date.now() + 3*86400000).toISOString(), time: '8:00 PM', image: '/party.png', description: 'Indie bands.' },
    { locationIndex: 1, title: 'Blues Jam', date: new Date(Date.now() - 2*86400000).toISOString(), time: '9:00 PM', image: '/party.png', description: 'Past blues event.' },
    { locationIndex: 2, title: 'Summer Fest', date: new Date(Date.now() + 14*86400000).toISOString(), time: '4:00 PM', image: '/party.png', description: 'Outdoor festival.' },
    { locationIndex: 3, title: 'Arena Concert', date: new Date(Date.now() + 30*86400000).toISOString(), time: '7:00 PM', image: '/party.png', description: 'Big name artist.' }
  ]

  for (const ev of events) {
    const locId = locIds[ev.locationIndex]
    await pool.query(
      `INSERT INTO events (location_id, title, date, time, image, description) VALUES ($1,$2,$3,$4,$5,$6)`,
      [locId, ev.title, ev.date, ev.time, ev.image, ev.description]
    )
    console.log(`✅ Added event: ${ev.title}`)
  }

  console.log('🎉 Seeding complete')
  process.exit(0)
}

seed().catch(err => {
  console.error('Seeding failed', err)
  process.exit(1)
})
