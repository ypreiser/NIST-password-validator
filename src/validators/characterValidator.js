import { PATTERNS } from '../constants/regex';
import { escapeRegExp } from '../utils/stringUtils';

export class CharacterValidator {
  constructor(options) {
    this.options = options;
    this.specialCharsRegex = new RegExp(`[${escapeRegExp(options.specialChars)}]`);
  }

  validate(password) {
    const errors = [];

    if (this.options.requireLowercase && !PATTERNS.LOWERCASE.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (this.options.requireUppercase && !PATTERNS.UPPERCASE.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (this.options.requireNumbers && !PATTERNS.NUMBER.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (this.options.requireSpecialChars && !this.specialCharsRegex.test(password)) {
      errors.push(`Password must contain at least one special character (${this.options.specialChars})`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}