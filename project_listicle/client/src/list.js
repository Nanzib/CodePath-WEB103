/**
 * list.js
 * Fetches /teams and displays a card grid.
 * Each card links to /teams/:slug (this route will be handled by server to serve team detail page).
 */

async function fetchTeams() {
  const res = await fetch('/teams');
  if (!res.ok) throw new Error('Failed to fetch teams');
  return res.json();
}

function createTeamCard(team) {
  const article = document.createElement('article');
  article.className = 'card';

  // Image
  if (team.image) {
    const img = document.createElement('img');
    img.src = team.image; // expected to be a public path (after build) like /assets/xxx.jpg
    img.alt = `${team.name} logo or arena`;
    article.append(img);
  }

  const body = document.createElement('div');
  body.className = 'card-body';

  const h3 = document.createElement('h3');
  h3.textContent = team.name;

  const meta = document.createElement('p');
  meta.className = 'muted';
  meta.textContent = `${team.city} · Founded ${team.founded} · Arena: ${team.arena}`;

  const excerpt = document.createElement('p');
  excerpt.textContent = team.short;

  const link = document.createElement('a');
  link.href = `/teams/${team.slug}`; // server will serve team HTML for this route
  link.textContent = 'Read more →';

  body.append(h3, meta, excerpt, link);
  article.append(body);

  return article;
}

(async function renderList() {
  try {
    const listContainer = document.getElementById('list');
    const teams = await fetchTeams();

    if (!teams || teams.length === 0) {
      listContainer.innerHTML = '<h2>No teams available 😞</h2>';
      return;
    }

    teams.forEach(team => {
      const card = createTeamCard(team);
      listContainer.append(card);
    });
  } catch (err) {
    console.error(err);
    const listContainer = document.getElementById('list');
    listContainer.innerHTML = '<p>Error loading teams. Check the server console.</p>';
  }
})();
