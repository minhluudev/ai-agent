# Next.js Baseline - Verification

Use this reference when verifying setup completion.

## Verification order

Run in this order where applicable:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run test`
4. `npm run build`
5. `npm run test:e2e` (or scoped playwright command)

If any command is unavailable, report missing setup explicitly.
Also verify at least one `~/` import resolves successfully in both typecheck and build.
