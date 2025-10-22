// client/src/utilities/validation.js
export function validateCombination({ feature_a, feature_b, feature_c }) {
  if (feature_b === 'electric' && feature_c === 'alloy wheels') {
    return 'Electric engine is not compatible with alloy wheels in this demo.'
  }
  return null
}
