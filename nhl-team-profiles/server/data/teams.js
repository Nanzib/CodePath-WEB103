/**
 * teams.js
 * Dataset of NHL team profiles for Listicle.
 * Fields:
 *  id, slug, name, city, founded, arena, conference, image, short, description, website, submittedBy, submittedOn
 */

const teams = [
  {
    id: 1,
    slug: 'new-york-rangers',
    name: 'New York Rangers',
    city: 'New York, NY',
    founded: 1926,
    arena: 'Madison Square Garden',
    conference: 'Eastern',
    image: 'https://imgc.allpostersimages.com/img/posters/nhl-new-york-rangers-maximalist-logo-23_u-l-fac43p0.jpg',
    short: 'Classic Broadway Blueshirts — rich history, iconic jerseys.',
    description:
      'Founded in 1926, the NY Rangers are an Original Six franchise with a passionate fanbase and a legacy of legendary players.',
    website: 'https://www.nhl.com/rangers',
    submittedBy: 'rangersFan1',
    submittedOn: '2024-11-01'
  },
  {
    id: 2,
    slug: 'boston-bruins',
    name: 'Boston Bruins',
    city: 'Boston, MA',
    founded: 1924,
    arena: 'TD Garden',
    conference: 'Eastern',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStMzcwxJ1Nio7_rH4HHJkzozKqYSHTEMmLZ6lIhP58KkwdodJud9aTMfECS1lNJyFsnWk',
    short: 'Tough, physical hockey and strong local support.',
    description:
      'The Bruins are known for physical play, passionate fans, and a long history dating back to the Original Six era.',
    website: 'https://www.nhl.com/bruins',
    submittedBy: 'bruinsFan',
    submittedOn: '2024-07-12'
  },
  {
    id: 3,
    slug: 'toronto-maple-leafs',
    name: 'Toronto Maple Leafs',
    city: 'Toronto, ON',
    founded: 1917,
    arena: 'Scotiabank Arena',
    conference: 'Eastern',
    image: 'https://m.media-amazon.com/images/I/81sMJpXHlqL._UF894,1000_QL80_.jpg',
    short: 'Historic franchise with a massive and loyal following.',
    description:
      'One of hockey’s most iconic clubs, the Maple Leafs combine tradition with a huge market and passionate supporters.',
    website: 'https://www.nhl.com/mapleleafs',
    submittedBy: 'leafsLover',
    submittedOn: '2024-08-19'
  },
  {
    id: 4,
    slug: 'detroit-red-wings',
    name: 'Detroit Red Wings',
    city: 'Detroit, MI',
    founded: 1926,
    arena: 'Little Caesars Arena',
    conference: 'Eastern',
    image: 'https://www.liveabout.com/thmb/qSEj0NjmaceYxkrchHO7CZYmKco=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Detroit_Red_Wings_logo-58b8da213df78c353c2346cb.jpg',
    short: 'Rich history with an iconic winged-wheel logo.',
    description:
      'The Red Wings are an Original Six franchise with a legacy of success and several Hall of Famers.',
    website: 'https://www.nhl.com/redwings',
    submittedBy: 'wingedWheel',
    submittedOn: '2024-09-03'
  },
  {
    id: 5,
    slug: 'washington-capitals',
    name: 'Washington Capitals',
    city: 'Washington, D.C.',
    founded: 1974,
    arena: 'Capital One Arena',
    conference: 'Eastern',
    image: 'https://yt3.googleusercontent.com/EJyZBEH1bo5Ag68R9V95BUa8qhR_BahbuB3sidzuhqcu0FCpWl4JyMvrrA9JY71_Yo7_LBqSFA=s900-c-k-c0x00ffffff-no-rj',
    short: 'High-powered offenses in recent eras and big-name stars.',
    description:
      'The Capitals deliver exciting offense and have an engaged capital city fanbase, crowned with a modern Stanley Cup win in 2018.',
    website: 'https://www.nhl.com/capitals',
    submittedBy: 'capitalsFan',
    submittedOn: '2024-06-18'
  }
];

export default teams;
