// client/src/pages/ViewCars.jsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import * as API from '../services/CustomItemsAPI'

const ViewCars = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const data = await API.getAllCustomItems()
      setItems(data)
    } catch (err) {
      alert('Failed to load items: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return
    try {
      await API.deleteCustomItem(id)
      await load()
    } catch (err) {
      alert('Delete failed: ' + err.message)
    }
  }

  return (
    <main>
      <header><h2>Custom Cars</h2><Link to="/"><button>New Car</button></Link></header>
      {loading ? <p>Loading…</p> : (
        <section>
          {items.length === 0 ? <p>No items.</p> : items.map(it => (
            <article key={it.id} className="card">
              <img src={it.image || '/lightning.png'} alt={it.name} style={{maxWidth:200}} />
              <h3><Link to={`/customcars/${it.id}`}>{it.name}</Link></h3>
              <p>Features: {it.feature_a}, {it.feature_b}, {it.feature_c}</p>
              <p>Price: ${Number(it.price).toFixed(2)}</p>
              <div>
                <Link to={`/edit/${it.id}`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(it.id)}>Delete</button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default ViewCars
