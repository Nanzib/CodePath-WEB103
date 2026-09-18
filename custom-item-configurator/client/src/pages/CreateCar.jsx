// client/src/pages/CreateCar.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as API from '../services/CustomItemsAPI'
import { calcPrice, getPreviewStyle } from '../utilities/optionPrices'
import { validateCombination, isOptionDisabled } from '../utilities/validation'
import '../App.css'
import '../css/Navigation.css'

const COLOR_OPTIONS = ['red', 'black', 'blue', 'matte-black', 'gold']
const ENGINE_OPTIONS = ['V8', 'V6', 'electric', 'turbo']
const WHEEL_OPTIONS = ['alloy wheels', 'steel wheels', 'whitewalls', 'carbon wheels']

const CreateCar = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    feature_a: 'red',
    feature_b: 'V8',
    feature_c: 'alloy wheels',
    image: '/lightning.png',
    notes: ''
  })
  const [error, setError] = useState(null)
  const [computedPrice, setComputedPrice] = useState(0)

  useEffect(() => {
    setComputedPrice(calcPrice(form))
  }, [form.feature_a, form.feature_b, form.feature_c])

  const setOption = (key, value) => {
    setForm(f => ({ ...f, [key]: value }))
    setError(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validateCombination({ ...form, price: computedPrice })
    if (v) {
      setError(v)
      return
    }
    try {
      await API.createCustomItem({ ...form, price: computedPrice })
      navigate('/customcars')
    } catch (err) {
      setError(err.message || 'Failed to create')
    }
  }

  return (
    <main className='container'>
      <h1>Create a Custom Car</h1>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <form onSubmit={handleSubmit} style={{ minWidth: 360 }}>
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>

          <label>
            Color (feature_a)
            <div className="options-row">
              {COLOR_OPTIONS.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}    /* prevents sticky mouse focus */
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOption('feature_a', opt)}
                  onClick={() => setOption('feature_a', opt)}
                  className={`option-btn ${form.feature_a === opt ? 'active' : ''}`}
                  disabled={isOptionDisabled(form, 'feature_a', opt)}
                  aria-pressed={form.feature_a === opt}
                >
                  {opt}
                </button>
              ))}
            </div>
          </label>

          <label>
            Engine (feature_b)
            <div className="options-row">
              {ENGINE_OPTIONS.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOption('feature_b', opt)}
                  onClick={() => setOption('feature_b', opt)}
                  className={`option-btn ${form.feature_b === opt ? 'active' : ''}`}
                  disabled={isOptionDisabled(form, 'feature_b', opt)}
                  aria-pressed={form.feature_b === opt}
                >
                  {opt}
                </button>
              ))}
            </div>
          </label>

          <label>
            Wheels (feature_c)
            <div className="options-row">
              {WHEEL_OPTIONS.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOption('feature_c', opt)}
                  onClick={() => setOption('feature_c', opt)}
                  className={`option-btn ${form.feature_c === opt ? 'active' : ''}`}
                  disabled={isOptionDisabled(form, 'feature_c', opt)}
                  aria-pressed={form.feature_c === opt}
                >
                  {opt}
                </button>
              ))}
            </div>
          </label>

          <label>
            Image path
            <input name="image" value={form.image} onChange={handleChange} />
          </label>

          <label>
            Notes
            <textarea name="notes" value={form.notes} onChange={handleChange} />
          </label>

          <p><strong>Price:</strong> ${Number(computedPrice).toFixed(2)}</p>

          {error && <p className="muted" role="alert">Error: {error}</p>}

          <button type="submit" disabled={Boolean(validateCombination({ ...form, price: computedPrice }))}>
            Create
          </button>
        </form>

        <aside>
          <h3>Preview</h3>
          <div style={{ width: 360, height: 240, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={form.image}
              alt="preview"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                ...getPreviewStyle(form.feature_a)
              }}
            />
          </div>

          <div style={{ marginTop: 16 }}>
            <p><strong>Selected:</strong></p>
            <p>{form.feature_a} · {form.feature_b} · {form.feature_c}</p>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default CreateCar
