// client/src/utilities/calcPrice.js
export function toNumber(val) {
  const n = Number(val)
  return Number.isFinite(n) ? n : 0
}

export function calcTotal(basePrice, optionPrices = []) {
  return (toNumber(basePrice) + optionPrices.reduce((s, p) => s + toNumber(p), 0))
}
