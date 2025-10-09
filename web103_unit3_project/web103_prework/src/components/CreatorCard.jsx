import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

/**
 * CreatorCard
 *
 * This component displays a single creator's key info in a "card" style layout.
 * All visual styles are applied using CSS classes in App.css.
 *
 * Props:
 *  - creator: object { id, name, url, description, imageURL }
 */
export default function CreatorCard({ creator, onDelete }) {
  const { id, name, url, description, imageURL } = creator;

  return (
    <article className="creator-card pico-card" aria-labelledby={`creator-${id}-title`}>
      <figure className="creator-figure">
        <img
          src={imageURL || "https://via.placeholder.com/480x320?text=No+Image"}
          alt={imageURL ? `${name} thumbnail` : `Placeholder image for ${name}`}
          loading="lazy"
          className="creator-card-img"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/480x320?text=No+Image"; }}
        />
        <figcaption className="creator-figcaption">
          <h3 id={`creator-${id}-title`} className="creator-card-title">
            <Link to={`/creator/${id}`} className="creator-card-name">{name}</Link>
          </h3>

          <p className="muted small">
            {description ? (description.length > 140 ? description.slice(0, 137) + "…" : description) : <em>No description</em>}
          </p>
        </figcaption>
      </figure>

      <div className="card-actions-bottom" role="group" aria-label={`Actions for ${name}`}>
        <a
          href={url || "#"}
          className="small-action small-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!url}
          onClick={(e) => { if (!url) e.preventDefault(); }}
        >
          Visit
        </a>
        <Link to={`/creator/${id}/edit`} className="small-action small-link">
          Edit
        </Link>
        {typeof onDelete === "function" && (
          <button
            type="button"
            className="small-action small-delete"
            onClick={() => {
              if (window.confirm(`Delete "${name}"? This cannot be undone.`)) onDelete(id);
            }}
            aria-label={`Delete ${name}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path d="M3 6h18" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 11v6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 11v6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 3h6l1 3H8l1-3z" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Delete
          </button>
        )}
      </div>
    </article>
  );
}
