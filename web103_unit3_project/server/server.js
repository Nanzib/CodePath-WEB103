import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import './config/dotenv.js'
import eventsRouter from './routes/events.js'
import locationsRouter from './routes/locations.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())

// API routes
app.use('/api/events', eventsRouter)
app.use('/api/locations', locationsRouter)

if (process.env.NODE_ENV === 'development') {
  app.use(favicon(path.resolve('../', 'client', 'public', 'party.png')))
} else if (process.env.NODE_ENV === 'production') {
  app.use(favicon(path.resolve('public', 'party.png')))
  app.use(express.static('public'))
}

// For React SPA in production
if (process.env.NODE_ENV === 'production') {
  app.get('/*', (_, res) =>
    res.sendFile(path.resolve('public', 'index.html'))
  )
}

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`)
})
