# Kotlin Playground v2

## Getting Started

First, you need install dependencies:
```bash
npm ci
```
For run the development server:

```bash
npm run dev
```

Or, for generate static site:
```bash
npm run export
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Additional features
 * List of required environments in [`.env.example`](./.env.example).
 * Add server redirects file into `src/pages/*/_redirects.mjs` for [custom redirects](./src/pages/hands-on/_redirects.mjs).

## Tests

List of test modes:
 * `npm run test` - dev test. It's reused localhost by by **dev**-mode
 * `npm run test:release` - full list of test.

Additional configuration (can be used from `.env.local`):
 * `TEST_LOWRES_AGENT` = Disable or alternative way for some high cpu required test. Default: `false`. Default: _it depends mode_.
 * `TEST_PROJECT_LIST` = List of devices. Possible values `short` | `normal` | `long`. Default: _it depends mode_.
 * `TEST_HEADLESS_MODE` = Enable/disable headless mode. Default: _it depends mode_.