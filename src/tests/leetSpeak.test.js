import { LeetSpeakGenerator } from "../utils/leetSpeak";

describe("LeetSpeakGenerator", () => {
  test("generateVariations should generate correct leet speak variations", () => {
    const word = "test";
    const expectedVariations = expect.arrayContaining([
      "test",
      "t3st",
      "t3s7",
      "t3$7",
      "t3$t",
      "t7st",
      "t7s7",
      "t7$7",
      "t$st",
      "t$s7",
      "t$$7",
      "t$$t",
      "t4st",
      "t4s7",
      "t4$7",
      "t4$t",
      "t@st",
      "t@s7",
      "t@$7",
      "t@$t",
      "7est",
      "7e$t",
      "7e5t",
      "7e$t",
      "7e$t",
      "7e$t",
      "7e$t",
      "7e$t",
      "7e$t",
      "7e$t",
      "7e$t",
      "7e$t",
    ]);
    const variations = LeetSpeakGenerator.generateVariations(word);
    console.log(variations);
    expect(variations).toEqual(expectedVariations);
  });

  test("isVariationMatch should return true for matching variations", () => {
    const password = "myP@ssw0rd";
    const blacklistedWord = "password";
    expect(LeetSpeakGenerator.isVariationMatch(password, blacklistedWord)).toBe(
      true
    );
  });

  test("isVariationMatch should return false for non-matching variations", () => {
    const password = "mysecret";
    const blacklistedWord = "password";
    expect(LeetSpeakGenerator.isVariationMatch(password, blacklistedWord)).toBe(
      false
    );
  });
});
