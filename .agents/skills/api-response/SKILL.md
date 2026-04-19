---
name: api-response
description: Consistent HTTP JSON responses in Laravel via ApiResponse::success(), ::problem(), ::validation(). Use when writing controllers, middleware, or exception handlers.
---

# HTTP API Response

Always use `App\Support\Http\ApiResponse`. Never use `response()->json()` directly.

## Success

```php
return ApiResponse::success(
    request: $request,
    data: $mappedData,        // array or null
    code: 'RESOURCE.ACTION_SUCCESS',
    message: null,
    status: Response::HTTP_OK, // 201 for create, 202 for async
);
```

Code convention: `RESOURCE.ACTION_SUCCESS` — e.g. `VOUCHER.GET_SUCCESS`, `PARTNER_PICKUP.CREATE_SUCCESS`

Status: `200` GET/PUT/DELETE · `201` create · `202` async

## Problem (RFC 7807)

```php
return ApiResponse::problem(
    request: $request,
    status: Response::HTTP_NOT_FOUND,
    code: 'RESOURCE.NOT_FOUND',
    detail: 'Distributor not found.',
    title: null,      // auto-derived from status if omitted
    errors: null,     // [['field' => ..., 'message' => ...]]
    extensions: null,
);
```

| Situation | status | code |
|---|---|---|
| Missing/invalid input | 400 | `REQUEST.INVALID` |
| Bad credentials | 401 | `AUTH.INVALID_CREDENTIALS` |
| Access denied | 403 | `PARTNER.FORBIDDEN` |
| Not found | 404 | `RESOURCE.NOT_FOUND` |
| Idempotency conflict | 409 | `IDEMPOTENCY.CONFLICT` |
| Validation failed | 422 | `VALIDATION.FAILED` |
| Downstream unavailable | 503 | `INTERNAL.ERROR` |
| Unexpected exception | 500 | `INTERNAL.ERROR` |

## Validation

Auto-handled by `App\Http\Requests\FormRequest`. Do **not** call `::validation()` in controllers.

Manual (middleware only):

```php
return ApiResponse::validation(
    request: $request,
    detail: 'One or more fields are invalid.',
    errors: [['field' => 'voucher_number', 'message' => 'Must be at least 1.']],
);
```

## Response fields

**Success:** `code`, `message`, `data`, `traceId`

**Problem:** `type`, `title`, `status`, `detail`, `code`, `traceId`

**Validation:** same as Problem + `errors[]{field, message}`

## Controller checklist

1. Correct HTTP status (see table)
2. `RESOURCE.ACTION_SUCCESS` code naming
3. Map DTOs to plain arrays in a private `map*()` method — never pass DTO objects into `data`
4. Wrap external calls in `try/catch (Throwable $e)` → `ApiResponse::problem(..., 500, 'INTERNAL.ERROR', ...)`
5. Check `null`/`false` use case return → 404 before success response
