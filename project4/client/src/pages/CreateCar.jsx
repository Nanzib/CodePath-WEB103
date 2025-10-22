// client/src/pages/CreateCar.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import * as API from '../services/CustomItemsAPI'

const CreateCar = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    feature_a: '',
    feature_b: '',
    feature_c: '',
    image: '/lightning.png',
    price: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name) return alert('Name is required')
    setLoading(true)
    try {
      await API.createCustomItem({
        ...form,
        price: form.price ? Number(form.price) : null
      })
      navigate('/customcars')
    } catch (err) {
      alert('Create failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <article className="card">
        <header><h2>Create a Custom Car</h2></header>
        <form onSubmit={onSubmit}>
          <label>Name<input name="name" value={form.name} onChange={onChange} required /></label>
          <label>Feature A<input name="feature_a" value={form.feature_a} onChange={onChange} /></label>
          <label>Feature B<input name="feature_b" value={form.feature_b} onChange={onChange} /></label>
          <label>Feature C<input name="feature_c" value={form.feature_c} onChange={onChange} /></label>
          <label>Image URL<input name="image" value={form.image} onChange={onChange} /></label>
          <label>Price<input name="price" type="number" step="0.01" value={form.price} onChange={onChange} /></label>
          <label>Notes<textarea name="notes" value={form.notes} onChange={onChange} /></label>

          <div>
            <button type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create'}</button>
            <button type="button" onClick={() => navigate('/customcars')}>Cancel</button>
          </div>
        </form>
      </article>
    </main>
  )
}

export default CreateCar
