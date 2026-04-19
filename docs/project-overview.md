# Project Overview

## Description

A RESTful backend API for blog administration, built with Laravel. Provides secure endpoints for managing blog content including posts, categories, and comments — accessible to authenticated admins only.

## Goals

- Provide secure authentication for admin users
- Enable full CRUD management of blog posts
- Enable full CRUD management of categories
- Enable full CRUD management of comments

## Tech Stack

- **Backend**: PHP, Laravel (latest)
- **Database**: MySQL
- **Auth**: Laravel Sanctum (token-based API auth)
- **Other**: Laravel Resource classes for consistent API responses

## Target Users

Blog administrators only — no public reader access via this API.

## Modules

- **Auth**: Admin login, logout, token management
- **Categories**: Create, read, update, delete blog categories
- **Posts**: Create, read, update, delete blog posts (with category association)
- **Comments**: Create, read, update, delete comments on posts

## Notes

- All endpoints are protected by authentication middleware (admin only)
- API responses follow a consistent JSON structure using Laravel API Resources
