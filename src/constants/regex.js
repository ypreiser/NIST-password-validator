// Unicode-aware regex patterns
export const PATTERNS = {
    LOWERCASE: /\p{Lowercase_Letter}/u,
    UPPERCASE: /\p{Uppercase_Letter}/u,
    NUMBER: /\p{Number}/u,
    EMOJI: /\p{Extended_Pictographic}/u,
    SCRIPTS: {
      HAN: /\p{Script=Han}/u,
      HIRAGANA: /\p{Script=Hiragana}/u,
      KATAKANA: /\p{Script=Katakana}/u,
      HANGUL: /\p{Script=Hangul}/u,
      CYRILLIC: /\p{Script=Cyrillic}/u,
      ARABIC: /\p{Script=Arabic}/u,
      DEVANAGARI: /\p{Script=Devanagari}/u
    }
  };