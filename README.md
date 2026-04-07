# hearty-helper

[![NPM version](https://img.shields.io/npm/v/hearty-helper.svg)](https://www.npmjs.com/package/hearty-helper)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A comprehensive TypeScript utility library -- numbers, strings, arrays, objects, validators, and more. Your single source of utility functions.

> **Note:** Date/time utilities live in the separate [`hearty-datetime-helper`](https://www.npmjs.com/package/hearty-datetime-helper) package.

## Installation

```bash
npm install hearty-helper
```

## Quick Start

```ts
// ESM
import { formatCurrency, chunk, deepMerge, isEmail } from 'hearty-helper'

// CommonJS
const { formatCurrency, chunk, deepMerge, isEmail } = require('hearty-helper')
```

---

## API Reference

### Number Formatters

#### `formatCurrency(num, currency?, locale?)`

Formats a number as a currency string using `Intl.NumberFormat`.

```ts
formatCurrency(1234.56)                    // "$1,234.56"
formatCurrency(1234.56, "EUR", "de-DE")    // "1.234,56 €"
```

#### `formatCompact(num)`

Formats a number in compact notation.

```ts
formatCompact(1000)        // "1K"
formatCompact(1500000)     // "1.5M"
formatCompact(1000000000)  // "1B"
```

#### `clamp(num, min, max)`

Clamps a number between min and max.

```ts
clamp(15, 0, 10)  // 10
clamp(-5, 0, 10)  // 0
```

#### `roundTo(num, decimals)`

Rounds to N decimal places.

```ts
roundTo(3.14159, 2)  // 3.14
```

#### `toOrdinal(num)`

Converts to ordinal string.

```ts
toOrdinal(1)   // "1st"
toOrdinal(2)   // "2nd"
toOrdinal(11)  // "11th"
toOrdinal(23)  // "23rd"
```

#### `isEven(num)` / `isOdd(num)`

Check if a number is even or odd.

#### `percentage(value, total)`

Calculate percentage.

```ts
percentage(25, 200)  // 12.5
```

#### `sum(numbers[])` / `average(numbers[])`

Sum or average an array of numbers.

```ts
sum([1, 2, 3, 4])      // 10
average([1, 2, 3, 4])   // 2.5
```

#### `padNumber(num, length)`

Pad with leading zeros.

```ts
padNumber(5, 3)   // "005"
padNumber(42, 5)  // "00042"
```

#### `toFixedNumber(num, decimals)`

Like `toFixed` but returns a number.

```ts
toFixedNumber(1.2345, 2)  // 1.23
```

#### `inRange(num, start, end)`

Check if number is within range (inclusive).

```ts
inRange(5, 1, 10)  // true
```

#### `formatBytes(bytes, decimals?)`

Format bytes into human-readable string.

```ts
formatBytes(1024)     // "1 KB"
formatBytes(1048576)  // "1 MB"
```

#### `randomInt(min, max)`

Random integer between min and max (inclusive).

```ts
randomInt(1, 10)  // e.g. 7
```

---

### Regex Validators

#### `isEmail(str)`

```ts
isEmail("test@example.com")  // true
isEmail("invalid")           // false
```

#### `isURL(str)`

```ts
isURL("https://example.com")  // true
isURL("not-a-url")            // false
```

#### `isIPv4(str)` / `isIPv6(str)`

```ts
isIPv4("192.168.1.1")  // true
isIPv6("::1")          // false (simplified; full form required)
```

#### `isHexColor(str)`

```ts
isHexColor("#fff")     // true
isHexColor("#ffffff")  // true
isHexColor("#ggg")     // false
```

#### `isCreditCard(str)`

Validates using the Luhn algorithm.

```ts
isCreditCard("4532015112830366")  // true
```

#### `isStrongPassword(str)`

Min 8 chars, uppercase, lowercase, number, special char.

```ts
isStrongPassword("Abcdef1!")  // true
isStrongPassword("weak")      // false
```

#### `isUUID(str)`

```ts
isUUID("550e8400-e29b-41d4-a716-446655440000")  // true
```

#### `isSlug(str)`

```ts
isSlug("hello-world")  // true
isSlug("Hello World")  // false
```

#### `isMACAddress(str)`

```ts
isMACAddress("00:1A:2B:3C:4D:5E")  // true
```

#### `isLatLong(str)`

```ts
isLatLong("40.7128,-74.0060")  // true
```

#### `isPostalCode(str, locale?)`

Supports US (default), UK, CA, DE, FR, IN, JP, AU.

```ts
isPostalCode("12345")         // true (US)
isPostalCode("SW1A 1AA", "UK")  // true
isPostalCode("500001", "IN")    // true
```

#### `isPhoneNumber(str)`

Basic international phone number validation.

```ts
isPhoneNumber("+14155552671")  // true
```

---

### String Utilities

#### `isAlphanumeric(str)`

```ts
isAlphanumeric("abc123")   // true
isAlphanumeric("abc@123")  // false
```

#### `removeSpaces(str)`

Removes all whitespace.

```ts
removeSpaces("hello world")  // "helloworld"
```

#### `getRandomString(length?)`

Random alphanumeric string (default length: 10).

```ts
getRandomString(8)  // e.g. "aB3xK9mQ"
```

#### `getTimestamp()`

Current Unix timestamp in milliseconds.

#### `capitalize(str)`

```ts
capitalize("hello")  // "Hello"
```

#### `capitalizeWords(str)`

```ts
capitalizeWords("hello world")  // "Hello World"
```

#### `camelCase(str)` / `snakeCase(str)` / `kebabCase(str)` / `pascalCase(str)`

```ts
camelCase("hello world")   // "helloWorld"
snakeCase("helloWorld")    // "hello_world"
kebabCase("helloWorld")    // "hello-world"
pascalCase("hello world")  // "HelloWorld"
```

#### `truncate(str, length, suffix?)`

```ts
truncate("Hello World", 8)  // "Hello..."
```

#### `slugify(str)`

```ts
slugify("Hello World!")  // "hello-world"
```

#### `escapeHtml(str)` / `unescapeHtml(str)`

```ts
escapeHtml('<script>alert("xss")</script>')
// "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
```

#### `reverseString(str)`

```ts
reverseString("hello")  // "olleh"
```

#### `countOccurrences(str, substr)`

```ts
countOccurrences("hello world hello", "hello")  // 2
```

#### `isPalindrome(str)`

```ts
isPalindrome("racecar")  // true
```

#### `mask(str, visibleCount?, maskChar?)`

```ts
mask("1234567890")      // "******7890"
mask("1234567890", 2)   // "********90"
```

#### `wordCount(str)`

```ts
wordCount("hello world")  // 2
```

#### `stripHtml(str)`

```ts
stripHtml("<p>Hello <b>World</b></p>")  // "Hello World"
```

#### `initials(str)`

```ts
initials("John Doe")  // "JD"
```

---

### URL Utilities

#### `getUrlParams(url?)`

Parses URL query parameters into an object.

```ts
getUrlParams("https://example.com?name=sri&page=2")
// { name: "sri", page: "2" }
```

#### `parseQueryString(str)`

```ts
parseQueryString("?name=sri&page=2")  // { name: "sri", page: "2" }
```

#### `buildQueryString(obj)`

```ts
buildQueryString({ name: "sri", page: 2 })  // "name=sri&page=2"
```

---

### Object Utilities

#### `isObject(data)`

```ts
isObject({ a: 1 })  // true
isObject([])         // false
isObject(null)       // false
```

#### `getSizeOfObject(data)`

```ts
getSizeOfObject({ a: 1, b: 2 })  // 2
getSizeOfObject([])               // null
```

#### `isObjectEmpty(data)`

```ts
isObjectEmpty({})        // true
isObjectEmpty({ a: 1 })  // false
```

#### `deepClone(obj)`

Deep clone using `structuredClone`.

```ts
const clone = deepClone({ a: { b: 1 } })
```

#### `pick(obj, keys[])`

```ts
pick({ a: 1, b: 2, c: 3 }, ["a", "c"])  // { a: 1, c: 3 }
```

#### `omit(obj, keys[])`

```ts
omit({ a: 1, b: 2, c: 3 }, ["b"])  // { a: 1, c: 3 }
```

#### `deepMerge(target, ...sources)`

```ts
deepMerge({ a: { b: 1 } }, { a: { c: 2 } })
// { a: { b: 1, c: 2 } }
```

#### `flattenObject(obj, separator?)`

```ts
flattenObject({ a: { b: { c: 1 } } })  // { "a.b.c": 1 }
```

#### `unflattenObject(obj, separator?)`

```ts
unflattenObject({ "a.b.c": 1 })  // { a: { b: { c: 1 } } }
```

#### `invertObject(obj)`

```ts
invertObject({ a: "1", b: "2" })  // { "1": "a", "2": "b" }
```

#### `mapKeys(obj, fn)` / `mapValues(obj, fn)`

```ts
mapKeys({ a: 1 }, k => k.toUpperCase())  // { A: 1 }
mapValues({ a: 1 }, v => v * 10)          // { a: 10 }
```

#### `hasPath(obj, path)`

```ts
hasPath({ a: { b: { c: 1 } } }, "a.b.c")  // true
hasPath({ a: 1 }, "a.b.c")                 // false
```

#### `getPath(obj, path, defaultValue?)`

```ts
getPath({ a: { b: 42 } }, "a.b")         // 42
getPath({ a: 1 }, "a.b.c", "default")    // "default"
```

#### `setPath(obj, path, value)`

Returns a new object with the value set at the path.

```ts
setPath({ a: { b: 1 } }, "a.c", 2)  // { a: { b: 1, c: 2 } }
```

---

### Array Utilities

#### `unique(arr)`

```ts
unique([1, 2, 2, 3])  // [1, 2, 3]
```

#### `uniqueBy(arr, key)`

```ts
uniqueBy([{ id: 1 }, { id: 2 }, { id: 1 }], "id")
// [{ id: 1 }, { id: 2 }]
```

#### `chunk(arr, size)`

```ts
chunk([1, 2, 3, 4, 5], 2)  // [[1, 2], [3, 4], [5]]
```

#### `flatten(arr, depth?)`

```ts
flatten([[1, 2], [3, [4]]])     // [1, 2, 3, [4]]
flatten([[1, 2], [3, [4]]], 2)  // [1, 2, 3, 4]
```

#### `shuffle(arr)`

Fisher-Yates shuffle. Returns a new array.

#### `groupBy(arr, key)`

```ts
groupBy([{ type: "a" }, { type: "b" }, { type: "a" }], "type")
// { a: [...], b: [...] }
```

#### `sortBy(arr, key, order?)`

```ts
sortBy([{ n: 3 }, { n: 1 }], "n")         // [{ n: 1 }, { n: 3 }]
sortBy([{ n: 3 }, { n: 1 }], "n", "desc") // [{ n: 3 }, { n: 1 }]
```

#### `intersection(arr1, arr2)` / `difference(arr1, arr2)` / `union(arr1, arr2)`

```ts
intersection([1, 2, 3], [2, 3, 4])  // [2, 3]
difference([1, 2, 3], [2, 3, 4])    // [1]
union([1, 2], [2, 3])               // [1, 2, 3]
```

#### `compact(arr)`

```ts
compact([0, 1, false, 2, "", null])  // [1, 2]
```

#### `sample(arr)`

Returns a random element.

#### `range(start, end, step?)`

```ts
range(0, 5)      // [0, 1, 2, 3, 4]
range(0, 10, 3)  // [0, 3, 6, 9]
```

#### `partition(arr, predicate)`

```ts
partition([1, 2, 3, 4], n => n % 2 === 0)  // [[2, 4], [1, 3]]
```

#### `zip(...arrays)` / `unzip(arr)`

```ts
zip([1, 2], ["a", "b"])         // [[1, "a"], [2, "b"]]
unzip([[1, "a"], [2, "b"]])     // [[1, 2], ["a", "b"]]
```

#### `first(arr, n?)` / `last(arr, n?)`

```ts
first([1, 2, 3])     // 1
first([1, 2, 3], 2)  // [1, 2]
last([1, 2, 3])      // 3
last([1, 2, 3], 2)   // [2, 3]
```

#### `countBy(arr, key)`

```ts
countBy(["apple", "banana", "avocado"], s => s[0])
// { a: 2, b: 1 }
```

#### `minBy(arr, key)` / `maxBy(arr, key)`

```ts
minBy([{ n: 3 }, { n: 1 }, { n: 2 }], "n")  // { n: 1 }
maxBy([{ n: 3 }, { n: 1 }, { n: 2 }], "n")  // { n: 3 }
```

---

### JSON Utilities

#### `isJson(str)`

```ts
isJson('{"name":"sri"}')  // true
isJson('not json')        // false
```

---

### Misc Utilities

#### `debounce(fn, delay)`

Creates a debounced function.

```ts
const search = debounce(query => fetchResults(query), 300)
```

#### `throttle(fn, delay)`

Creates a throttled function.

```ts
const onScroll = throttle(handleScroll, 100)
```

#### `sleep(ms)`

Promise-based delay.

```ts
await sleep(1000)
```

#### `retry(fn, retries?, delay?)`

Retry an async function.

```ts
const data = await retry(() => fetchData(), 3, 1000)
```

#### `memoize(fn)`

Basic memoization.

```ts
const cached = memoize(expensiveFunction)
```

#### `pipe(...fns)` / `compose(...fns)`

```ts
const transform = pipe(
  (x: number) => x + 1,
  (x: number) => x * 2,
)
transform(3)  // 8

const transform2 = compose(
  (x: number) => x + 1,
  (x: number) => x * 2,
)
transform2(3)  // 7
```

#### `deepEqual(a, b)`

Deep equality check.

```ts
deepEqual({ a: { b: 1 } }, { a: { b: 1 } })  // true
```

#### `generateId(length?)`

URL-safe unique ID (default 21 chars).

```ts
generateId()    // e.g. "V1StGXR8_Z5jdHi6B-myT"
generateId(10)  // e.g. "aBc1D_e2Fg"
```

#### `noop()`

A no-op function that does nothing.

#### `times(n, fn)`

```ts
times(3, i => i * 2)  // [0, 2, 4]
```

#### `isEmpty(value)`

Checks if a value is empty (string, array, object, null, undefined).

```ts
isEmpty("")         // true
isEmpty([])         // true
isEmpty({})         // true
isEmpty(null)       // true
isEmpty("hello")    // false
```

---

### Session Utilities (Browser only)

#### `getSessionId(sessionKey)`

Gets or creates a session ID in `sessionStorage`.

### Cookie Utilities (Browser only)

#### `setCookie(options)` / `getCookie(name)`

```ts
setCookie({ cname: 'theme', cvalue: 'dark', expires: 7 })
getCookie('theme')  // 'dark'
```

### HTTP Utilities

#### `sendHttpRequest<T>(url, options?)`

```ts
const data = await sendHttpRequest('https://api.example.com/users')
```

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **TypeScript** | Type-safe source code |
| **tsup** | Bundling (ESM + CJS dual output) |
| **Vitest** | Testing |
| **Node.js 18+** | Minimum runtime |

## Development

```bash
npm install
npm test
npm run test:watch
npm run build
npm run lint
```

## Migration from v1

v2 is a major rewrite in TypeScript with modern tooling. Key changes:

- **ESM + CJS dual exports** -- works with both `import` and `require`
- **TypeScript types included** -- full type definitions shipped with the package
- **`sendHttpRequest` now uses Fetch API** -- returns a Promise instead of using callbacks
- **`setCookie` no longer hardcodes a domain** -- you must provide `domain` explicitly
- **`getRandomNumber` renamed to `getTimestamp`** -- old name still works as a deprecated alias
- **`geturlParams` renamed to `getUrlParams`** -- old name still works as a deprecated alias

## Author

**Srinivas N** -- [srinivas69cse@gmail.com](mailto:srinivas69cse@gmail.com)

## License

[MIT](LICENSE)
