// client/src/utilities/optionPrices.js
export const featureAPrices = {
  red: 50,
  black: 30,
  blue: 20,
  'matte-black': 80
}

export const featureBPrices = {
  V8: 500,
  V6: 300,
  electric: 400,
  turbo: 600
}

export const featureCPrices = {
  'alloy wheels': 150,
  'steel wheels': 50,
  whitewalls: 80,
  'carbon wheels': 200
}

export function calcPrice(base = 0, feature_a, feature_b, feature_c) {
  const a = featureAPrices[feature_a] ?? 0
  const b = featureBPrices[feature_b] ?? 0
  const c = featureCPrices[feature_c] ?? 0
  return Number(base || 0) + a + b + c
}
