// src\tests\validators\blacklistValidator.test.js

const { validatePassword } = require('../../validators/blacklistValidator');

describe('Blacklist Validator', () => {
  const blacklist = ['password', '1234', 'letmein'];

  it('should return invalid for a password containing a blacklisted word', () => {
    const result = validatePassword('mypassword123', blacklist);
    expect(result).toEqual({
      isValid: false,
      error: 'Password contains a blacklisted word or variation'
    });
  });

  it('should return valid for a password not containing a blacklisted word', () => {
    const result = validatePassword('securePassword!', blacklist);
    expect(result).toEqual({ isValid: true });
  });

  it('should return invalid for a password containing a leetspeak variation', () => {
    const result = validatePassword('p@ssw0rd', blacklist);
    expect(result).toEqual({
      isValid: false,
      error: 'Password contains a blacklisted word or variation'
    });
  });

  it('should return valid for an empty password', () => {
    const result = validatePassword('', blacklist);
    expect(result).toEqual({ isValid: true });
  });

  it('should return valid for a password with no blacklisted words', () => {
    const result = validatePassword('mySecurePassword!', blacklist);
    expect(result).toEqual({ isValid: true });
  });
});
