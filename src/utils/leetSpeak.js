const LEET_MAP = {
    a: ['4', '@'],
    e: ['3'],
    i: ['1', '!'],
    o: ['0'],
    s: ['$', '5'],
    t: ['7'],
  };
  
  export class LeetSpeakGenerator {
    static generateVariations(word) {
      const patterns = [];
      
      function generateRecursive(current, index) {
        if (index === word.length) {
          patterns.push(current);
          return;
        }
  
        const char = word[index].toLowerCase();
        const variations = LEET_MAP[char] || [char];
  
        variations.forEach(variation => {
          generateRecursive(current + variation, index + 1);
        });
      }
  
      generateRecursive('', 0);
      return patterns;
    }
  
    static isVariationMatch(password, blacklistedWord) {
      const lowercasePassword = password.toLowerCase();
      return this.generateVariations(blacklistedWord).some(variation => 
        lowercasePassword.includes(variation.toLowerCase())
      );
    }
  }