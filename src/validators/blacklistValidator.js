// src\validators\blacklistValidator.js
const { isVariationMatch } = require("../utils/leetSpeak");

/**
 * Validate a password against a blacklist.
 * @param {string} password - The password to validate.
 * @param {Array<string>} blacklist - An array of blacklisted words.
 * @returns {Object} Validation result.
 */
function validatePassword(password, blacklist) {
  const blacklistSet = new Set(blacklist);

  for (const word of blacklistSet) {
    console.log(`Checking password: "${password}" against blacklisted word: "${word}"`);
    if (isVariationMatch(password, word)) {
      console.log(`Match found: "${password}" contains a variation of "${word}"`);
      return {
        isValid: false,
        error: "Password contains a blacklisted word or variation",
      };
    }
  }

  console.log(`No matches found for password: "${password}"`);
  return { isValid: true };
}

module.exports = { validatePassword };
