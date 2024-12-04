// src\constants\defaultOptions.js
export const DEFAULT_OPTIONS = {
    minLength: 15,
    maxLength: 128,
    requireLowercase: true,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    specialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    allowUnicode: true,
    minUnicodePoints: 0,
    blacklist: new Set()
  };