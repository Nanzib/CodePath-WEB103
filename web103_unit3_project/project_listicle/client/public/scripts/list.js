// list.js - renders team cards on the homepage
const renderTeams = async () => {
  try {
    const res = await fetch('/teams');
    const data = await res.json();

    const main = document.getElementById('main-content');

    if (!data || data.length === 0) {
      main.innerHTML = '<h2>No teams found</h2>';
      return;
    }

    data.forEach(team => {
      const card = document.createElement('article');
      card.className = 'team-card';

      const imgDiv = document.createElement('div');
      imgDiv.className = 'image';
      imgDiv.style.backgroundImage = `url(${team.image})`;

      const body = document.createElement('div');
      body.className = 'card-body';

      const h3 = document.createElement('h3');
      h3.textContent = team.name;

      const muted = document.createElement('p');
      muted.className = 'muted';
      muted.textContent = `${team.city} • Founded ${team.founded} • ${team.arena}`;

      const short = document.createElement('p');
      short.textContent = team.short;

      const more = document.createElement('a');
      more.className = 'more';
      more.href = `/teams/${encodeURIComponent(team.slug)}`;
      more.textContent = 'Read more →';

      body.append(h3, muted, short, more);
      card.append(imgDiv, body);
      main.append(card);
    });
  } catch (err) {
    console.error('Failed to load teams', err);
    const main = document.getElementById('main-content');
    main.innerHTML = '<p>Error loading teams.</p>';
  }
};

renderTeams();
