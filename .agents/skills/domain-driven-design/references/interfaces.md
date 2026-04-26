# Interfaces Layer

Contains: Controllers, Requests, Resources, Listeners.

## Responsibilities

- `Controller`: validates via FormRequest, creates DTO, calls UseCase, returns via ApiResponse.
- `Request`: FormRequest may call `Application/DTOs/*DTO::rules()` for validation. Controller passes `$request->validated()` to `DTO::fromArray()`.
- `Resource`: shapes API output.

## Constraints

- No business rules, direct repository calls, or Eloquent queries.
- Controllers return via `api-response`; never `response()->json()`.
