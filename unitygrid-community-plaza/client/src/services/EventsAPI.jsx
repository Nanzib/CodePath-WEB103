// client/src/services/EventsAPI.jsx
const BASE = '/api/events'

const EventsAPI = {
  getAllEvents: async () => {
    const res = await fetch(BASE)
    if (!res.ok) throw new Error('Failed to load events')
    return res.json()
  },
  getEventById: async (id) => {
    const res = await fetch(`${BASE}/${id}`)
    if (!res.ok) throw new Error('Failed to load event')
    return res.json()
  },
  // If you prefer endpoint at /api/locations/:id/events adjust as needed.
  getEventsByLocationId: async (locationId) => {
    const res = await fetch(`/api/locations/${locationId}/events`)
    if (!res.ok) throw new Error('Failed to load events for location')
    return res.json()
  }
}

export default EventsAPI
