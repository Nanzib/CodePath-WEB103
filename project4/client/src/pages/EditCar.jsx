// client/src/pages/EditCar.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import * as API from '../services/CustomItemsAPI'

const EditCar = () => {
  const { id } = useParams()
  const nav = useNavigate()
  const [form, setForm] = useState({
    name: '', feature_a:'', feature_b:'', feature_c:'', image:'/lightning.png', price:'', notes:''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const data = await API.getCustomItem(id)
        setForm({
          name: data.name || '',
          feature_a: data.feature_a || '',
          feature_b: data.feature_b || '',
          feature_c: data.feature_c || '',
          image: data.image || '/lightning.png',
          price: data.price || '',
          notes: data.notes || ''
        })
      } catch (err) {
        alert('Failed to load: ' + err.message)
        nav('/customcars')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSave = async (e) => {
    e.preventDefault()
    try {
      await API.updateCustomItem(id, { ...form, price: form.price ? Number(form.price) : null })
      nav(`/customcars/${id}`)
    } catch (err) {
      alert('Update failed: ' + err.message)
    }
  }

  const onDelete = async () => {
    if (!confirm('Delete this item?')) return
    try {
      await API.deleteCustomItem(id)
      nav('/customcars')
    } catch (err) {
      alert('Delete failed: ' + err.message)
    }
  }

  if (loading) return <p>Loading…</p>

  return (
    <main>
      <article className="card">
        <header><h2>Edit {form.name}</h2></header>
        <form onSubmit={onSave}>
          <label>Name<input name="name" value={form.name} onChange={onChange} required /></label>
          <label>Feature A<input name="feature_a" value={form.feature_a} onChange={onChange} /></label>
          <label>Feature B<input name="feature_b" value={form.feature_b} onChange={onChange} /></label>
          <label>Feature C<input name="feature_c" value={form.feature_c} onChange={onChange} /></label>
          <label>Image URL<input name="image" value={form.image} onChange={onChange} /></label>
          <label>Price<input name="price" type="number" step="0.01" value={form.price} onChange={onChange} /></label>
          <label>Notes<textarea name="notes" value={form.notes} onChange={onChange} /></label>

          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={onDelete}>Delete</button>
            <button type="button" onClick={() => nav(`/customcars/${id}`)}>Cancel</button>
          </div>
        </form>
      </article>
    </main>
  )
}

export default EditCar
