import { describe, it, expect, vi } from "vitest";
import {
  // Number Formatters
  formatCurrency,
  formatCompact,
  clamp,
  roundTo,
  toOrdinal,
  isEven,
  isOdd,
  percentage,
  sum,
  average,
  padNumber,
  toFixedNumber,
  inRange,
  formatBytes,
  randomInt,
  // Regex Validators
  isEmail,
  isURL,
  isIPv4,
  isIPv6,
  isHexColor,
  isCreditCard,
  isStrongPassword,
  isUUID,
  isSlug,
  isMACAddress,
  isLatLong,
  isPostalCode,
  isPhoneNumber,
  // String Utilities
  isAlphanumeric,
  removeSpaces,
  getRandomString,
  getTimestamp,
  capitalize,
  capitalizeWords,
  camelCase,
  snakeCase,
  kebabCase,
  pascalCase,
  truncate,
  slugify,
  escapeHtml,
  unescapeHtml,
  reverseString,
  countOccurrences,
  isPalindrome,
  mask,
  wordCount,
  stripHtml,
  initials,
  // URL Utilities
  getUrlParams,
  parseQueryString,
  buildQueryString,
  // Object Utilities
  isObject,
  getSizeOfObject,
  isObjectEmpty,
  deepClone,
  pick,
  omit,
  deepMerge,
  flattenObject,
  unflattenObject,
  invertObject,
  mapKeys,
  mapValues,
  hasPath,
  getPath,
  setPath,
  // JSON Utilities
  isJson,
  // Array Utilities
  unique,
  uniqueBy,
  chunk,
  flatten,
  shuffle,
  groupBy,
  sortBy,
  intersection,
  difference,
  union,
  compact,
  sample,
  range,
  partition,
  zip,
  unzip,
  first,
  last,
  countBy,
  minBy,
  maxBy,
  // Misc Utilities
  debounce,
  throttle,
  sleep,
  retry,
  memoize,
  pipe,
  compose,
  deepEqual,
  generateId,
  noop,
  times,
  isEmpty,
  // HTTP
  sendHttpRequest,
  // Legacy
  geturlParams,
  getRandomNumber,
} from "../src/index";

// =============================================================================
// NUMBER FORMATTERS
// =============================================================================

describe("formatCurrency", () => {
  it("should format as USD by default", () => {
    expect(formatCurrency(1234.56)).toBe("$1,234.56");
  });

  it("should format with custom currency and locale", () => {
    const result = formatCurrency(1234.56, "EUR", "de-DE");
    // Different environments may use different space chars
    expect(result).toContain("1.234,56");
    expect(result).toContain("€");
  });

  it("should handle zero", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });
});

describe("formatCompact", () => {
  it("should format thousands as K", () => {
    expect(formatCompact(1000)).toBe("1K");
    expect(formatCompact(1500)).toBe("1.5K");
  });

  it("should format millions as M", () => {
    expect(formatCompact(1000000)).toBe("1M");
    expect(formatCompact(1500000)).toBe("1.5M");
  });

  it("should format billions as B", () => {
    expect(formatCompact(1000000000)).toBe("1B");
  });

  it("should return number as string for small values", () => {
    expect(formatCompact(999)).toBe("999");
    expect(formatCompact(42)).toBe("42");
  });

  it("should handle negative numbers", () => {
    expect(formatCompact(-1500)).toBe("-1.5K");
  });
});

describe("clamp", () => {
  it("should clamp above max", () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("should clamp below min", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it("should return value if in range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });
});

describe("roundTo", () => {
  it("should round to specified decimal places", () => {
    expect(roundTo(3.14159, 2)).toBe(3.14);
    expect(roundTo(3.14159, 0)).toBe(3);
    expect(roundTo(3.145, 2)).toBe(3.15);
  });
});

describe("toOrdinal", () => {
  it("should return correct ordinal suffixes", () => {
    expect(toOrdinal(1)).toBe("1st");
    expect(toOrdinal(2)).toBe("2nd");
    expect(toOrdinal(3)).toBe("3rd");
    expect(toOrdinal(4)).toBe("4th");
    expect(toOrdinal(11)).toBe("11th");
    expect(toOrdinal(12)).toBe("12th");
    expect(toOrdinal(13)).toBe("13th");
    expect(toOrdinal(21)).toBe("21st");
    expect(toOrdinal(22)).toBe("22nd");
    expect(toOrdinal(23)).toBe("23rd");
    expect(toOrdinal(101)).toBe("101st");
    expect(toOrdinal(111)).toBe("111th");
  });
});

describe("isEven / isOdd", () => {
  it("should identify even numbers", () => {
    expect(isEven(0)).toBe(true);
    expect(isEven(2)).toBe(true);
    expect(isEven(3)).toBe(false);
  });

  it("should identify odd numbers", () => {
    expect(isOdd(1)).toBe(true);
    expect(isOdd(3)).toBe(true);
    expect(isOdd(4)).toBe(false);
  });
});

describe("percentage", () => {
  it("should calculate percentage", () => {
    expect(percentage(25, 200)).toBe(12.5);
    expect(percentage(50, 100)).toBe(50);
  });

  it("should return 0 for zero total", () => {
    expect(percentage(10, 0)).toBe(0);
  });
});

describe("sum", () => {
  it("should sum numbers", () => {
    expect(sum([1, 2, 3, 4])).toBe(10);
  });

  it("should return 0 for empty array", () => {
    expect(sum([])).toBe(0);
  });
});

describe("average", () => {
  it("should calculate average", () => {
    expect(average([1, 2, 3, 4])).toBe(2.5);
  });

  it("should return 0 for empty array", () => {
    expect(average([])).toBe(0);
  });
});

describe("padNumber", () => {
  it("should pad with leading zeros", () => {
    expect(padNumber(5, 3)).toBe("005");
    expect(padNumber(42, 5)).toBe("00042");
    expect(padNumber(12345, 3)).toBe("12345");
  });
});

describe("toFixedNumber", () => {
  it("should return a number with fixed decimals", () => {
    expect(toFixedNumber(1.2345, 2)).toBe(1.23);
    expect(typeof toFixedNumber(1.5, 0)).toBe("number");
  });
});

describe("inRange", () => {
  it("should check if number is in range", () => {
    expect(inRange(5, 1, 10)).toBe(true);
    expect(inRange(0, 1, 10)).toBe(false);
    expect(inRange(10, 1, 10)).toBe(true);
  });
});

describe("formatBytes", () => {
  it("should format bytes", () => {
    expect(formatBytes(0)).toBe("0 Bytes");
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(1048576)).toBe("1 MB");
    expect(formatBytes(1073741824)).toBe("1 GB");
  });

  it("should respect decimals parameter", () => {
    expect(formatBytes(1536, 1)).toBe("1.5 KB");
  });
});

describe("randomInt", () => {
  it("should return integer within range", () => {
    for (let i = 0; i < 50; i++) {
      const val = randomInt(1, 10);
      expect(val).toBeGreaterThanOrEqual(1);
      expect(val).toBeLessThanOrEqual(10);
      expect(Number.isInteger(val)).toBe(true);
    }
  });
});

// =============================================================================
// REGEX VALIDATORS
// =============================================================================

describe("isEmail", () => {
  it("should validate emails", () => {
    expect(isEmail("test@example.com")).toBe(true);
    expect(isEmail("user.name@domain.co")).toBe(true);
    expect(isEmail("invalid")).toBe(false);
    expect(isEmail("@domain.com")).toBe(false);
    expect(isEmail("user@")).toBe(false);
  });
});

describe("isURL", () => {
  it("should validate URLs", () => {
    expect(isURL("https://example.com")).toBe(true);
    expect(isURL("http://localhost:3000")).toBe(true);
    expect(isURL("ftp://files.example.com")).toBe(true);
    expect(isURL("not-a-url")).toBe(false);
    expect(isURL("")).toBe(false);
  });
});

describe("isIPv4", () => {
  it("should validate IPv4 addresses", () => {
    expect(isIPv4("192.168.1.1")).toBe(true);
    expect(isIPv4("0.0.0.0")).toBe(true);
    expect(isIPv4("255.255.255.255")).toBe(true);
    expect(isIPv4("256.1.1.1")).toBe(false);
    expect(isIPv4("1.2.3")).toBe(false);
    expect(isIPv4("abc")).toBe(false);
  });
});

describe("isIPv6", () => {
  it("should validate IPv6 addresses", () => {
    expect(isIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(true);
    expect(isIPv6("::")).toBe(true);
    expect(isIPv6("not-ipv6")).toBe(false);
  });
});

describe("isHexColor", () => {
  it("should validate hex colors", () => {
    expect(isHexColor("#fff")).toBe(true);
    expect(isHexColor("#ffffff")).toBe(true);
    expect(isHexColor("fff")).toBe(true);
    expect(isHexColor("#ggg")).toBe(false);
    expect(isHexColor("#ffff")).toBe(false);
  });
});

describe("isCreditCard", () => {
  it("should validate credit card numbers (Luhn)", () => {
    expect(isCreditCard("4532015112830366")).toBe(true);
    expect(isCreditCard("4532 0151 1283 0366")).toBe(true);
    expect(isCreditCard("1234567890123456")).toBe(false);
    expect(isCreditCard("abc")).toBe(false);
  });
});

describe("isStrongPassword", () => {
  it("should validate strong passwords", () => {
    expect(isStrongPassword("Abcdef1!")).toBe(true);
    expect(isStrongPassword("StrongP@ss1")).toBe(true);
    expect(isStrongPassword("weak")).toBe(false);
    expect(isStrongPassword("12345678")).toBe(false);
    expect(isStrongPassword("ABCDabcd")).toBe(false);
    expect(isStrongPassword("ABCDabc1")).toBe(false);
  });
});

describe("isUUID", () => {
  it("should validate UUIDs", () => {
    expect(isUUID("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
    expect(isUUID("not-a-uuid")).toBe(false);
    expect(isUUID("550e8400-e29b-01d4-a716-446655440000")).toBe(false);
  });
});

describe("isSlug", () => {
  it("should validate slugs", () => {
    expect(isSlug("hello-world")).toBe(true);
    expect(isSlug("my-post-123")).toBe(true);
    expect(isSlug("Hello World")).toBe(false);
    expect(isSlug("hello--world")).toBe(false);
    expect(isSlug("-hello")).toBe(false);
  });
});

describe("isMACAddress", () => {
  it("should validate MAC addresses", () => {
    expect(isMACAddress("00:1A:2B:3C:4D:5E")).toBe(true);
    expect(isMACAddress("00-1A-2B-3C-4D-5E")).toBe(true);
    expect(isMACAddress("invalid")).toBe(false);
  });
});

describe("isLatLong", () => {
  it("should validate latitude,longitude pairs", () => {
    expect(isLatLong("40.7128,-74.0060")).toBe(true);
    expect(isLatLong("0,0")).toBe(true);
    expect(isLatLong("90,180")).toBe(true);
    expect(isLatLong("91,0")).toBe(false);
    expect(isLatLong("abc")).toBe(false);
  });
});

describe("isPostalCode", () => {
  it("should validate US postal codes by default", () => {
    expect(isPostalCode("12345")).toBe(true);
    expect(isPostalCode("12345-6789")).toBe(true);
    expect(isPostalCode("1234")).toBe(false);
  });

  it("should validate UK postal codes", () => {
    expect(isPostalCode("SW1A 1AA", "UK")).toBe(true);
    expect(isPostalCode("12345", "UK")).toBe(false);
  });

  it("should validate Indian postal codes", () => {
    expect(isPostalCode("500001", "IN")).toBe(true);
    expect(isPostalCode("12345", "IN")).toBe(false);
  });
});

describe("isPhoneNumber", () => {
  it("should validate phone numbers", () => {
    expect(isPhoneNumber("+14155552671")).toBe(true);
    expect(isPhoneNumber("+91 98765 43210")).toBe(true);
    expect(isPhoneNumber("123")).toBe(false);
    expect(isPhoneNumber("abc")).toBe(false);
  });
});

// =============================================================================
// STRING UTILITIES (existing)
// =============================================================================

describe("isAlphanumeric", () => {
  it("should return true for alphanumeric strings", () => {
    expect(isAlphanumeric("abc123")).toBe(true);
    expect(isAlphanumeric("ABC")).toBe(true);
    expect(isAlphanumeric("999")).toBe(true);
  });

  it("should return false for strings with special characters", () => {
    expect(isAlphanumeric("abc@123")).toBe(false);
    expect(isAlphanumeric("hello world")).toBe(false);
    expect(isAlphanumeric("")).toBe(false);
  });
});

describe("removeSpaces", () => {
  it("should remove all whitespace", () => {
    expect(removeSpaces("hello all welcome to npm")).toBe(
      "helloallwelcometonpm",
    );
  });

  it("should handle tabs and newlines", () => {
    expect(removeSpaces("hello\tworld\n")).toBe("helloworld");
  });

  it("should return empty string for empty input", () => {
    expect(removeSpaces("")).toBe("");
  });
});

describe("getRandomString", () => {
  it("should return string of specified length", () => {
    expect(getRandomString(5)).toHaveLength(5);
    expect(getRandomString(20)).toHaveLength(20);
  });

  it("should default to length 10", () => {
    expect(getRandomString()).toHaveLength(10);
  });

  it("should contain only alphanumeric characters", () => {
    const result = getRandomString(100);
    expect(result).toMatch(/^[a-zA-Z0-9]+$/);
  });
});

describe("getTimestamp", () => {
  it("should return a number", () => {
    expect(typeof getTimestamp()).toBe("number");
  });

  it("should return current time in milliseconds", () => {
    const before = Date.now();
    const result = getTimestamp();
    const after = Date.now();
    expect(result).toBeGreaterThanOrEqual(before);
    expect(result).toBeLessThanOrEqual(after);
  });
});

// =============================================================================
// STRING UTILITIES (new)
// =============================================================================

describe("capitalize", () => {
  it("should capitalize first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("Hello")).toBe("Hello");
  });

  it("should handle empty string", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("capitalizeWords", () => {
  it("should capitalize each word", () => {
    expect(capitalizeWords("hello world")).toBe("Hello World");
    expect(capitalizeWords("foo bar baz")).toBe("Foo Bar Baz");
  });
});

describe("camelCase", () => {
  it("should convert to camelCase", () => {
    expect(camelCase("hello world")).toBe("helloWorld");
    expect(camelCase("foo-bar-baz")).toBe("fooBarBaz");
    expect(camelCase("PascalCase")).toBe("pascalCase");
  });
});

describe("snakeCase", () => {
  it("should convert to snake_case", () => {
    expect(snakeCase("helloWorld")).toBe("hello_world");
    expect(snakeCase("Hello World")).toBe("hello_world");
    expect(snakeCase("foo-bar")).toBe("foo_bar");
  });
});

describe("kebabCase", () => {
  it("should convert to kebab-case", () => {
    expect(kebabCase("helloWorld")).toBe("hello-world");
    expect(kebabCase("Hello World")).toBe("hello-world");
    expect(kebabCase("foo_bar")).toBe("foo-bar");
  });
});

describe("pascalCase", () => {
  it("should convert to PascalCase", () => {
    expect(pascalCase("hello world")).toBe("HelloWorld");
    expect(pascalCase("foo-bar-baz")).toBe("FooBarBaz");
  });
});

describe("truncate", () => {
  it("should truncate long strings", () => {
    expect(truncate("Hello World", 8)).toBe("Hello...");
  });

  it("should not truncate short strings", () => {
    expect(truncate("Hi", 10)).toBe("Hi");
  });

  it("should support custom suffix", () => {
    expect(truncate("Hello World", 8, "~")).toBe("Hello W~");
  });
});

describe("slugify", () => {
  it("should create URL slugs", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
    expect(slugify("  Hello   World  ")).toBe("hello-world");
    expect(slugify("foo & bar")).toBe("foo-bar");
  });
});

describe("escapeHtml / unescapeHtml", () => {
  it("should escape HTML entities", () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;",
    );
    expect(escapeHtml("a & b")).toBe("a &amp; b");
  });

  it("should unescape HTML entities", () => {
    expect(unescapeHtml("&lt;div&gt;")).toBe("<div>");
    expect(unescapeHtml("a &amp; b")).toBe("a & b");
  });

  it("should be reversible", () => {
    const original = '<p class="test">Hello & "World"</p>';
    expect(unescapeHtml(escapeHtml(original))).toBe(original);
  });
});

describe("reverseString", () => {
  it("should reverse a string", () => {
    expect(reverseString("hello")).toBe("olleh");
    expect(reverseString("")).toBe("");
  });
});

describe("countOccurrences", () => {
  it("should count occurrences", () => {
    expect(countOccurrences("hello world hello", "hello")).toBe(2);
    expect(countOccurrences("aaa", "aa")).toBe(1);
    expect(countOccurrences("abc", "d")).toBe(0);
  });

  it("should return 0 for empty substring", () => {
    expect(countOccurrences("hello", "")).toBe(0);
  });
});

describe("isPalindrome", () => {
  it("should detect palindromes", () => {
    expect(isPalindrome("racecar")).toBe(true);
    expect(isPalindrome("A man a plan a canal Panama")).toBe(true);
    expect(isPalindrome("hello")).toBe(false);
  });
});

describe("mask", () => {
  it("should mask characters", () => {
    expect(mask("1234567890")).toBe("******7890");
    expect(mask("1234567890", 2)).toBe("********90");
    expect(mask("1234567890", 4, "#")).toBe("######7890");
  });

  it("should return short strings as-is", () => {
    expect(mask("abc", 4)).toBe("abc");
  });
});

describe("wordCount", () => {
  it("should count words", () => {
    expect(wordCount("hello world")).toBe(2);
    expect(wordCount("  multiple   spaces  ")).toBe(2);
    expect(wordCount("")).toBe(0);
  });
});

describe("stripHtml", () => {
  it("should remove HTML tags", () => {
    expect(stripHtml("<p>Hello <b>World</b></p>")).toBe("Hello World");
    expect(stripHtml("no tags")).toBe("no tags");
  });
});

describe("initials", () => {
  it("should return initials", () => {
    expect(initials("John Doe")).toBe("JD");
    expect(initials("Alice Bob Carol")).toBe("ABC");
    expect(initials("single")).toBe("S");
  });
});

// =============================================================================
// URL UTILITIES
// =============================================================================

describe("getUrlParams", () => {
  it("should parse query parameters from a URL", () => {
    const url = "https://example.com?name=sri&page=2&lang=en";
    const result = getUrlParams(url);
    expect(result).toEqual({ name: "sri", page: "2", lang: "en" });
  });

  it("should decode URI components", () => {
    const url = "https://example.com?greeting=hello%20world";
    expect(getUrlParams(url)).toEqual({ greeting: "hello world" });
  });

  it("should return empty object for URL without params", () => {
    const url = "https://example.com";
    expect(getUrlParams(url)).toEqual({});
  });

  it("should return empty object when called without arguments in Node", () => {
    expect(getUrlParams()).toEqual({});
  });

  it("should handle multiple params with special characters", () => {
    const url =
      "https://example.com?origin=IN&type=R&date=15/10/2018&ADT=1&class=Economy";
    const result = getUrlParams(url);
    expect(result).toEqual({
      origin: "IN",
      type: "R",
      date: "15/10/2018",
      ADT: "1",
      class: "Economy",
    });
  });
});

describe("parseQueryString", () => {
  it("should parse a query string", () => {
    expect(parseQueryString("?name=sri&page=2")).toEqual({
      name: "sri",
      page: "2",
    });
  });

  it("should handle string without leading ?", () => {
    expect(parseQueryString("a=1&b=2")).toEqual({ a: "1", b: "2" });
  });

  it("should return empty object for empty string", () => {
    expect(parseQueryString("")).toEqual({});
  });
});

describe("buildQueryString", () => {
  it("should build a query string", () => {
    expect(buildQueryString({ name: "sri", page: 2 })).toBe("name=sri&page=2");
  });

  it("should encode special characters", () => {
    const result = buildQueryString({ q: "hello world" });
    expect(result).toBe("q=hello%20world");
  });
});

// =============================================================================
// OBJECT UTILITIES
// =============================================================================

describe("isObject", () => {
  it("should return true for plain objects", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
  });

  it("should return false for arrays", () => {
    expect(isObject([])).toBe(false);
  });

  it("should return false for null", () => {
    expect(isObject(null)).toBe(false);
  });

  it("should return false for primitives", () => {
    expect(isObject(42)).toBe(false);
    expect(isObject("string")).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });
});

describe("getSizeOfObject", () => {
  it("should return the number of keys", () => {
    expect(getSizeOfObject({ a: 1, b: 2, c: 3 })).toBe(3);
  });

  it("should return 0 for empty object", () => {
    expect(getSizeOfObject({})).toBe(0);
  });

  it("should return null for non-objects", () => {
    expect(getSizeOfObject([])).toBeNull();
    expect(getSizeOfObject("string")).toBeNull();
    expect(getSizeOfObject(null)).toBeNull();
  });
});

describe("isObjectEmpty", () => {
  it("should return true for empty object", () => {
    expect(isObjectEmpty({})).toBe(true);
  });

  it("should return false for non-empty object", () => {
    expect(isObjectEmpty({ id: 1 })).toBe(false);
  });

  it("should return false for non-objects", () => {
    expect(isObjectEmpty([])).toBe(false);
  });
});

describe("deepClone", () => {
  it("should deep clone objects", () => {
    const original = { a: { b: { c: 1 } }, d: [1, 2, 3] };
    const cloned = deepClone(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.a).not.toBe(original.a);
  });
});

describe("pick", () => {
  it("should pick specified keys", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pick(obj, ["a", "c"])).toEqual({ a: 1, c: 3 });
  });

  it("should ignore non-existent keys", () => {
    const obj = { a: 1 } as Record<string, unknown>;
    expect(pick(obj, ["a", "z" as keyof typeof obj])).toEqual({ a: 1 });
  });
});

describe("omit", () => {
  it("should omit specified keys", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ["b"])).toEqual({ a: 1, c: 3 });
  });
});

describe("deepMerge", () => {
  it("should deep merge objects", () => {
    const target = { a: { b: 1, c: 2 }, d: 3 };
    const source = { a: { b: 10, e: 5 }, f: 6 };
    const result = deepMerge(target, source);
    expect(result).toEqual({ a: { b: 10, c: 2, e: 5 }, d: 3, f: 6 });
  });

  it("should not mutate the target", () => {
    const target = { a: 1 };
    deepMerge(target, { b: 2 });
    expect(target).toEqual({ a: 1 });
  });
});

describe("flattenObject", () => {
  it("should flatten nested objects", () => {
    expect(flattenObject({ a: { b: { c: 1 } }, d: 2 })).toEqual({
      "a.b.c": 1,
      d: 2,
    });
  });

  it("should support custom separator", () => {
    expect(flattenObject({ a: { b: 1 } }, "/")).toEqual({ "a/b": 1 });
  });
});

describe("unflattenObject", () => {
  it("should unflatten dot-separated objects", () => {
    expect(unflattenObject({ "a.b.c": 1, d: 2 })).toEqual({
      a: { b: { c: 1 } },
      d: 2,
    });
  });
});

describe("invertObject", () => {
  it("should swap keys and values", () => {
    expect(invertObject({ a: "1", b: "2" })).toEqual({ "1": "a", "2": "b" });
  });
});

describe("mapKeys", () => {
  it("should map keys", () => {
    const result = mapKeys({ a: 1, b: 2 }, (k) => k.toUpperCase());
    expect(result).toEqual({ A: 1, B: 2 });
  });
});

describe("mapValues", () => {
  it("should map values", () => {
    const result = mapValues({ a: 1, b: 2 }, (v) => v * 10);
    expect(result).toEqual({ a: 10, b: 20 });
  });
});

describe("hasPath", () => {
  it("should check nested paths", () => {
    const obj = { a: { b: { c: 1 } } };
    expect(hasPath(obj, "a.b.c")).toBe(true);
    expect(hasPath(obj, "a.b.d")).toBe(false);
    expect(hasPath(obj, "x.y")).toBe(false);
  });
});

describe("getPath", () => {
  it("should get nested values", () => {
    const obj = { a: { b: { c: 42 } } };
    expect(getPath(obj, "a.b.c")).toBe(42);
    expect(getPath(obj, "a.b.d", "default")).toBe("default");
  });
});

describe("setPath", () => {
  it("should set nested values returning new object", () => {
    const obj = { a: { b: 1 } };
    const result = setPath(obj, "a.c", 2);
    expect(result).toEqual({ a: { b: 1, c: 2 } });
    expect(obj).toEqual({ a: { b: 1 } }); // not mutated
  });

  it("should create intermediate objects", () => {
    const obj = {} as Record<string, unknown>;
    const result = setPath(obj, "a.b.c", 1);
    expect(result).toEqual({ a: { b: { c: 1 } } });
  });
});

// =============================================================================
// JSON UTILITIES
// =============================================================================

describe("isJson", () => {
  it("should return true for valid JSON strings", () => {
    expect(isJson('{"name":"sri"}')).toBe(true);
    expect(isJson("[1,2,3]")).toBe(true);
    expect(isJson('"hello"')).toBe(true);
    expect(isJson("42")).toBe(true);
  });

  it("should return false for invalid JSON", () => {
    expect(isJson("not json")).toBe(false);
    expect(isJson("{name: 'sri'}")).toBe(false);
    expect(isJson("")).toBe(false);
  });
});

// =============================================================================
// ARRAY UTILITIES
// =============================================================================

describe("unique", () => {
  it("should remove duplicates", () => {
    expect(unique([1, 2, 2, 3, 3])).toEqual([1, 2, 3]);
    expect(unique(["a", "b", "a"])).toEqual(["a", "b"]);
  });
});

describe("uniqueBy", () => {
  it("should remove duplicates by key", () => {
    const arr = [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
      { id: 1, name: "c" },
    ];
    expect(uniqueBy(arr, "id")).toEqual([
      { id: 1, name: "a" },
      { id: 2, name: "b" },
    ]);
  });

  it("should work with function", () => {
    const arr = [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
      { id: 1, name: "c" },
    ];
    expect(uniqueBy(arr, (item) => item.id)).toEqual([
      { id: 1, name: "a" },
      { id: 2, name: "b" },
    ]);
  });
});

describe("chunk", () => {
  it("should split into chunks", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("should handle chunk size larger than array", () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
  });
});

describe("flatten", () => {
  it("should flatten arrays", () => {
    expect(flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
  });

  it("should flatten to specified depth", () => {
    expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
  });
});

describe("shuffle", () => {
  it("should return a new array of same length", () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffle(arr);
    expect(shuffled).toHaveLength(5);
    expect(shuffled.sort()).toEqual([1, 2, 3, 4, 5]);
    expect(shuffled).not.toBe(arr);
  });
});

describe("groupBy", () => {
  it("should group by key", () => {
    const arr = [
      { type: "a", v: 1 },
      { type: "b", v: 2 },
      { type: "a", v: 3 },
    ];
    const result = groupBy(arr, "type");
    expect(result).toEqual({
      a: [
        { type: "a", v: 1 },
        { type: "a", v: 3 },
      ],
      b: [{ type: "b", v: 2 }],
    });
  });

  it("should group by function", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = groupBy(arr, (n) => (n % 2 === 0 ? "even" : "odd"));
    expect(result).toEqual({ odd: [1, 3, 5], even: [2, 4] });
  });
});

describe("sortBy", () => {
  it("should sort by key ascending", () => {
    const arr = [{ n: 3 }, { n: 1 }, { n: 2 }];
    expect(sortBy(arr, "n")).toEqual([{ n: 1 }, { n: 2 }, { n: 3 }]);
  });

  it("should sort descending", () => {
    const arr = [{ n: 1 }, { n: 3 }, { n: 2 }];
    expect(sortBy(arr, "n", "desc")).toEqual([{ n: 3 }, { n: 2 }, { n: 1 }]);
  });
});

describe("intersection", () => {
  it("should return common elements", () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });
});

describe("difference", () => {
  it("should return elements not in second array", () => {
    expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1]);
  });
});

describe("union", () => {
  it("should return combined unique elements", () => {
    expect(union([1, 2], [2, 3])).toEqual([1, 2, 3]);
  });
});

describe("compact", () => {
  it("should remove falsy values", () => {
    expect(compact([0, 1, false, 2, "", 3, null, undefined])).toEqual([
      1, 2, 3,
    ]);
  });
});

describe("sample", () => {
  it("should return an element from the array", () => {
    const arr = [1, 2, 3, 4, 5];
    const s = sample(arr);
    expect(arr).toContain(s);
  });

  it("should return undefined for empty array", () => {
    expect(sample([])).toBeUndefined();
  });
});

describe("range", () => {
  it("should generate a range", () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
  });

  it("should support step", () => {
    expect(range(0, 10, 3)).toEqual([0, 3, 6, 9]);
  });
});

describe("partition", () => {
  it("should split into truthy and falsy", () => {
    expect(partition([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([
      [2, 4],
      [1, 3],
    ]);
  });
});

describe("zip", () => {
  it("should zip arrays together", () => {
    expect(zip([1, 2], ["a", "b"])).toEqual([
      [1, "a"],
      [2, "b"],
    ]);
  });
});

describe("unzip", () => {
  it("should unzip arrays", () => {
    expect(unzip([[1, "a"], [2, "b"]])).toEqual([[1, 2], ["a", "b"]]);
  });

  it("should return empty for empty input", () => {
    expect(unzip([])).toEqual([]);
  });
});

describe("first / last", () => {
  it("should return first element by default", () => {
    expect(first([1, 2, 3])).toBe(1);
  });

  it("should return first N elements", () => {
    expect(first([1, 2, 3], 2)).toEqual([1, 2]);
  });

  it("should return last element by default", () => {
    expect(last([1, 2, 3])).toBe(3);
  });

  it("should return last N elements", () => {
    expect(last([1, 2, 3], 2)).toEqual([2, 3]);
  });
});

describe("countBy", () => {
  it("should count by function", () => {
    expect(countBy(["apple", "banana", "avocado"], (s) => s[0])).toEqual({
      a: 2,
      b: 1,
    });
  });
});

describe("minBy / maxBy", () => {
  it("should return element with min value", () => {
    const arr = [{ n: 3 }, { n: 1 }, { n: 2 }];
    expect(minBy(arr, "n")).toEqual({ n: 1 });
  });

  it("should return element with max value", () => {
    const arr = [{ n: 3 }, { n: 1 }, { n: 2 }];
    expect(maxBy(arr, "n")).toEqual({ n: 3 });
  });

  it("should return undefined for empty array", () => {
    expect(minBy([], "n" as never)).toBeUndefined();
    expect(maxBy([], "n" as never)).toBeUndefined();
  });

  it("should work with functions", () => {
    const arr = [{ n: 3 }, { n: 1 }, { n: 2 }];
    expect(minBy(arr, (item) => item.n)).toEqual({ n: 1 });
    expect(maxBy(arr, (item) => item.n)).toEqual({ n: 3 });
  });
});

// =============================================================================
// MISC UTILITIES
// =============================================================================

describe("debounce", () => {
  it("should debounce function calls", async () => {
    let count = 0;
    const fn = debounce(() => count++, 50);
    fn();
    fn();
    fn();
    expect(count).toBe(0);
    await sleep(100);
    expect(count).toBe(1);
  });
});

describe("throttle", () => {
  it("should throttle function calls", () => {
    let count = 0;
    const fn = throttle(() => count++, 100);
    fn();
    fn();
    fn();
    expect(count).toBe(1);
  });
});

describe("sleep", () => {
  it("should resolve after delay", async () => {
    const start = Date.now();
    await sleep(50);
    expect(Date.now() - start).toBeGreaterThanOrEqual(40);
  });
});

describe("retry", () => {
  it("should retry on failure", async () => {
    let attempts = 0;
    const fn = async () => {
      attempts++;
      if (attempts < 3) throw new Error("fail");
      return "success";
    };
    const result = await retry(fn, 3, 10);
    expect(result).toBe("success");
    expect(attempts).toBe(3);
  });

  it("should throw after all retries exhausted", async () => {
    const fn = async () => {
      throw new Error("always fails");
    };
    await expect(retry(fn, 2, 0)).rejects.toThrow("always fails");
  });
});

describe("memoize", () => {
  it("should cache results", () => {
    let callCount = 0;
    const expensive = memoize((n: number) => {
      callCount++;
      return n * 2;
    });
    expect(expensive(5)).toBe(10);
    expect(expensive(5)).toBe(10);
    expect(callCount).toBe(1);
    expect(expensive(3)).toBe(6);
    expect(callCount).toBe(2);
  });
});

describe("pipe", () => {
  it("should compose functions left to right", () => {
    const transform = pipe(
      (x: number) => x + 1,
      (x: number) => x * 2,
    );
    expect(transform(3)).toBe(8);
  });
});

describe("compose", () => {
  it("should compose functions right to left", () => {
    const transform = compose(
      (x: number) => x + 1,
      (x: number) => x * 2,
    );
    expect(transform(3)).toBe(7);
  });
});

describe("deepEqual", () => {
  it("should compare primitives", () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual(1, 2)).toBe(false);
    expect(deepEqual("a", "a")).toBe(true);
  });

  it("should compare objects deeply", () => {
    expect(deepEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });

  it("should compare arrays deeply", () => {
    expect(deepEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
    expect(deepEqual([1, 2], [1, 3])).toBe(false);
  });

  it("should handle null", () => {
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(null, {})).toBe(false);
  });
});

describe("generateId", () => {
  it("should generate ID of default length", () => {
    expect(generateId()).toHaveLength(21);
  });

  it("should generate ID of specified length", () => {
    expect(generateId(10)).toHaveLength(10);
  });

  it("should contain only URL-safe characters", () => {
    expect(generateId(100)).toMatch(/^[a-zA-Z0-9_-]+$/);
  });
});

describe("noop", () => {
  it("should return undefined", () => {
    expect(noop()).toBeUndefined();
  });
});

describe("times", () => {
  it("should call function N times", () => {
    expect(times(3, (i) => i * 2)).toEqual([0, 2, 4]);
  });

  it("should return empty array for 0", () => {
    expect(times(0, (i) => i)).toEqual([]);
  });
});

describe("isEmpty", () => {
  it("should check empty values", () => {
    expect(isEmpty("")).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  it("should return false for non-empty values", () => {
    expect(isEmpty("hello")).toBe(false);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(false)).toBe(false);
  });
});

// =============================================================================
// LEGACY ALIASES
// =============================================================================

describe("legacy aliases", () => {
  it("geturlParams should work like getUrlParams", () => {
    const url = "https://example.com?a=1";
    expect(geturlParams(url)).toEqual(getUrlParams(url));
  });

  it("getRandomNumber should work like getTimestamp", () => {
    expect(typeof getRandomNumber()).toBe("number");
  });
});
