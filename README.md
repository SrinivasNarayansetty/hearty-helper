# hearty-helper

[![NPM version](https://img.shields.io/npm/v/hearty-helper.svg)](https://www.npmjs.com/package/hearty-helper)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A lightweight TypeScript utility library providing helper functions for URL parsing, object checks, string operations, cookies, and HTTP requests.

## Installation

```bash
npm install hearty-helper
```

## Quick Start

```ts
// ESM
import { getUrlParams, isObject, getRandomString } from 'hearty-helper'

// CommonJS
const { getUrlParams, isObject, getRandomString } = require('hearty-helper')
```

---

## API

### URL Utilities

#### `getUrlParams(url?: string)`

Parses URL query parameters into an object.

```ts
import { getUrlParams } from 'hearty-helper'

const params = getUrlParams('https://example.com?name=sri&page=2&lang=en')
// { name: 'sri', page: '2', lang: 'en' }
```

### Object Utilities

#### `isObject(data: unknown)`

Checks if a value is a plain object (not an array, null, or other type).

```ts
import { isObject } from 'hearty-helper'

isObject({ a: 1 })  // true
isObject([1, 2])     // false
isObject(null)       // false
```

#### `getSizeOfObject(data: unknown)`

Returns the number of own enumerable properties in an object, or `null` if not an object.

```ts
import { getSizeOfObject } from 'hearty-helper'

getSizeOfObject({ a: 1, b: 2 })  // 2
getSizeOfObject([])               // null
```

#### `isObjectEmpty(data: unknown)`

Checks if an object is empty.

```ts
import { isObjectEmpty } from 'hearty-helper'

isObjectEmpty({})        // true
isObjectEmpty({ a: 1 })  // false
```

### JSON Utilities

#### `isJson(str: string)`

Checks if a string is valid JSON.

```ts
import { isJson } from 'hearty-helper'

isJson('{"name":"sri"}')  // true
isJson('not json')        // false
```

### String Utilities

#### `isAlphanumeric(str: string)`

Checks if a string contains only alphanumeric characters.

```ts
import { isAlphanumeric } from 'hearty-helper'

isAlphanumeric('abc123')   // true
isAlphanumeric('abc@123')  // false
```

#### `removeSpaces(str: string)`

Removes all whitespace from a string.

```ts
import { removeSpaces } from 'hearty-helper'

removeSpaces('hello all welcome')  // 'helloallwelcome'
```

#### `getRandomString(length?: number)`

Generates a random alphanumeric string. Defaults to length 10.

```ts
import { getRandomString } from 'hearty-helper'

getRandomString(8)   // e.g. 'aB3xK9mQ'
getRandomString()    // e.g. 'Y0X21OHdUB' (length 10)
```

#### `getTimestamp()`

Returns the current Unix timestamp in milliseconds.

```ts
import { getTimestamp } from 'hearty-helper'

getTimestamp()  // e.g. 1712500000000
```

### Session Utilities (Browser only)

#### `getSessionId(sessionKey: string)`

Gets or creates a session ID in `sessionStorage`. Generates a random 30-character string if none exists.

```ts
import { getSessionId } from 'hearty-helper'

getSessionId('tab_session')  // e.g. 'MbNhIUq2HhwgTGCyINGPXg8SgnlwWf'
```

### Cookie Utilities (Browser only)

#### `setCookie(options: CookieOptions)`

Sets a cookie with the given options.

```ts
import { setCookie } from 'hearty-helper'

setCookie({
  cname: 'theme',
  cvalue: 'dark',
  expires: 7,        // days from now
  path: '/',
  secure: true,
  sameSite: 'Lax',
})
```

#### `getCookie(name: string)`

Gets a cookie value by name. Returns `undefined` if not found.

```ts
import { getCookie } from 'hearty-helper'

getCookie('theme')  // 'dark'
```

### HTTP Utilities

#### `sendHttpRequest<T>(url: string, options?: HttpRequestOptions)`

Sends an HTTP request using the Fetch API. Returns parsed JSON.

```ts
import { sendHttpRequest } from 'hearty-helper'

// GET request
const users = await sendHttpRequest('https://api.example.com/users')

// POST request
const result = await sendHttpRequest('https://api.example.com/users', {
  method: 'POST',
  body: { name: 'Srinivas' },
})
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
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build the package
npm run build

# Type check
npm run lint
```

## Migration from v1

v2 is a major rewrite in TypeScript with modern tooling. Key changes:

- **ESM + CJS dual exports** — works with both `import` and `require`
- **TypeScript types included** — full type definitions shipped with the package
- **`sendHttpRequest` now uses Fetch API** — returns a Promise instead of using callbacks
- **`setCookie` no longer hardcodes a domain** — you must provide `domain` explicitly
- **`getRandomNumber` renamed to `getTimestamp`** — old name still works as a deprecated alias
- **`geturlParams` renamed to `getUrlParams`** — old name still works as a deprecated alias

## Author

**Srinivas N** — [srinivas69cse@gmail.com](mailto:srinivas69cse@gmail.com)

## License

[MIT](LICENSE)
