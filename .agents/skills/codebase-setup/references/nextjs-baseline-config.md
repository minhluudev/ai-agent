# Next.js Baseline - Config

Use this reference when the task changes scripts, tsconfig, lint/test configs, or API source switching.

## Baseline scripts (`package.json`)

Use existing script names when present. Otherwise prefer:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

## Config checklist

- `tsconfig.json`: strict mode, path aliases aligned to folder structure.
- Alias baseline:
  - set `compilerOptions.baseUrl` to `"."`
  - set `compilerOptions.paths["~/*"]`:
    - `"./src/*"` when app router is `src/app`
    - `"./*"` when app router is root `app`
- Keep `~/` as default internal import prefix after setup.
- Keep lint config compatible with Next defaults.
- Keep formatter config deterministic.
- Configure test environments (`jsdom`/`node`) as needed.
- Configure E2E base URL/retries/trace policy for CI.
- Env handling:
  - define required env keys in a typed schema
  - provide safe defaults when acceptable
  - never commit secret values

## API source switching

- Keep API source switch in `services/<service-name>.service.ts`.
- Keep mock source in `services/mockApi/<service-name>.mock.ts`.
- Keep real transport in `services/api-client.ts`.
- Switch by `EXTERNAL_API`:
  - `mock` -> mock API
  - `api` -> real API
- Runtime default is `api`.
- For automated tests, prefer `mock` unless spec requires real/sandbox verification.
- Ensure mock and real API share the same response contract type.
- Keep env-switch logic centralized in service layer.
