import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../client";
import '../App.css';

/**
 * AddCreator
 *
 * Simple form to add a new creator. On submit, insert into Supabase,
 * then redirect the user to the home page (or to the new creator details).
 */
export default function AddCreator() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", url: "", description: "", imageURL: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!form.name.trim()) {
      setError("Name is required");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.from("creators").insert([form]).select();
      if (error) throw error;
      // redirect to home so ShowCreators will re-fetch and show the new item
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to add creator");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-padding">
      <Link to="/" className="link-back">← Back to list</Link>
      <h2>Add a new creator</h2>

      <form onSubmit={handleSubmit} className="form-container">
        {error && <p className="error-text">{error}</p>}

        <label className="form-label">
          Name *
          <input
            className="form-input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>

        <label className="form-label">
          URL
          <input
            className="form-input"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </label>

        <label className="form-label">
          Image URL (optional)
          <input
            className="form-input"
            value={form.imageURL}
            onChange={(e) => setForm({ ...form, imageURL: e.target.value })}
          />
        </label>

        <label className="form-label">
          Description
          <textarea
            className="form-textarea"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>

        <div>
          <button disabled={loading} className="btn">
            {loading ? "Adding…" : "Add creator"}
          </button>
        </div>
      </form>
    </main>
  );
}
