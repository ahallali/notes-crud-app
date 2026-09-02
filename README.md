# Notes CRUD App

A learning project built with Next.js and TypeScript: a notes dashboard with registration, sign-in, and forms for creating and editing notes.

## Features

- Create, read, edit and delete notes from the dashboard.
- Register and sign in through NextAuth credentials authentication.
- Store users and notes in SQLite using Prisma models and migrations.
- Style the interface with Tailwind CSS.

## Stack

React, Next.js, TypeScript, Tailwind CSS, NextAuth, Prisma and SQLite. The repository currently uses Next.js 15.0.1 and a React 19 release candidate.

## Run locally

You need Node.js, npm and a local clone of this repository. The existing dependency versions require legacy peer-dependency resolution.

```sh
npm ci --legacy-peer-deps
cp .env.example .env
```

Generate a local authentication secret with `openssl rand -base64 32` and set it as `NEXTAUTH_SECRET` in `.env`. Keep that file private.

```sh
npx prisma generate
npx prisma migrate deploy
npm run dev
```

Open [localhost:3000](http://localhost:3000), register a test account and open the dashboard. Migrations create a fresh SQLite database at `prisma/dev.db`; no existing accounts or notes are included in the current tracked files.

## Project structure

- `src/app/` — pages, layouts and dashboard UI.
- `pages/api/` — authentication and notes API handlers.
- `src/lib/prisma.ts` — Prisma client.
- `prisma/schema.prisma` — user and note models.
- `prisma/migrations/` — database migrations.

## Current limitations

This is a local learning project, not a production-ready service. The notes API currently accepts user IDs from the client and does not enforce session and ownership checks on the server. Do not use it for private data or deploy it publicly before fixing authorization.

Next steps are to add those checks and API tests, update the older framework dependencies, and consolidate the duplicate API files. There is no automated test suite yet. The Docker configuration also needs correction and validation; use the local setup above instead.

Generated build output, machine files, environment files and local databases are ignored. The cleanup preserves application code and migrations and does not rewrite repository history.
