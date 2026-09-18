// client/src/utilities/validation.js

/**
 * Return null if the given form is valid, otherwise return a short error string.
 */
export function validateCombination(form) {
  if (!form) return 'Form is empty'

  const { feature_a, feature_b, feature_c } = form

  // Example concrete rule: electric + carbon wheels is invalid
  if (feature_b === 'electric' && feature_c === 'carbon wheels') {
    return 'Electric builds cannot use carbon wheels.'
  }

  // Example concrete rule: V8 + matte-black + whitewalls invalid
  if (feature_b === 'V8' && feature_a === 'matte-black' && feature_c === 'whitewalls') {
    return 'V8 is not compatible with matte-black + whitewalls.'
  }

  // no rule triggered
  return null
}

/**
 * isOptionDisabled(form, key, option)
 * Returns true if choosing `option` for `key` would create an invalid combination.
 * Used to disable option buttons before the user selects them.
 *
 * key is one of 'feature_a' | 'feature_b' | 'feature_c'
 */
export function isOptionDisabled(form, key, option) {
  // simulate new form after selecting option for key
  const newForm = { ...(form || {}) , [key]: option }

  // Reuse validateCombination: if it returns an error for the simulated selection -> disabled
  const err = validateCombination(newForm)
  return Boolean(err)
}
