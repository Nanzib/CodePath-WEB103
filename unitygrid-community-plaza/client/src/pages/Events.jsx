// client/src/pages/Events.jsx
import React, { useEffect, useState } from 'react'
import EventsAPI from '../services/EventsAPI'
import '../css/LocationEvents.css'

export default function Events() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const data = await EventsAPI.getAllEvents()
        setEvents(data || [])
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

  return (
    <div className="events-page container">
      <h2>All Events</h2>
      <ul>
        {events.map(e => (
          <li key={e.id}>
            <strong>{e.title}</strong> — {e.date ? new Date(e.date).toLocaleString() : 'TBD'}
          </li>
        ))}
      </ul>
    </div>
  )
}
