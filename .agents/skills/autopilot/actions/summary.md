# Summary Action

Generate a change summary for developer review.

## Steps

### Step 1: Gather

- Read active spec for original goals
- `git diff main...HEAD --stat`
- `git diff main...HEAD`
- `git log main...HEAD --oneline`

### Step 2: Summary

```
## Summary
{1-2 sentences}

## Goals Status
- [x] {goal} — {how implemented}
- [ ] {goal} — {why not}

## Files Changed
| File | Action | Description |
|------|--------|-------------|
| {path} | Created/Modified | {what and why} |

## Tests
- Unit: {count} — {coverage}
- Integration: {count} — {coverage}
- All passing: Yes/No

## Notes / Risks
- {concerns}

## Next Step
- {action}
```

### Step 3: Checklist

```
## Pre-Merge Checklist
- [ ] Requirement implemented correctly
- [ ] No unrelated files changed
- [ ] Input validation added
- [ ] Authorization checked
- [ ] Tests added and passing
- [ ] No secrets exposed
- [ ] No unnecessary dependencies
- [ ] Migration reviewed (if any)
- [ ] ApiResponse used consistently
- [ ] No N+1 queries
```
