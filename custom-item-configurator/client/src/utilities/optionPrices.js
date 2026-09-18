// client/src/utilities/optionPrices.js
// central place for option prices & preview style helpers

export const PRICES = {
  base: 700, // base price for a car (adjust as you like)
  feature_a: { // color / exterior
    red: 0,
    black: 50,
    blue: 25,
    'matte-black': 75,
    gold: 150
  },
  feature_b: { // engine / power
    V8: 400,
    V6: 200,
    electric: 300,
    turbo: 350
  },
  feature_c: { // wheels / style
    'alloy wheels': 100,
    'steel wheels': 0,
    whitewalls: 80,
    'carbon wheels': 200
  }
}

// Map colors to simple CSS filter transformations for preview (we tint the single image).
export const COLOR_FILTERS = {
  red: 'sepia(0.6) saturate(2) hue-rotate(-10deg)',
  black: 'grayscale(1) contrast(1.2)',
  blue: 'sepia(0.2) saturate(2) hue-rotate(170deg)',
  'matte-black': 'grayscale(1) contrast(0.85) brightness(0.7)',
  gold: 'sepia(0.7) saturate(2) hue-rotate(20deg)'
}

/**
 * calcPrice(form) -> number
 * Accepts an object with feature_a, feature_b, feature_c.
 * Returns a numeric total.
 */
export function calcPrice({ feature_a, feature_b, feature_c } = {}) {
  const base = PRICES.base || 0
  const a = PRICES.feature_a[feature_a] ?? 0
  const b = PRICES.feature_b[feature_b] ?? 0
  const c = PRICES.feature_c[feature_c] ?? 0
  // round to 2 decimals
  return Math.round((base + a + b + c) * 100) / 100
}

/**
 * getPreviewStyle(feature_a)
 * returns an inline style object to apply to the <img> to visually show the selected color.
 */
export function getPreviewStyle(feature_a) {
  const filter = COLOR_FILTERS[feature_a] ?? 'none'
  return { filter, transition: 'filter 200ms ease' }
}
