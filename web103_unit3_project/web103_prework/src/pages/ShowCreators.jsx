import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";
import "../App.css";

/**
 * ShowCreators
 *
 * Fetches all creators from the 'creators' table and renders them using
 * the CreatorCard component. Includes:
 *  - async/await with Supabase calls
 *  - loading & error handling
 */
// src/pages/ShowCreators.jsx
export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCreators() {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .order("id", { ascending: true });
      if (error) throw error;
      setCreators(data || []);
    } catch (err) {
      setError(err.message || "Error fetching creators");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCreators();
  }, []);

  async function handleDelete(id) {
    const prev = creators;
    setCreators((curr) => curr.filter((c) => c.id !== id));

    try {
      const { error } = await supabase.from("creators").delete().eq("id", id);
      if (error) throw error;
    } catch (err) {
      setCreators(prev);
      alert("Failed to delete: " + (err.message || err));
    }
  }

  return (
    <main className="page-container">
      <h1 className="page-title">Creatorverse</h1>

      {loading && <p>Loading creators…</p>}
      {error && <p className="error-text">{error}</p>}

      <section className="creators-section">
        {creators.length === 0 && !loading ? (
          <p>No creators yet — add some using "Add Creator".</p>
        ) : (
          <div className="cards-grid" role="list">
            {creators.map((c) => (
              <div role="listitem" key={c.id}>
                <CreatorCard creator={c} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
