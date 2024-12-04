import { LeetSpeakGenerator } from '../utils/leetSpeak';

export class BlacklistValidator {
  constructor(blacklist) {
    this.blacklist = new Set(blacklist);
  }

  validate(password) {
    for (const word of this.blacklist) {
      if (LeetSpeakGenerator.isVariationMatch(password, word)) {
        return {
          isValid: false,
          error: 'Password contains a blacklisted word or variation'
        };
      }
    }

    return { isValid: true };
  }
}