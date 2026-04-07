import { describe, it, expect } from "vitest";
import {
  getUrlParams,
  isObject,
  getSizeOfObject,
  isObjectEmpty,
  isJson,
  isAlphanumeric,
  removeSpaces,
  getRandomString,
  getTimestamp,
  sendHttpRequest,
  geturlParams,
  getRandomNumber,
} from "../src/index";

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

describe("legacy aliases", () => {
  it("geturlParams should work like getUrlParams", () => {
    const url = "https://example.com?a=1";
    expect(geturlParams(url)).toEqual(getUrlParams(url));
  });

  it("getRandomNumber should work like getTimestamp", () => {
    expect(typeof getRandomNumber()).toBe("number");
  });
});
