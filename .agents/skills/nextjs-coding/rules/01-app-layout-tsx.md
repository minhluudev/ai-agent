# Rule 01 - `app/layout.tsx`

## Purpose
Define global app shell only.

## Must
- Export default RootLayout.
- Render `<html>` and `<body>`.
- Wire global providers and global styles only.

## Must Not
- Route-specific data fetching.
- Feature business logic.
- Page-specific UI layout.
