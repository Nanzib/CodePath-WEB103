import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import '../App.css';

/**
 * ViewCreator
 *
 * - Loads a single creator by URL param `id` using supabase.from(...).select().eq(...)
 * - Shows name, full description, image (if available), and links to edit/delete
 * - Delete button will remove the creator after a confirmation prompt and navigate home
 */
export default function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCreator() {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from("creators").select("*").eq("id", id).single();
      if (error) throw error;
      setCreator(data);
    } catch (err) {
      setError(err.message || "Error loading creator");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCreator();
  }, [id]);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this creator? This cannot be undone.")) return;
    try {
      const { error } = await supabase.from("creators").delete().eq("id", id);
      if (error) throw error;
      navigate("/");
    } catch (err) {
      alert("Failed to delete: " + (err.message || err));
    }
  }

  if (loading) return <p>Loading creator…</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!creator) return <p>Creator not found.</p>;

  return (
    <main className="page-padding">
      <Link to="/" className="link-back">← Back to list</Link>

      <div className="creator-container">
        <div className="creator-image-wrapper">
          {creator.imageURL ? (
            <img
              src={creator.imageURL}
              alt={creator.name}
              className="creator-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/240x240?text=No+Image";
              }}
            />
          ) : (
            <img
              src="https://via.placeholder.com/240x240?text=No+Image"
              alt="placeholder"
              className="creator-image"
            />
          )}
        </div>

        <div className="creator-details">
          <h2>{creator.name}</h2>

          <p>
            <strong>Channel / Profile:</strong>{" "}
            <a href={creator.url} target="_blank" rel="noopener noreferrer">
              {creator.url}
            </a>
          </p>

          <p className="creator-description">{creator.description}</p>

          <div className="creator-actions">
            <Link to={`/creator/${id}/edit`}>
              <button className="btn">Edit</button>
            </Link>

            <button onClick={handleDelete} className="btn btn-delete">
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
