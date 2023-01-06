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

List of required environments in [`.env.example`](./.env.example).

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tests

List of test modes:
 * `npm run test` - dev test. It's reused localhost by by **dev**-mode
 * `npm run test:release` - full list of test.

Additional configuration (can be used from `.env.local`):
 * `E2E_LOWRES_AGENT` = Disable or alternative way for some high cpu required test. Default: `false`. Default: _it depends mode_.
 * `E2E_PROJECT_LIST` = List of devices. Possible values `short` | `normal` | `long`. Default: _it depends mode_.
 * `E2E_HEADLESS_MODE` = Enable/disable headless mode. Default: _it depends mode_.