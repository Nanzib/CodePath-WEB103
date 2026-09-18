/**
 * team.js
 * On the detail page, fetch the teams list and render the selected one by slug.
 * The detail HTML should include a <main id="team-content"></main> placeholder.
 */

async function fetchTeams() {
  const res = await fetch('/teams');
  if (!res.ok) throw new Error('Failed to fetch teams');
  return res.json();
}

function formatDate(d) {
  return new Date(d).toLocaleDateString();
}

(async function renderTeam() {
  // extract slug from URL path, last path segment
  const slug = window.location.pathname.split('/').filter(Boolean).pop();
  if (!slug) return;

  try {
    const teams = await fetchTeams();
    const team = teams.find(t => t.slug === slug);

    const target = document.getElementById('team-content');
    if (!team) {
      target.innerHTML = '<h2>Team not found</h2><p>Try going back to <a href="/">Home</a>.</p>';
      return;
    }

    document.title = team.name;

    // Build details
    const article = document.createElement('article');
    article.className = 'grid';

    const left = document.createElement('div');
    if (team.image) {
      const img = document.createElement('img');
      img.src = team.image;
      img.alt = `${team.name} image`;
      left.append(img);
    }

    const right = document.createElement('div');
    const name = document.createElement('h2');
    name.textContent = team.name;

    const meta = document.createElement('p');
    meta.className = 'muted';
    meta.textContent = `${team.city} · ${team.conference} Conference · Founded ${team.founded}`;

    const desc = document.createElement('p');
    desc.textContent = team.description;

    const detailsList = document.createElement('ul');
    const liArena = document.createElement('li');
    liArena.textContent = `Arena: ${team.arena}`;
    const liOfficial = document.createElement('li');
    liOfficial.textContent = `Official site: ${team.website || '—'}`;
    const liSubmitted = document.createElement('li');
    liSubmitted.textContent = `Submitted by ${team.submittedBy} on ${formatDate(team.submittedOn)}`;

    detailsList.append(liArena, liOfficial, liSubmitted);

    right.append(name, meta, desc, detailsList);

    article.append(left, right);
    target.append(article);

  } catch (err) {
    console.error(err);
  }
})();
