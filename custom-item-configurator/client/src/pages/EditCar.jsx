// client/src/pages/EditCar.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as API from '../services/CustomItemsAPI'
import { calcPrice, getPreviewStyle } from '../utilities/optionPrices'
import { validateCombination, isOptionDisabled } from '../utilities/validation'
import '../App.css'
import '../css/Navigation.css'

const COLOR_OPTIONS = ['red', 'black', 'blue', 'matte-black', 'gold']
const ENGINE_OPTIONS = ['V8', 'V6', 'electric', 'turbo']
const WHEEL_OPTIONS = ['alloy wheels', 'steel wheels', 'whitewalls', 'carbon wheels']

const EditCar = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [error, setError] = useState(null)
  const [computedPrice, setComputedPrice] = useState(0)

  useEffect(() => {
    (async () => {
      try {
        const data = await API.getCustomItem(id)
        setForm({
          name: data.name || '',
          feature_a: data.feature_a || 'red',
          feature_b: data.feature_b || 'V8',
          feature_c: data.feature_c || 'alloy wheels',
          image: data.image || '/lightning.png',
          notes: data.notes || ''
        })
      } catch (e) {
        setError(e.message)
      }
    })()
  }, [id])

  useEffect(() => {
    if (!form) return
    setComputedPrice(calcPrice(form))
  }, [form?.feature_a, form?.feature_b, form?.feature_c, form])

  if (!form) return <main className='container'><p>Loading…</p></main>

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
      await API.updateCustomItem(id, { ...form, price: computedPrice })
      navigate(`/customcars/${id}`)
    } catch (err) {
      setError(err.message || 'Failed to save')
    }
  }

  return (
    <main className='container'>
      <h1>Edit {form.name}</h1>

      <div style={{ display: 'flex', gap: 24 }}>
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
                  onMouseDown={(e) => e.preventDefault()}
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

          <button type="submit" disabled={Boolean(validateCombination({ ...form, price: computedPrice }))}>Save</button>
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

export default EditCar
