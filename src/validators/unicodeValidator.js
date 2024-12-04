import { UnicodeHelper } from '../utils/unicodeHelper';

export class UnicodeValidator {
  constructor(options) {
    this.options = options;
  }

  validate(password) {
    const errors = [];
    const unicodeInfo = UnicodeHelper.getUnicodeInfo(password);

    if (!this.options.allowUnicode && 
        (unicodeInfo.containsEmoji || unicodeInfo.scripts.length > 0)) {
      errors.push('Unicode characters are not allowed in this password policy');
    }

    const codePoints = unicodeInfo.totalCodePoints;

    if (codePoints < this.options.minLength) {
      errors.push(`Password must be at least ${this.options.minLength} characters long (currently ${codePoints})`);
    }

    if (codePoints > this.options.maxLength) {
      errors.push(`Password must be no more than ${this.options.maxLength} characters long (currently ${codePoints})`);
    }

    if (this.options.minUnicodePoints > 0 && codePoints < this.options.minUnicodePoints) {
      errors.push(`Password must contain at least ${this.options.minUnicodePoints} Unicode characters`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      unicodeInfo
    };
  }
}