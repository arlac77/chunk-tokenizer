/**
 * @param {string} str
 * @return {Set<string>} all characters from the string
 */
export function characterSetFromString(str) {
  const cs = new Set();
  for (let i = 0; i < str.length; i++) {
    cs.add(str.charCodeAt(i));
  }

  return cs;
}
