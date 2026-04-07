/**
 * Hearty Helper - A lightweight utility library providing helper functions
 * for URL parsing, object utilities, string operations, cookies, and HTTP requests.
 *
 * @module hearty-helper
 */

// ─── URL Utilities ───────────────────────────────────────────────────────────

/**
 * Parses URL query parameters into an object.
 * If no URL is provided in a browser context, uses the current window location.
 *
 * @param url - The URL string to parse
 * @returns An object containing key-value pairs of the URL parameters
 *
 * @example
 * ```ts
 * import { getUrlParams } from 'hearty-helper'
 *
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

// ─── Object Utilities ────────────────────────────────────────────────────────

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
 *
 * @example
 * ```ts
 * getSizeOfObject({ a: 1, b: 2 }) // 2
 * getSizeOfObject([])              // null
 * ```
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
 *
 * @example
 * ```ts
 * isObjectEmpty({})         // true
 * isObjectEmpty({ a: 1 })   // false
 * ```
 */
export function isObjectEmpty(data: unknown): boolean {
  return getSizeOfObject(data) === 0;
}

// ─── JSON Utilities ──────────────────────────────────────────────────────────

/**
 * Checks if a string is valid JSON.
 *
 * @param str - The string to validate
 * @returns `true` if the string can be parsed as JSON
 *
 * @example
 * ```ts
 * isJson('{"name":"sri"}')  // true
 * isJson('not json')        // false
 * ```
 */
export function isJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

// ─── String Utilities ────────────────────────────────────────────────────────

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
 *
 * @example
 * ```ts
 * getTimestamp()  // e.g. 1712500000000
 * ```
 */
export function getTimestamp(): number {
  return Date.now();
}

// ─── Session Utilities (Browser only) ────────────────────────────────────────

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

// ─── Cookie Utilities (Browser only) ─────────────────────────────────────────

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
 *
 * @example
 * ```ts
 * setCookie({ cname: 'theme', cvalue: 'dark', expires: 7 })
 * ```
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

// ─── HTTP Utilities ──────────────────────────────────────────────────────────

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
 *
 * @example
 * ```ts
 * const data = await sendHttpRequest('https://api.example.com/users', {
 *   method: 'POST',
 *   body: { name: 'Srinivas' },
 * })
 * ```
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

// ─── Legacy aliases (backward compatibility) ─────────────────────────────────

/** @deprecated Use `getUrlParams` instead */
export const geturlParams = getUrlParams;

/** @deprecated Use `getTimestamp` instead */
export const getRandomNumber = getTimestamp;
