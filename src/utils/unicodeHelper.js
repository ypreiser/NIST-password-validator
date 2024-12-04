import { PATTERNS } from '../constants/regex';

export class UnicodeHelper {
  static countCodePoints(str) {
    return [...str].length;
  }

  static getScripts(password) {
    const scripts = new Set();
    
    Object.entries(PATTERNS.SCRIPTS).forEach(([script, pattern]) => {
      if (pattern.test(password)) {
        scripts.add(script);
      }
    });

    return Array.from(scripts);
  }

  static containsEmoji(password) {
    return PATTERNS.EMOJI.test(password);
  }

  static getUnicodeInfo(password) {
    return {
      totalCodePoints: this.countCodePoints(password),
      containsEmoji: this.containsEmoji(password),
      scripts: this.getScripts(password)
    };
  }
}