// client/src/services/CustomItemsAPI.js
const BASE = '/api/customitems'

export async function getAllCustomItems() {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error(`Failed to fetch items: ${res.status}`)
  return await res.json()
}

export async function getCustomItem(id) {
  const res = await fetch(`${BASE}/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch item ${id}: ${res.status}`)
  return await res.json()
}

export async function createCustomItem(item) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  })
  if (!res.ok) throw new Error(`Failed to create item: ${res.status}`)
  return await res.json()
}

export async function updateCustomItem(id, item) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  })
  if (!res.ok) throw new Error(`Failed to update item ${id}: ${res.status}`)
  return await res.json()
}

export async function deleteCustomItem(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`Failed to delete item ${id}: ${res.status}`)
  return await res.json()
}
