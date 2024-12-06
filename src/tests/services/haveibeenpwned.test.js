// src\tests\services\haveibeenpwned.test.js

import { isPasswordPwned } from '../../services/haveibeenpwned';

// Mock fetch globally
global.fetch = jest.fn();
global.crypto = {
  subtle: {
    digest: jest.fn(),
  },
};
global.TextEncoder = jest.fn().mockImplementation(() => ({
  encode: jest.fn().mockReturnValue(new Uint8Array([1, 2, 3])),
}));

describe('Password Security Tests', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    fetch.mockClear();
    crypto.subtle.digest.mockClear();
  });

  describe('isPasswordPwned', () => {
    it('should return true when password is found in breach database', async () => {
      // Mock SHA-1 hash generation
      const mockHashBuffer = new Uint8Array([
        0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0,
        0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0,
        0x12, 0x34, 0x56, 0x78, 0x9a
      ]).buffer;
      
      crypto.subtle.digest.mockResolvedValueOnce(mockHashBuffer);

      // Mock API response with a matching hash suffix
      const mockApiResponse = '1234567890ABC:1\nBCDEF01234567:2\n';
      fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockApiResponse),
        includes: () => true
      });

      const result = await isPasswordPwned('test-password');
      expect(result).toBe(true);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(crypto.subtle.digest).toHaveBeenCalledTimes(1);
    });

    it('should return false when password is not found in breach database', async () => {
      // Mock SHA-1 hash generation
      const mockHashBuffer = new Uint8Array([
        0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0,
        0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0,
        0x12, 0x34, 0x56, 0x78, 0x9a
      ]).buffer;
      
      crypto.subtle.digest.mockResolvedValueOnce(mockHashBuffer);

      // Mock API response without a matching hash suffix
      const mockApiResponse = '1234567890ABC:1\nBCDEF01234567:2\n';
      fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockApiResponse),
        includes: () => false
      });

      const result = await isPasswordPwned('secure-password');
      expect(result).toBe(false);
    });

    it('should throw error when API request fails', async () => {
      // Mock SHA-1 hash generation
      const mockHashBuffer = new Uint8Array([
        0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0,
        0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0,
        0x12, 0x34, 0x56, 0x78, 0x9a
      ]).buffer;
      
      crypto.subtle.digest.mockResolvedValueOnce(mockHashBuffer);

      // Mock failed API response
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      await expect(isPasswordPwned('test-password'))
        .rejects
        .toThrow('Failed to check password against HaveIBeenPwned API.');
    });

    it('should throw error when network request fails', async () => {
      // Mock SHA-1 hash generation
      const mockHashBuffer = new Uint8Array([
        0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0,
        0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0,
        0x12, 0x34, 0x56, 0x78, 0x9a
      ]).buffer;
      
      crypto.subtle.digest.mockResolvedValueOnce(mockHashBuffer);

      // Mock network error
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(isPasswordPwned('test-password'))
        .rejects
        .toThrow('HaveIBeenPwned check failed: Network error');
    });

    it('should throw error when hash generation fails', async () => {
      // Mock failed hash generation
      crypto.subtle.digest.mockRejectedValueOnce(new Error('Hash generation failed'));

      await expect(isPasswordPwned('test-password'))
        .rejects
        .toThrow('HaveIBeenPwned check failed: Hash generation failed');
    });
  });

  describe('SHA-1 hash generation', () => {
    it('should generate correct SHA-1 hash format', async () => {
      const mockHashBuffer = new Uint8Array([
        0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0,
        0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0,
        0x12, 0x34, 0x56, 0x78, 0x9a
      ]).buffer;
      
      crypto.subtle.digest.mockResolvedValueOnce(mockHashBuffer);

      const mockApiResponse = '1234567890ABC:1\nBCDEF01234567:2\n';
      fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockApiResponse),
        includes: () => false
      });

      await isPasswordPwned('test-password');
      
      // Verify SHA-1 hash generation was called with correct parameters
      expect(crypto.subtle.digest).toHaveBeenCalledWith(
        'SHA-1',
        expect.any(Uint8Array)
      );
    });
  });
});