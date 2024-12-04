import { DEFAULT_OPTIONS } from "./constants/defaultOptions";
import { BlacklistValidator } from "./validators/blacklistValidator";
import { CharacterValidator } from "./validators/characterValidator";
import { UnicodeValidator } from "./validators/unicodeValidator";
import { HaveIBeenPwnedService } from "./services/haveibeenpwned";

export class PasswordValidator {
  constructor(options = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };

    // Initialize validators
    this.blacklistValidator = new BlacklistValidator(this.options.blacklist);
    this.characterValidator = new CharacterValidator(this.options);
    this.unicodeValidator = new UnicodeValidator(this.options);
  }

  async validate(password) {
    const results = {
      isValid: true,
      errors: [],
      breachCount: 0,
      unicodeInfo: null,
    };

    // Unicode validation
    const unicodeResult = this.unicodeValidator.validate(password);
    if (!unicodeResult.isValid) {
      results.errors.push(...unicodeResult.errors);
    }
    results.unicodeInfo = unicodeResult.unicodeInfo;
    // Character validation
    const characterResult = this.characterValidator.validate(password);
    if (!characterResult.isValid) {
      results.errors.push(...characterResult.errors);
    }
    // Black list validation
    const blacklistResult = this.blacklistValidator.validate(password);
    if (!blacklistResult.isValid) {
      results.errors.push(blacklistResult.error);
    }
    // Breach validation
    try {
      const breachCount = await HaveIBeenPwnedService.checkPassword(password);
      if (breachCount > 0) {
        results.isValid = false;
        results.errors.push(`Password found in ${breachCount} data breaches`);
        results.breachCount = breachCount;
      }
    } catch (error) {
      results.isValid = false;
      results.errors.push(error.message);
    }
    results.isValid = results.isValid && results.errors.length === 0;
    return results;
  }
}
