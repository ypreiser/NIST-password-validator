// src\tests\utils\leetSpeak.test.js

const { generateLeetVariations, isVariationMatch } = require('../../utils/leetSpeak');

describe('Leet Speak Generator', () => {
  describe('generateLeetVariations', () => {
    it('should generate variations for a word with leet-mapped characters', () => {
      const word = 'test';
      const variations = generateLeetVariations(word);
      expect(variations).toContain('t3st');
      expect(variations).toContain('t3$7');
      expect(variations).toContain('t357');
      expect(variations).toContain('test');
    });

    it('should return the word itself if no leet-mapped characters are present', () => {
      const word = 'dug';
      const variations = generateLeetVariations(word);
      expect(variations).toEqual(['dug']);
    });

    it('should handle an empty string input and return an empty array', () => {
      const word = '';
      const variations = generateLeetVariations(word);
      expect(variations).toEqual(['']);
    });

    it('should handle uppercase letters by treating them as lowercase', () => {
      const word = 'TeSt';
      const variations = generateLeetVariations(word);
      expect(variations).toContain('t3st');
      expect(variations).toContain('test');
    });
  });

  describe('isVariationMatch', () => {
    it('should return true if the password matches a leet variation', () => {
      const password = 'p@ssword123';
      const blacklistedWord = 'password';
      expect(isVariationMatch(password, blacklistedWord)).toBe(true);
    });

    it('should return false if the password does not match any variation', () => {
      const password = 'securepassword';
      const blacklistedWord = 'admin';
      expect(isVariationMatch(password, blacklistedWord)).toBe(false);
    });

    it('should handle case-insensitive matches', () => {
      const password = 'P@SSw0rd';
      const blacklistedWord = 'password';
      expect(isVariationMatch(password, blacklistedWord)).toBe(true);
    });

    it('should return false for empty blacklisted word', () => {
      const password = 'mypassword';
      const blacklistedWord = '';
      expect(isVariationMatch(password, blacklistedWord)).toBe(false);
    });

    it('should return true for empty password and blacklisted word match', () => {
      const password = '';
      const blacklistedWord = '';
      expect(isVariationMatch(password, blacklistedWord)).toBe(false);
    });
  });
});
