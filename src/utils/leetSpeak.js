// src\utils\leetSpeak.js
const LEET_MAP = {
  a: ['4', '@'],
  e: ['3'],
  i: ['1', '!'],
  o: ['0'],
  s: ['$', '5'],
  t: ['7'],
};

/**
 * Generate all leetspeak variations of a given word.
 * @param {string} word
 * @returns {string[]} Variations
 */
function generateLeetVariations(word) {
  if (!word) return [''];
  const variations = new Set();
  
  function generateRecursive(current, index) {
    if (index === word.length) {
      variations.add(current);
      return;
    }

    const char = word[index].toLowerCase();
    // Always include the original character as a variation
    const mappedVariations = [char, ...(LEET_MAP[char] || [])];

    for (const variation of mappedVariations) {
      generateRecursive(current + variation, index + 1);
    }
  }

  generateRecursive('', 0);
  return Array.from(variations);
}

/**
 * Check if a password matches any leetspeak variation of a blacklisted word.
 * @param {string} password
 * @param {string} blacklistedWord
 * @returns {boolean} Whether it matches
 */
function isVariationMatch(password, blacklistedWord) {
  if (!password || !blacklistedWord) return false;

  const lowercasePassword = password.toLowerCase();
  const variations = generateLeetVariations(blacklistedWord);

  return variations.some(variation =>
    lowercasePassword.includes(variation.toLowerCase())
  );
}

module.exports = { generateLeetVariations, isVariationMatch, LEET_MAP };