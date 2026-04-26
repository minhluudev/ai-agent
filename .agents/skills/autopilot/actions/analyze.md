# Analyze Action

1. Resolve spec: use active spec from loaded `docs/current-feature.md`; if `$ARGUMENTS` is raw text, run `spec` first.
2. Use already-loaded project overview and coding standards; read them only if unavailable in context.
3. Inspect only source/tests related to the spec.
4. Output affected modules, new files, modified files, risks, and assumptions.
5. Set current feature status to `In Progress` when implementation is about to begin.
