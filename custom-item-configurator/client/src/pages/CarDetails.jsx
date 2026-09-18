// client/src/pages/CarDetails.jsx
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import '../App.css'
import * as API from '../services/CustomItemsAPI'

const CarDetails = () => {
  const { id } = useParams()
  const nav = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const data = await API.getCustomItem(id)
        setItem(data)
      } catch (err) {
        alert('Load failed: ' + err.message)
        nav('/customcars')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  const handleDelete = async () => {
    if (!confirm('Delete this item?')) return
    try {
      await API.deleteCustomItem(id)
      nav('/customcars')
    } catch (err) {
      alert('Delete failed: ' + err.message)
    }
  }

  if (loading) return <p>Loading…</p>
  if (!item) return <p>Not found</p>

  return (
    <main>
      <article className="card">
        <header><h2>{item.name}</h2></header>
        <img src={item.image || '/lightning.png'} alt={item.name} style={{maxWidth:300}} />
        <p>Feature A: {item.feature_a}</p>
        <p>Feature B: {item.feature_b}</p>
        <p>Feature C: {item.feature_c}</p>
        <p>Price: ${Number(item.price).toFixed(2)}</p>
        <p>Notes: {item.notes}</p>
        <div>
          <Link to={`/edit/${item.id}`}><button>Edit</button></Link>
          <button onClick={handleDelete}>Delete</button>
          <Link to="/customcars"><button>Back</button></Link>
        </div>
      </article>
    </main>
  )
}

export default CarDetails
