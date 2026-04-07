/**
 * Hearty Helper - A comprehensive TypeScript utility library.
 * Your single source of utility functions for numbers, strings, arrays,
 * objects, validation, and more.
 *
 * @module hearty-helper
 */

// =============================================================================
// NUMBER FORMATTERS
// =============================================================================

/**
 * Formats a number as a currency string using Intl.NumberFormat.
 *
 * @param num - The number to format
 * @param currency - The ISO 4217 currency code (default: "USD")
 * @param locale - The locale string (default: "en-US")
 * @returns The formatted currency string
 *
 * @example
 * ```ts
 * formatCurrency(1234.56)            // "$1,234.56"
 * formatCurrency(1234.56, "EUR", "de-DE") // "1.234,56 €"
 * ```
 */
export function formatCurrency(
  num: number,
  currency: string = "USD",
  locale: string = "en-US",
): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    num,
  );
}

/**
 * Formats a number in compact notation (1K, 1.5M, 1B, etc.).
 *
 * @param num - The number to format
 * @returns The compact string representation
 *
 * @example
 * ```ts
 * formatCompact(1000)       // "1K"
 * formatCompact(1500000)    // "1.5M"
 * formatCompact(1000000000) // "1B"
 * ```
 */
export function formatCompact(num: number): string {
  const abs = Math.abs(num);
  const sign = num < 0 ? "-" : "";
  if (abs >= 1e9) {
    const val = abs / 1e9;
    return sign + (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1).replace(/\.0$/, "")) + "B";
  }
  if (abs >= 1e6) {
    const val = abs / 1e6;
    return sign + (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1).replace(/\.0$/, "")) + "M";
  }
  if (abs >= 1e3) {
    const val = abs / 1e3;
    return sign + (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1).replace(/\.0$/, "")) + "K";
  }
  return String(num);
}

/**
 * Clamps a number between a minimum and maximum value.
 *
 * @param num - The number to clamp
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns The clamped number
 *
 * @example
 * ```ts
 * clamp(15, 0, 10) // 10
 * clamp(-5, 0, 10) // 0
 * clamp(5, 0, 10)  // 5
 * ```
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/**
 * Rounds a number to N decimal places.
 *
 * @param num - The number to round
 * @param decimals - The number of decimal places
 * @returns The rounded number
 *
 * @example
 * ```ts
 * roundTo(3.14159, 2) // 3.14
 * ```
 */
export function roundTo(num: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

/**
 * Converts a number to its ordinal string representation.
 *
 * @param num - The number to convert
 * @returns The ordinal string
 *
 * @example
 * ```ts
 * toOrdinal(1)  // "1st"
 * toOrdinal(2)  // "2nd"
 * toOrdinal(3)  // "3rd"
 * toOrdinal(11) // "11th"
 * toOrdinal(23) // "23rd"
 * ```
 */
export function toOrdinal(num: number): string {
  const abs = Math.abs(num);
  const mod100 = abs % 100;
  const mod10 = abs % 10;
  if (mod100 >= 11 && mod100 <= 13) return num + "th";
  if (mod10 === 1) return num + "st";
  if (mod10 === 2) return num + "nd";
  if (mod10 === 3) return num + "rd";
  return num + "th";
}

/**
 * Checks if a number is even.
 */
export function isEven(num: number): boolean {
  return num % 2 === 0;
}

/**
 * Checks if a number is odd.
 */
export function isOdd(num: number): boolean {
  return num % 2 !== 0;
}

/**
 * Calculates the percentage of a value relative to a total.
 *
 * @param value - The part value
 * @param total - The total value
 * @returns The percentage
 *
 * @example
 * ```ts
 * percentage(25, 200) // 12.5
 * ```
 */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/**
 * Returns the sum of all numbers in an array.
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

/**
 * Returns the average (mean) of all numbers in an array.
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
}

/**
 * Pads a number with leading zeros to the specified length.
 *
 * @param num - The number to pad
 * @param length - The desired total length
 * @returns The zero-padded string
 *
 * @example
 * ```ts
 * padNumber(5, 3)   // "005"
 * padNumber(42, 5)  // "00042"
 * ```
 */
export function padNumber(num: number, length: number): string {
  return String(num).padStart(length, "0");
}

/**
 * Like `toFixed` but returns a number instead of a string.
 *
 * @param num - The number
 * @param decimals - The number of decimal places
 * @returns The fixed number
 */
export function toFixedNumber(num: number, decimals: number): number {
  return Number(num.toFixed(decimals));
}

/**
 * Checks if a number is within a range (inclusive).
 *
 * @param num - The number to check
 * @param start - Range start
 * @param end - Range end
 * @returns `true` if num is within [start, end]
 */
export function inRange(num: number, start: number, end: number): boolean {
  return num >= start && num <= end;
}

/**
 * Formats bytes into a human-readable string.
 *
 * @param bytes - The number of bytes
 * @param decimals - Decimal places (default: 2)
 * @returns The formatted string
 *
 * @example
 * ```ts
 * formatBytes(1024)     // "1 KB"
 * formatBytes(1048576)  // "1 MB"
 * ```
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return parseFloat(value.toFixed(decimals)) + " " + sizes[i];
}

/**
 * Returns a random integer between min and max (inclusive).
 *
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns A random integer
 */
export function randomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// =============================================================================
// REGEX VALIDATORS
// =============================================================================

/**
 * Validates an email address format.
 */
export function isEmail(str: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

/**
 * Validates a URL format.
 */
export function isURL(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates an IPv4 address.
 */
export function isIPv4(str: string): boolean {
  return /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(
    str,
  );
}

/**
 * Validates an IPv6 address.
 */
export function isIPv6(str: string): boolean {
  return /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::$|^(?:[0-9a-fA-F]{1,4}:){1,7}:$|^:(?::[0-9a-fA-F]{1,4}){1,7}$|^(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}$|^(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}$|^(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}$|^[0-9a-fA-F]{1,4}:(?::[0-9a-fA-F]{1,4}){1,6}$/.test(
    str,
  );
}

/**
 * Validates a hex color string (#fff or #ffffff, with or without #).
 */
export function isHexColor(str: string): boolean {
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(str);
}

/**
 * Validates a credit card number using the Luhn algorithm.
 */
export function isCreditCard(str: string): boolean {
  const sanitized = str.replace(/[\s-]/g, "");
  if (!/^\d{13,19}$/.test(sanitized)) return false;
  let sum = 0;
  let alternate = false;
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let n = parseInt(sanitized[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

/**
 * Validates that a password is strong: min 8 chars, uppercase, lowercase, number, special char.
 */
export function isStrongPassword(str: string): boolean {
  return (
    str.length >= 8 &&
    /[A-Z]/.test(str) &&
    /[a-z]/.test(str) &&
    /[0-9]/.test(str) &&
    /[^A-Za-z0-9]/.test(str)
  );
}

/**
 * Validates a UUID (v1-v5 format).
 */
export function isUUID(str: string): boolean {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
    str,
  );
}

/**
 * Validates a URL slug format (lowercase, numbers, hyphens).
 */
export function isSlug(str: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(str);
}

/**
 * Validates a MAC address.
 */
export function isMACAddress(str: string): boolean {
  return /^([0-9a-fA-F]{2}[:-]){5}[0-9a-fA-F]{2}$/.test(str);
}

/**
 * Validates a latitude,longitude pair string.
 *
 * @example
 * ```ts
 * isLatLong("40.7128,-74.0060") // true
 * ```
 */
export function isLatLong(str: string): boolean {
  return /^-?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*-?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(
    str,
  );
}

/**
 * Validates a postal code. Default locale is US (5 digits or 5+4 format).
 *
 * @param str - The postal code string
 * @param locale - The locale (default: "US")
 */
export function isPostalCode(str: string, locale: string = "US"): boolean {
  const patterns: Record<string, RegExp> = {
    US: /^\d{5}(-\d{4})?$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,
    CA: /^[A-Z]\d[A-Z]\s*\d[A-Z]\d$/i,
    DE: /^\d{5}$/,
    FR: /^\d{5}$/,
    IN: /^\d{6}$/,
    JP: /^\d{3}-?\d{4}$/,
    AU: /^\d{4}$/,
  };
  const re = patterns[locale.toUpperCase()];
  if (!re) return patterns.US.test(str);
  return re.test(str);
}

/**
 * Validates a basic international phone number.
 */
export function isPhoneNumber(str: string): boolean {
  return /^\+?[1-9]\d{6,14}$/.test(str.replace(/[\s()-]/g, ""));
}

// =============================================================================
// STRING UTILITIES
// =============================================================================

/**
 * Checks if a string contains only alphanumeric characters.
 *
 * @param str - The string to check
 * @returns `true` if the string is alphanumeric
 *
 * @example
 * ```ts
 * isAlphanumeric('abc123')   // true
 * isAlphanumeric('abc@123')  // false
 * ```
 */
export function isAlphanumeric(str: string): boolean {
  return /^[a-z0-9]+$/i.test(str);
}

/**
 * Removes all whitespace from a string.
 *
 * @param str - The input string
 * @returns The string with all whitespace removed
 *
 * @example
 * ```ts
 * removeSpaces('hello world')  // 'helloworld'
 * ```
 */
export function removeSpaces(str: string): string {
  return str.replace(/\s/g, "");
}

/**
 * Generates a random alphanumeric string of the specified length.
 *
 * @param length - The desired string length (default: 10)
 * @returns A random alphanumeric string
 *
 * @example
 * ```ts
 * getRandomString(8)  // e.g. 'aB3xK9mQ'
 * ```
 */
export function getRandomString(length: number = 10): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Returns the current timestamp in milliseconds.
 *
 * @returns The current Unix timestamp in milliseconds
 */
export function getTimestamp(): number {
  return Date.now();
}

/**
 * Capitalizes the first letter of a string.
 *
 * @example
 * ```ts
 * capitalize("hello") // "Hello"
 * ```
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalizes the first letter of each word in a string.
 *
 * @example
 * ```ts
 * capitalizeWords("hello world") // "Hello World"
 * ```
 */
export function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Converts a string to camelCase.
 *
 * @example
 * ```ts
 * camelCase("hello world")  // "helloWorld"
 * camelCase("foo-bar-baz")  // "fooBarBaz"
 * ```
 */
export function camelCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c: string) => c.toUpperCase())
    .replace(/^[A-Z]/, (c) => c.toLowerCase());
}

/**
 * Converts a string to snake_case.
 *
 * @example
 * ```ts
 * snakeCase("helloWorld")  // "hello_world"
 * snakeCase("Hello World") // "hello_world"
 * ```
 */
export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s\-]+/g, "_")
    .toLowerCase();
}

/**
 * Converts a string to kebab-case.
 *
 * @example
 * ```ts
 * kebabCase("helloWorld")  // "hello-world"
 * kebabCase("Hello World") // "hello-world"
 * ```
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

/**
 * Converts a string to PascalCase.
 *
 * @example
 * ```ts
 * pascalCase("hello world") // "HelloWorld"
 * ```
 */
export function pascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c: string) => c.toUpperCase())
    .replace(/^[a-z]/, (c) => c.toUpperCase());
}

/**
 * Truncates a string to the specified length, appending a suffix.
 *
 * @param str - The string to truncate
 * @param length - Maximum length (including suffix)
 * @param suffix - The suffix to append (default: "...")
 *
 * @example
 * ```ts
 * truncate("Hello World", 8) // "Hello..."
 * ```
 */
export function truncate(
  str: string,
  length: number,
  suffix: string = "...",
): string {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
}

/**
 * Converts a string to a URL-friendly slug.
 *
 * @example
 * ```ts
 * slugify("Hello World!") // "hello-world"
 * ```
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Escapes HTML special characters in a string.
 */
export function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return str.replace(/[&<>"']/g, (c) => map[c]);
}

/**
 * Unescapes HTML entities in a string.
 */
export function unescapeHtml(str: string): string {
  const map: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
  };
  return str.replace(/&(?:amp|lt|gt|quot|#39);/g, (c) => map[c]);
}

/**
 * Reverses a string.
 */
export function reverseString(str: string): string {
  return [...str].reverse().join("");
}

/**
 * Counts the number of occurrences of a substring in a string.
 */
export function countOccurrences(str: string, substr: string): number {
  if (!substr) return 0;
  let count = 0;
  let pos = 0;
  while ((pos = str.indexOf(substr, pos)) !== -1) {
    count++;
    pos += substr.length;
  }
  return count;
}

/**
 * Checks if a string is a palindrome (case-insensitive, ignores non-alphanumeric).
 */
export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === [...cleaned].reverse().join("");
}

/**
 * Masks a string, leaving only the last N characters visible.
 *
 * @param str - The string to mask
 * @param visibleCount - Number of visible characters at the end (default: 4)
 * @param maskChar - The mask character (default: "*")
 *
 * @example
 * ```ts
 * mask("1234567890")       // "******7890"
 * mask("1234567890", 2)    // "********90"
 * ```
 */
export function mask(
  str: string,
  visibleCount: number = 4,
  maskChar: string = "*",
): string {
  if (str.length <= visibleCount) return str;
  return maskChar.repeat(str.length - visibleCount) + str.slice(-visibleCount);
}

/**
 * Counts the number of words in a string.
 */
export function wordCount(str: string): number {
  const trimmed = str.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

/**
 * Strips HTML tags from a string.
 */
export function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "");
}

/**
 * Returns the initials from a name string.
 *
 * @example
 * ```ts
 * initials("John Doe")       // "JD"
 * initials("Alice Bob Carol") // "ABC"
 * ```
 */
export function initials(str: string): string {
  return str
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

// =============================================================================
// URL UTILITIES
// =============================================================================

/**
 * Parses URL query parameters into an object.
 * If no URL is provided in a browser context, uses the current window location.
 *
 * @param url - The URL string to parse
 * @returns An object containing key-value pairs of the URL parameters
 *
 * @example
 * ```ts
 * const params = getUrlParams('https://example.com?name=sri&page=2')
 * // { name: 'sri', page: '2' }
 * ```
 */
export function getUrlParams(url?: string): Record<string, string> {
  const params: Record<string, string> = {};

  let queryString: string;
  if (url) {
    const parts = url.split("?");
    queryString = parts[1] ?? "";
  } else if (typeof globalThis.location !== "undefined") {
    queryString = globalThis.location.search.substring(1);
  } else {
    return params;
  }

  if (!queryString) return params;

  for (const pair of queryString.split("&")) {
    const [key, value] = pair.split("=");
    if (key && value !== undefined) {
      params[key] = decodeURIComponent(value);
    }
  }

  return params;
}

/**
 * Parses a query string into an object.
 *
 * @param str - The query string (with or without leading "?")
 * @returns The parsed key-value pairs
 *
 * @example
 * ```ts
 * parseQueryString("?name=sri&page=2") // { name: "sri", page: "2" }
 * ```
 */
export function parseQueryString(str: string): Record<string, string> {
  const result: Record<string, string> = {};
  const qs = str.startsWith("?") ? str.slice(1) : str;
  if (!qs) return result;
  for (const pair of qs.split("&")) {
    const [key, ...rest] = pair.split("=");
    if (key) {
      result[decodeURIComponent(key)] = decodeURIComponent(rest.join("="));
    }
  }
  return result;
}

/**
 * Builds a query string from an object.
 *
 * @param obj - The key-value pairs
 * @returns The query string (without leading "?")
 *
 * @example
 * ```ts
 * buildQueryString({ name: "sri", page: "2" }) // "name=sri&page=2"
 * ```
 */
export function buildQueryString(obj: Record<string, string | number | boolean>): string {
  return Object.entries(obj)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
}

// =============================================================================
// OBJECT UTILITIES
// =============================================================================

/**
 * Checks if a value is a plain object (not an array, null, or other type).
 *
 * @param data - The value to check
 * @returns `true` if the value is a plain object
 *
 * @example
 * ```ts
 * isObject({})       // true
 * isObject([])       // false
 * isObject(null)     // false
 * ```
 */
export function isObject(data: unknown): data is Record<string, unknown> {
  return Object.prototype.toString.call(data) === "[object Object]";
}

/**
 * Returns the number of own enumerable properties in an object.
 *
 * @param data - The object to measure
 * @returns The number of keys, or `null` if the input is not an object
 */
export function getSizeOfObject(data: unknown): number | null {
  if (!isObject(data)) return null;
  return Object.keys(data).length;
}

/**
 * Checks if an object is empty (has no own enumerable properties).
 *
 * @param data - The object to check
 * @returns `true` if the object is empty, `false` otherwise (including non-objects)
 */
export function isObjectEmpty(data: unknown): boolean {
  return getSizeOfObject(data) === 0;
}

/**
 * Deep clones an object using structuredClone.
 */
export function deepClone<T>(obj: T): T {
  return structuredClone(obj);
}

/**
 * Picks specified keys from an object.
 *
 * @example
 * ```ts
 * pick({ a: 1, b: 2, c: 3 }, ["a", "c"]) // { a: 1, c: 3 }
 * ```
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omits specified keys from an object.
 *
 * @example
 * ```ts
 * omit({ a: 1, b: 2, c: 3 }, ["b"]) // { a: 1, c: 3 }
 * ```
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}

/**
 * Deep merges objects recursively.
 *
 * @param target - The target object
 * @param sources - Source objects to merge into target
 * @returns The merged object
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  ...sources: Record<string, unknown>[]
): T {
  const result = { ...target } as Record<string, unknown>;
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      if (
        isObject(source[key]) &&
        isObject(result[key])
      ) {
        result[key] = deepMerge(
          result[key] as Record<string, unknown>,
          source[key] as Record<string, unknown>,
        );
      } else {
        result[key] = source[key];
      }
    }
  }
  return result as T;
}

/**
 * Flattens a nested object into a single-level object with dot-separated keys.
 *
 * @param obj - The object to flatten
 * @param separator - The separator (default: ".")
 *
 * @example
 * ```ts
 * flattenObject({ a: { b: 1 } }) // { "a.b": 1 }
 * ```
 */
export function flattenObject(
  obj: Record<string, unknown>,
  separator: string = ".",
  prefix: string = "",
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    const newKey = prefix ? prefix + separator + key : key;
    if (isObject(obj[key])) {
      Object.assign(
        result,
        flattenObject(obj[key] as Record<string, unknown>, separator, newKey),
      );
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

/**
 * Unflattens a dot-separated object back into a nested object.
 *
 * @param obj - The flat object
 * @param separator - The separator (default: ".")
 *
 * @example
 * ```ts
 * unflattenObject({ "a.b": 1 }) // { a: { b: 1 } }
 * ```
 */
export function unflattenObject(
  obj: Record<string, unknown>,
  separator: string = ".",
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    const parts = key.split(separator);
    let current: Record<string, unknown> = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!isObject(current[parts[i]])) {
        current[parts[i]] = {};
      }
      current = current[parts[i]] as Record<string, unknown>;
    }
    current[parts[parts.length - 1]] = obj[key];
  }
  return result;
}

/**
 * Inverts an object's keys and values.
 *
 * @example
 * ```ts
 * invertObject({ a: "1", b: "2" }) // { "1": "a", "2": "b" }
 * ```
 */
export function invertObject(
  obj: Record<string, string | number>,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[String(value)] = key;
  }
  return result;
}

/**
 * Maps an object's keys using a transform function.
 */
export function mapKeys<T>(
  obj: Record<string, T>,
  fn: (key: string, value: T) => string,
): Record<string, T> {
  const result: Record<string, T> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[fn(key, value)] = value;
  }
  return result;
}

/**
 * Maps an object's values using a transform function.
 */
export function mapValues<T, U>(
  obj: Record<string, T>,
  fn: (value: T, key: string) => U,
): Record<string, U> {
  const result: Record<string, U> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = fn(value, key);
  }
  return result;
}

/**
 * Checks if a nested path exists in an object.
 *
 * @example
 * ```ts
 * hasPath({ a: { b: { c: 1 } } }, "a.b.c") // true
 * hasPath({ a: { b: 1 } }, "a.b.c")         // false
 * ```
 */
export function hasPath(obj: unknown, path: string): boolean {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== "object") {
      return false;
    }
    if (!(part in (current as Record<string, unknown>))) {
      return false;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return true;
}

/**
 * Safely gets a nested value from an object by path.
 *
 * @param obj - The object
 * @param path - Dot-separated path
 * @param defaultValue - Default value if path doesn't exist
 *
 * @example
 * ```ts
 * getPath({ a: { b: { c: 42 } } }, "a.b.c") // 42
 * getPath({ a: 1 }, "a.b.c", "default")      // "default"
 * ```
 */
export function getPath<T = unknown>(
  obj: unknown,
  path: string,
  defaultValue?: T,
): T {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== "object") {
      return defaultValue as T;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return (current === undefined ? defaultValue : current) as T;
}

/**
 * Safely sets a nested value in an object by path. Returns a new object.
 *
 * @param obj - The source object
 * @param path - Dot-separated path
 * @param value - The value to set
 * @returns A new object with the value set
 */
export function setPath<T extends Record<string, unknown>>(
  obj: T,
  path: string,
  value: unknown,
): T {
  const parts = path.split(".");
  const result = { ...obj } as Record<string, unknown>;
  let current = result;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    current[part] = isObject(current[part])
      ? { ...(current[part] as Record<string, unknown>) }
      : {};
    current = current[part] as Record<string, unknown>;
  }
  current[parts[parts.length - 1]] = value;
  return result as T;
}

// =============================================================================
// JSON UTILITIES
// =============================================================================

/**
 * Checks if a string is valid JSON.
 *
 * @param str - The string to validate
 * @returns `true` if the string can be parsed as JSON
 */
export function isJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

// =============================================================================
// ARRAY UTILITIES
// =============================================================================

/**
 * Removes duplicate values from an array.
 *
 * @example
 * ```ts
 * unique([1, 2, 2, 3, 3]) // [1, 2, 3]
 * ```
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Removes duplicates by a key or function.
 *
 * @param arr - The array
 * @param key - A property name or function that returns the value to dedupe by
 *
 * @example
 * ```ts
 * uniqueBy([{ id: 1 }, { id: 2 }, { id: 1 }], "id")
 * // [{ id: 1 }, { id: 2 }]
 * ```
 */
export function uniqueBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => unknown),
): T[] {
  const seen = new Set();
  return arr.filter((item) => {
    const val = typeof key === "function" ? key(item) : item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
}

/**
 * Splits an array into chunks of the specified size.
 *
 * @example
 * ```ts
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * ```
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Flattens nested arrays to the specified depth.
 *
 * @param arr - The array to flatten
 * @param depth - Flatten depth (default: 1)
 */
export function flatten<T>(arr: unknown[], depth: number = 1): T[] {
  return arr.flat(depth) as T[];
}

/**
 * Shuffles an array using the Fisher-Yates algorithm. Returns a new array.
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Groups array elements by a key or function.
 *
 * @example
 * ```ts
 * groupBy([{ type: "a", v: 1 }, { type: "b", v: 2 }, { type: "a", v: 3 }], "type")
 * // { a: [{ type: "a", v: 1 }, { type: "a", v: 3 }], b: [{ type: "b", v: 2 }] }
 * ```
 */
export function groupBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => string),
): Record<string, T[]> {
  return arr.reduce(
    (groups, item) => {
      const k = String(typeof key === "function" ? key(item) : item[key]);
      (groups[k] = groups[k] || []).push(item);
      return groups;
    },
    {} as Record<string, T[]>,
  );
}

/**
 * Sorts an array by a key.
 *
 * @param arr - The array to sort
 * @param key - The key to sort by
 * @param order - Sort order: "asc" or "desc" (default: "asc")
 */
export function sortBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => number | string),
  order: "asc" | "desc" = "asc",
): T[] {
  const sorted = [...arr].sort((a, b) => {
    const va = typeof key === "function" ? key(a) : a[key];
    const vb = typeof key === "function" ? key(b) : b[key];
    if (va < vb) return -1;
    if (va > vb) return 1;
    return 0;
  });
  return order === "desc" ? sorted.reverse() : sorted;
}

/**
 * Returns the intersection of two arrays (common elements).
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set = new Set(arr2);
  return arr1.filter((item) => set.has(item));
}

/**
 * Returns elements in arr1 that are not in arr2.
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set = new Set(arr2);
  return arr1.filter((item) => !set.has(item));
}

/**
 * Returns the union of two arrays (combined unique elements).
 */
export function union<T>(arr1: T[], arr2: T[]): T[] {
  return [...new Set([...arr1, ...arr2])];
}

/**
 * Removes falsy values from an array.
 *
 * @example
 * ```ts
 * compact([0, 1, false, 2, "", 3, null, undefined]) // [1, 2, 3]
 * ```
 */
export function compact<T>(arr: (T | null | undefined | false | 0 | "")[]): T[] {
  return arr.filter(Boolean) as T[];
}

/**
 * Returns a random element from an array.
 */
export function sample<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generates an array of numbers in a range.
 *
 * @param start - Start value (inclusive)
 * @param end - End value (exclusive)
 * @param step - Step size (default: 1)
 *
 * @example
 * ```ts
 * range(0, 5)    // [0, 1, 2, 3, 4]
 * range(0, 10, 3) // [0, 3, 6, 9]
 * ```
 */
export function range(start: number, end: number, step: number = 1): number[] {
  const result: number[] = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * Partitions an array into two groups based on a predicate.
 *
 * @returns A tuple of [truthy, falsy] arrays
 *
 * @example
 * ```ts
 * partition([1, 2, 3, 4], n => n % 2 === 0) // [[2, 4], [1, 3]]
 * ```
 */
export function partition<T>(
  arr: T[],
  predicate: (item: T) => boolean,
): [T[], T[]] {
  const truthy: T[] = [];
  const falsy: T[] = [];
  for (const item of arr) {
    (predicate(item) ? truthy : falsy).push(item);
  }
  return [truthy, falsy];
}

/**
 * Zips multiple arrays together.
 *
 * @example
 * ```ts
 * zip([1, 2], ["a", "b"]) // [[1, "a"], [2, "b"]]
 * ```
 */
export function zip<T>(...arrays: T[][]): T[][] {
  const maxLen = Math.max(...arrays.map((a) => a.length));
  const result: T[][] = [];
  for (let i = 0; i < maxLen; i++) {
    result.push(arrays.map((a) => a[i]));
  }
  return result;
}

/**
 * Unzips an array of tuples into separate arrays.
 *
 * @example
 * ```ts
 * unzip([[1, "a"], [2, "b"]]) // [[1, 2], ["a", "b"]]
 * ```
 */
export function unzip<T>(arr: T[][]): T[][] {
  if (arr.length === 0) return [];
  const maxLen = Math.max(...arr.map((a) => a.length));
  const result: T[][] = [];
  for (let i = 0; i < maxLen; i++) {
    result.push(arr.map((a) => a[i]));
  }
  return result;
}

/**
 * Returns the first N elements of an array.
 *
 * @param arr - The array
 * @param n - Number of elements (default: 1)
 */
export function first<T>(arr: T[], n: number = 1): T | T[] {
  if (n === 1) return arr[0];
  return arr.slice(0, n);
}

/**
 * Returns the last N elements of an array.
 *
 * @param arr - The array
 * @param n - Number of elements (default: 1)
 */
export function last<T>(arr: T[], n: number = 1): T | T[] {
  if (n === 1) return arr[arr.length - 1];
  return arr.slice(-n);
}

/**
 * Counts occurrences by a key or function.
 *
 * @example
 * ```ts
 * countBy(["apple", "banana", "avocado"], s => s[0])
 * // { a: 2, b: 1 }
 * ```
 */
export function countBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => string),
): Record<string, number> {
  return arr.reduce(
    (counts, item) => {
      const k = String(typeof key === "function" ? key(item) : item[key]);
      counts[k] = (counts[k] || 0) + 1;
      return counts;
    },
    {} as Record<string, number>,
  );
}

/**
 * Returns the element with the minimum value for a given key.
 */
export function minBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => number),
): T | undefined {
  if (arr.length === 0) return undefined;
  return arr.reduce((min, item) => {
    const va = typeof key === "function" ? key(min) : (min[key] as number);
    const vb = typeof key === "function" ? key(item) : (item[key] as number);
    return vb < va ? item : min;
  });
}

/**
 * Returns the element with the maximum value for a given key.
 */
export function maxBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => number),
): T | undefined {
  if (arr.length === 0) return undefined;
  return arr.reduce((max, item) => {
    const va = typeof key === "function" ? key(max) : (max[key] as number);
    const vb = typeof key === "function" ? key(item) : (item[key] as number);
    return vb > va ? item : max;
  });
}

// =============================================================================
// SESSION UTILITIES (Browser only)
// =============================================================================

/**
 * Gets or creates a session ID stored in sessionStorage.
 * If no value exists for the given key, generates a random 30-character string.
 *
 * **Browser only** - returns empty string in non-browser environments.
 *
 * @param sessionKey - The sessionStorage key
 * @returns The session ID string
 */
export function getSessionId(sessionKey: string): string {
  if (typeof globalThis.sessionStorage === "undefined") return "";

  let tabSession = sessionStorage.getItem(sessionKey);
  if (!tabSession) {
    tabSession = getRandomString(30);
    sessionStorage.setItem(sessionKey, tabSession);
  }
  return tabSession;
}

// =============================================================================
// COOKIE UTILITIES (Browser only)
// =============================================================================

export interface CookieOptions {
  cname: string;
  cvalue: string | number;
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

/**
 * Sets a cookie with the given options.
 *
 * **Browser only** - no-op in non-browser environments.
 *
 * @param options - Cookie configuration
 */
export function setCookie(options: CookieOptions): void {
  if (typeof globalThis.document === "undefined") return;

  const { cname, cvalue, path = "/", domain, secure, sameSite } = options;

  let expiresStr = "";
  if (typeof options.expires === "number") {
    const date = new Date();
    date.setDate(date.getDate() + options.expires);
    expiresStr = `; expires=${date.toUTCString()}`;
  } else if (options.expires instanceof Date) {
    expiresStr = `; expires=${options.expires.toUTCString()}`;
  }

  const parts = [
    `${cname}=${cvalue}`,
    expiresStr,
    `; path=${path}`,
    domain ? `; domain=${domain}` : "",
    secure ? "; secure" : "",
    sameSite ? `; SameSite=${sameSite}` : "",
  ];

  document.cookie = parts.join("");
}

/**
 * Gets a cookie value by name.
 *
 * **Browser only** - returns `undefined` in non-browser environments.
 *
 * @param name - The cookie name
 * @returns The cookie value, or `undefined` if not found
 */
export function getCookie(name: string): string | undefined {
  if (typeof globalThis.document === "undefined") return undefined;

  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [key, ...rest] = cookie.split("=");
    if (key?.trim() === name) {
      return decodeURIComponent(rest.join("="));
    }
  }
  return undefined;
}

// =============================================================================
// HTTP UTILITIES
// =============================================================================

export interface HttpRequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
}

/**
 * Sends an HTTP request using the Fetch API.
 *
 * @param url - The request URL
 * @param options - Request options
 * @returns The parsed JSON response
 */
export async function sendHttpRequest<T = unknown>(
  url: string,
  options: HttpRequestOptions = {},
): Promise<T> {
  const { method = "GET", headers = {}, body, signal } = options;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

// =============================================================================
// MISC UTILITIES
// =============================================================================

/**
 * Creates a debounced version of a function.
 *
 * @param fn - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns The debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Creates a throttled version of a function.
 *
 * @param fn - The function to throttle
 * @param delay - Minimum time between calls in milliseconds
 * @returns The throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

/**
 * Returns a promise that resolves after the specified delay.
 *
 * @param ms - Delay in milliseconds
 *
 * @example
 * ```ts
 * await sleep(1000) // wait 1 second
 * ```
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retries an async function up to N times with optional delay between retries.
 *
 * @param fn - The async function to retry
 * @param retries - Number of retry attempts (default: 3)
 * @param delay - Delay between retries in ms (default: 0)
 * @returns The result of the function
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 0,
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < retries && delay > 0) {
        await sleep(delay);
      }
    }
  }
  throw lastError;
}

/**
 * Creates a memoized version of a function. Uses the first argument as the cache key.
 *
 * @param fn - The function to memoize
 * @returns The memoized function
 */
export function memoize<T extends (...args: unknown[]) => unknown>(
  fn: T,
): T {
  const cache = new Map<string, ReturnType<T>>();
  return function (this: unknown, ...args: Parameters<T>) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn.apply(this, args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  } as T;
}

/**
 * Composes functions from left to right (pipe).
 *
 * @param fns - Functions to compose
 * @returns A function that applies all functions in sequence
 *
 * @example
 * ```ts
 * const transform = pipe(
 *   (x: number) => x + 1,
 *   (x: number) => x * 2,
 * )
 * transform(3) // 8
 * ```
 */
export function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduce((result, fn) => fn(result), arg);
}

/**
 * Composes functions from right to left.
 *
 * @param fns - Functions to compose
 * @returns A function that applies all functions in reverse sequence
 */
export function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduceRight((result, fn) => fn(result), arg);
}

/**
 * Deep equality check for two values.
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => deepEqual(val, b[i]));
  }

  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a as Record<string, unknown>);
    const keysB = Object.keys(b as Record<string, unknown>);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((key) =>
      deepEqual(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key],
      ),
    );
  }

  return false;
}

/**
 * Generates a URL-safe unique ID.
 *
 * @param length - The desired length (default: 21)
 * @returns A URL-safe random string
 */
export function generateId(length: number = 21): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * A no-op function that does nothing.
 */
export function noop(): void {
  // intentionally empty
}

/**
 * Calls a function N times and returns the results.
 *
 * @param n - Number of times to call
 * @param fn - The function to call (receives index)
 * @returns An array of results
 *
 * @example
 * ```ts
 * times(3, i => i * 2) // [0, 2, 4]
 * ```
 */
export function times<T>(n: number, fn: (index: number) => T): T[] {
  return Array.from({ length: n }, (_, i) => fn(i));
}

/**
 * Checks if a value is empty. Works for strings, arrays, objects, null, and undefined.
 *
 * @example
 * ```ts
 * isEmpty("")        // true
 * isEmpty([])        // true
 * isEmpty({})        // true
 * isEmpty(null)      // true
 * isEmpty(undefined) // true
 * isEmpty("hello")   // false
 * isEmpty([1])       // false
 * ```
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (isObject(value)) return Object.keys(value).length === 0;
  return false;
}

// =============================================================================
// LEGACY ALIASES (backward compatibility)
// =============================================================================

/** @deprecated Use `getUrlParams` instead */
export const geturlParams = getUrlParams;

/** @deprecated Use `getTimestamp` instead */
export const getRandomNumber = getTimestamp;
