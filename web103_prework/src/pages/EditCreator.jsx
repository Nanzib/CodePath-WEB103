// src/pages/EditCreator.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../client";
import '../App.css';

/**
 * EditCreator
 *
 * - Loads the existing creator and pre-fills the form
 * - On submit, updates the row in Supabase and navigates back to the details page
 * - Uses async/await and basic error handling
 */
export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", url: "", description: "", imageURL: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  async function loadCreator() {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("creators").select("*").eq("id", id).single();
      if (error) throw error;
      setForm({
        name: data.name || "",
        url: data.url || "",
        description: data.description || "",
        imageURL: data.imageURL || "",
      });
    } catch (err) {
      setError(err.message || "Failed to load creator");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCreator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!form.name.trim()) {
      setError("Name is required");
      setSaving(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("creators")
        .update({
          name: form.name.trim(),
          url: form.url.trim(),
          description: form.description.trim(),
          imageURL: form.imageURL.trim(),
        })
        .eq("id", id);

      if (error) throw error;
      navigate(`/creator/${id}`);
    } catch (err) {
      setError(err.message || "Failed to update creator");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this creator? This cannot be undone.")) return;
    setSaving(true);
    setError(null);
    try {
      const { error } = await supabase.from("creators").delete().eq("id", id);
      if (error) throw error;
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to delete creator");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <main className="page-padding"><p className="loading-text">Loading…</p></main>;

  return (
    <main className="page-padding">
      <Link to={`/creator/${id}`} className="link-back">← Back to details</Link>
      <h2>Edit Creator</h2>

      {error && <p className="error-text" role="alert">{error}</p>}

      <form onSubmit={handleSubmit} className="form-container" noValidate>
        <label className="form-label">
          Name *
          <input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </label>

        <label className="form-label">
          URL
          <input className="form-input" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." />
        </label>

        <label className="form-label">
          Image URL
          <input className="form-input" value={form.imageURL} onChange={(e) => setForm({ ...form, imageURL: e.target.value })} placeholder="https://.../avatar.jpg" />
        </label>

        {/* preview */}
        {form.imageURL && (
          <div style={{ marginTop: 10 }}>
            <img src={form.imageURL} alt="preview" className="creator-image" onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/240x240?text=No+Image"; }} />
          </div>
        )}

        <label className="form-label">
          Description
          <textarea className="form-textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </label>

        <div className="form-actions">
          <button className="btn" disabled={saving}>{saving ? "Saving…" : "Save changes"}</button>

          <button type="button" className="btn btn-delete" onClick={handleDelete} disabled={saving}>
            Delete
          </button>
        </div>
      </form>
    </main>
  );
}
