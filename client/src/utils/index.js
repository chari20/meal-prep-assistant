/**
 * Checks if a value is considered "empty".
 * Adjust these rules to match what "empty" means for your form.
 */
function isEmptyValue(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'number') return value === 0;
  if (typeof value === 'boolean') return value === false;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Recursively checks an object for empty values.
 * Returns { isEmpty: boolean, emptyPaths: string[] }
 */
export function checkForEmptyValues(obj, parentPath = '') {
  let emptyPaths = [];

  for (const [key, value] of Object.entries(obj)) {
    const path = parentPath ? `${parentPath}.${key}` : key;

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      // Recurse into nested objects (e.g. meal_prep_style, goals)
      const nested = checkForEmptyValues(value, path);
      emptyPaths = emptyPaths.concat(nested.emptyPaths);
    } else if (isEmptyValue(value)) {
      emptyPaths.push(path);
    }
  }

  return {
    isEmpty: emptyPaths.length > 0,
    emptyPaths,
  };
}
export default {};
