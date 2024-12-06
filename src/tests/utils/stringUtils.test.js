// src\tests\utils\stringUtils.test.js

import { escapeRegExp } from '../../utils/stringUtils';

describe('escapeRegExp', () => {
  test('should escape special regex characters', () => {
    const input = '.*+?^${}()|[]\\';
    const expectedOutput = '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\'; // Corrected expected output
    expect(escapeRegExp(input)).toBe(expectedOutput);
  });

  test('should return the same string if no special characters', () => {
    const input = 'hello world';
    expect(escapeRegExp(input)).toBe(input); // No special characters, should return the same
  });

  test('should escape only special characters', () => {
    const input = 'hello (world) $100';
    const expectedOutput = 'hello \\(world\\) \\$100'; // Only the parentheses and dollar sign should be escaped
    expect(escapeRegExp(input)).toBe(expectedOutput);
  });
});
