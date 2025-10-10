// client/src/services/LocationsAPI.jsx
const BASE = '/api/locations'

const LocationsAPI = {
  getAllLocations: async () => {
    const res = await fetch(BASE)
    if (!res.ok) throw new Error('Failed to load locations')
    return res.json()
  },
  getLocationById: async (id) => {
    const res = await fetch(`${BASE}/${id}`)
    if (!res.ok) throw new Error('Failed to load location')
    return res.json()
  }
}

export default LocationsAPI
