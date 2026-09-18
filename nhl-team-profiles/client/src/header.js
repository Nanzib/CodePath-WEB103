/**
 * header.js
 * Builds a consistent site header programmatically.
 * This lets header appear on index and detail pages if we render header there as well.
 */
const headerEl = document.querySelector('header');

if (headerEl) {
  const container = document.createElement('div');
  container.className = 'container';

  const left = document.createElement('div');
  left.style.display = 'flex';
  left.style.alignItems = 'center';
  left.style.gap = '12px';

  const logo = document.createElement('img');
  logo.src = '/assets/nhl-logo.png'; // optional, add image to server/public/assets after build
  logo.alt = 'NHL';
  logo.style.height = '40px';

  const title = document.createElement('h2');
  title.textContent = 'NHL Team Profiles';

  left.append(logo, title);

  const right = document.createElement('div');
  const homeBtn = document.createElement('a');
  homeBtn.href = '/';
  homeBtn.className = 'contrast';
  homeBtn.textContent = 'Home';

  right.append(homeBtn);

  container.append(left, right);
  headerEl.append(container);
}
