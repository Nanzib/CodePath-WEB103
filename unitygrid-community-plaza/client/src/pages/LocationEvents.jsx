// client/src/pages/LocationEvents.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import '../css/LocationEvents.css' 

export default function LocationEvents() {
  const params = useParams() 

  const [location, setLocation] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // derive slug from current pathname (works if route is '/echolounge', '/houseofblues', etc)
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        // fetch all locations and find the one matching current path slug
        const all = await LocationsAPI.getAllLocations()
        const path = window.location.pathname.replace(/^\//, '') // 'echolounge'
        const loc = all.find(l => l.slug === path) || all[Number(path) - 1] || null

        if (!loc) {
          setLocation(null)
          setEvents([])
          setLoading(false)
          return
        }

        setLocation(loc)

        // fetch events for this location
        const evs = await EventsAPI.getEventsByLocationId(loc.id)
        setEvents(evs || [])
      } catch (err) {
        console.error(err)
        setError('Failed to load location or events')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [window.location.pathname]) // re-run when path changes

  if (loading) return <div className="container"><p>Loading...</p></div>
  if (error) return <div className="container"><p>{error}</p></div>

  if (!location) {
    return (
      <div className="container">
        <h2>Location not found</h2>
        <p>We couldn't find this venue.</p>
      </div>
    )
  }

  return (
    <div className="container location-events">
      <header className="location-header">
        <h2>{location.name}</h2>
        <p className="muted">{location.address}</p>
        <p>{location.description}</p>
      </header>

      <section className="events-grid">
        {events.length === 0 && <p>No events scheduled for this location.</p>}
        {events.map(ev => (
          <article key={ev.id} className="location-event-card">
            <img src={ev.image || '/party.png'} alt={ev.title} />
            <div className="card-body">
              <h3>{ev.title}</h3>
              <p className="muted">{ev.date ? new Date(ev.date).toLocaleString() : 'TBD'} • {ev.time || ''}</p>
              <p>{ev.description}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
