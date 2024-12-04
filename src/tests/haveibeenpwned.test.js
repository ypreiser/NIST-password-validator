// src\tests\haveibeenpwned.test.js
// src/tests/haveibeenpwned.test.js
import { HaveIBeenPwnedService } from '../services/haveibeenpwned';

describe('HaveIBeenPwnedService', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Ensure fetch is reset after each test
  });

  describe('checkPassword', () => {
    it('should return the count of password breaches', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve('ABCDEF:5\n123456:10\n'),
        })
      );

      const count = await HaveIBeenPwnedService.checkPassword('password123');
      expect(count).toBe(0); // Adjust based on the expected hash
    });

    it('should return the count for a breached password', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve('CBFDAC6008F9CAB4083784CBD1874F76618D2A97:5\n'),
        })
      );

      const count = await HaveIBeenPwnedService.checkPassword('password123');
      expect(count).toBe(5); // Expecting 5 breaches for the hashed password
    });

    it('should throw an error if fetch fails', async () => {
      global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

      await expect(HaveIBeenPwnedService.checkPassword('password123')).rejects.toThrow(
        'HaveIBeenPwned check failed: Network error'
      );
    });

    it('should handle invalid hash response', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve('INVALID_RESPONSE\n'),
        })
      );

      const count = await HaveIBeenPwnedService.checkPassword('password123');
      expect(count).toBe(0); // Expecting 0 since the hash does not match
    });

    it('should return 0 for an empty password', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve('ABCDEF:5\n123456:10\n'),
        })
      );

      const count = await HaveIBeenPwnedService.checkPassword('');
      expect(count).toBe(0); // Expecting 0 for empty password
    });
  });

  describe('generateSHA1', () => {
    it('should generate a SHA-1 hash in uppercase', async () => {
      const hash = await HaveIBeenPwnedService.generateSHA1('password123');
      expect(hash).toBe('CBFDAC6008F9CAB4083784CBD1874F76618D2A97');
    });

    it('should throw an error for non-string inputs', async () => {
      await expect(HaveIBeenPwnedService.generateSHA1(null)).rejects.toThrow();
    });

    it('should generate unique hashes for different passwords', async () => {
      const hash1 = await HaveIBeenPwnedService.generateSHA1('password123');
      const hash2 = await HaveIBeenPwnedService.generateSHA1('differentPassword');
      expect(hash1).not.toBe(hash2);
    });
  });
});
