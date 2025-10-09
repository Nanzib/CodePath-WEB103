const header = document.querySelector('header');
if (!header) throw new Error('No header element found');

const headerContainer = document.createElement('div');
headerContainer.className = 'header-container container';

const left = document.createElement('div');
left.className = 'header-left';

const logo = document.createElement('img');
logo.src = 'https://imgc.allpostersimages.com/img/posters/nhl-new-york-rangers-maximalist-logo-23_u-l-fac43p0.jpg';
logo.alt = 'Rangers logo';
logo.className = 'logo';

const title = document.createElement('h1');
title.className = 'r-title';
title.textContent = 'Broadway Blues — NHL Listicle';

left.append(logo, title);

// right nav
const right = document.createElement('nav');
right.innerHTML = `<a href="/">Home</a>`;

headerContainer.append(left, right);
header.append(headerContainer);
