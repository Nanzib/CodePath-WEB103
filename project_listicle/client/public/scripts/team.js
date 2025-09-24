// Robust team detail renderer that reads slug from pathname (/teams/:slug),
// fetches the teams JSON, and builds a full detail layout.

const getSlugFromPath = () => {
  // Example path: /teams/new-york-rangers
  const parts = window.location.pathname.split('/').filter(Boolean);
  // if route is /teams/<slug>, slug will be the last part
  return parts.length ? parts[parts.length - 1] : null;
};

const renderTeam = async () => {
  const slug = getSlugFromPath();
  const root = document.getElementById('team-content');
  root.innerHTML = ''; // clear while loading

  if (!slug) {
    root.innerHTML = `<h2>Invalid team page</h2><p><a href="/">Back home</a></p>`;
    return;
  }

  try {
    const res = await fetch('/teams');
    if (!res.ok) throw new Error(`Failed to fetch teams: ${res.status}`);
    const teams = await res.json();

    const team = teams.find(t => t.slug === slug);
    if (!team) {
      root.innerHTML = `
        <h2>Team not found</h2>
        <p>No team found for <strong>${slug}</strong>.</p>
        <p><a href="/">Back to list</a></p>
      `;
      return;
    }

    document.title = `${team.name} — NHL Teams`;

    // build markup: matches classes in your style.css
    root.innerHTML = `
      <div class="team-detail-grid">
        <div class="team-image">
          <img src="${team.image}" alt="${team.name} logo" />
        </div>

        <div class="team-info">
          <h2>${team.name}</h2>
          <p class="muted">${team.city} • Founded ${team.founded} • ${team.arena}</p>

          <dl>
            <dt>Conference</dt><dd>${team.conference}</dd>
            <dt>Website</dt><dd><a href="${team.website}" target="_blank" rel="noopener">${team.website}</a></dd>
            <dt>Submitted By</dt><dd>${team.submittedBy}</dd>
            <dt>Submitted On</dt><dd>${team.submittedOn}</dd>
          </dl>

          <h3>About</h3>
          <p>${team.description}</p>

          <div style="margin-top:16px;">
            <a href="/" role="button">Back to list</a>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    console.error(err);
    root.innerHTML = `<p>Error loading team details. Check console for details.</p>`;
  }
};

renderTeam();
