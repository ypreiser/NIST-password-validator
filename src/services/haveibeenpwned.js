// src\services\haveibeenpwned.js
// src/services/haveibeenpwned.js

const API_URL = 'https://api.pwnedpasswords.com/range/';

export class HaveIBeenPwnedService {
  /**
   * Checks if the given password has been exposed in a data breach.
   * @param {string} password - The password to check.
   * @returns {Promise<number>} - Number of times the password was found in breaches (0 if not found).
   */
  static async checkPassword(password) {
    try {
      const hash = await this.generateSHA1(password);
      const prefix = hash.slice(0, 5);
      const suffix = hash.slice(5);

      const response = await fetch(`${API_URL}${prefix}`);
      if (!response.ok) {
        throw new Error('Failed to check password against HaveIBeenPwned API.');
      }

      const hashes = (await response.text()).split('\n');
      const match = hashes.find(line => line.startsWith(suffix));
      if (match) {
        const [, count] = match.split(':');
        return parseInt(count, 10);
      }

      return 0;
    } catch (error) {
      console.error('Error during password breach check:', error.message);
      throw new Error(`HaveIBeenPwned check failed: ${error.message}`);
    }
  }

  /**
   * Generates a SHA-1 hash for the given password.
   * @param {string} password - The password to hash.
   * @returns {Promise<string>} - The SHA-1 hash of the password.
   */
  static async generateSHA1(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  }
}
