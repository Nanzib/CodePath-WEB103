import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'
import '../css/Event.css'

/**
 * Event component — fetches one event by ID and renders it.
 * Props:
 *  - id: numeric or string id of the event to fetch
 */
const Event = ({ id }) => {
  const [event, setEvent] = useState(null)
  const [timeStr, setTimeStr] = useState('')
  const [remainingStr, setRemainingStr] = useState('')

  // Simple helper: format a time string like "18:30" or a Date into "h:mm AM/PM"
  const formatTime = (isoOrTime) => {
    if (!isoOrTime) return ''
    // try to parse; if it's already a HH:MM string return it
    try {
      const d = new Date(isoOrTime)
      if (isNaN(d.getTime())) {
        // fallback: assume it's a time string
        return isoOrTime
      }
      return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    } catch {
      return String(isoOrTime)
    }
  }

  // Helper: calculate remaining time until event.date (ISO) and return text
  const calcRemaining = (isoDate) => {
    if (!isoDate) return ''
    const now = new Date()
    const then = new Date(isoDate)
    if (isNaN(then.getTime())) return ''
    const diffMs = then - now
    const abs = Math.abs(diffMs)

    const days = Math.floor(abs / (1000 * 60 * 60 * 24))
    const hours = Math.floor((abs / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((abs / (1000 * 60)) % 60)

    const parts = []
    if (days) parts.push(`${days}d`)
    if (hours) parts.push(`${hours}h`)
    if (minutes) parts.push(`${minutes}m`)
    const human = parts.length ? parts.join(' ') : 'less than a minute'

    return diffMs >= 0 ? `In ${human}` : `${human} ago`
  }

  // Fetch event when id changes
  useEffect(() => {
    if (!id) return
    let mounted = true

    const load = async () => {
      try {
        const data = await EventsAPI.getEventById(id)
        if (!mounted) return
        setEvent(data || null)
      } catch (err) {
        console.error('Failed to load event', err)
        if (mounted) setEvent(null)
      }
    }

    load()
    return () => { mounted = false }
  }, [id])

  // Update formatted strings when `event` changes
  useEffect(() => {
    if (!event) {
      setTimeStr('')
      setRemainingStr('')
      return
    }

    // event.date can be ISO string or other; adjust if your DB uses different field names
    const time = formatTime(event.time || event.date || event.start_time)
    const remaining = calcRemaining(event.date || event.datetime || event.start)

    setTimeStr(time)
    setRemainingStr(remaining)
  }, [event])

  if (event === null) {
    return (
      <article className='event-information'>
        <div className='event-placeholder'>
          <p>Loading event...</p>
        </div>
      </article>
    )
  }

  if (!event || Object.keys(event).length === 0) {
    return (
      <article className='event-information'>
        <div className='event-placeholder'>
          <p>No event found.</p>
        </div>
      </article>
    )
  }

  return (
    <article className='event-information'>
      {/* image fallback */}
      <img src={event.image || '/party.png'} alt={event.title || 'Event image'} />

      <div className='event-information-overlay'>
        <div className='text'>
          <h3>{event.title || event.name}</h3>
          <p>
            <i className="fa-regular fa-calendar fa-bounce" aria-hidden="true"></i>{' '}
            {event.date ? new Date(event.date).toLocaleDateString() : ''}
            <br /> {timeStr}
          </p>
          <p id={`remaining-${event.id}`}>{remainingStr}</p>
        </div>
      </div>
    </article>
  )
}

export default Event
