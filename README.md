# Hono RPC GraphQL-like REST API with Drizzle and SQLite

A modern TypeScript API project that demonstrates how to build a REST API with RPC-like capabilities similar to GraphQL, using Hono, Drizzle ORM, and SQLite.

## Features

- 🚀 **Hono Framework**: Fast, lightweight web framework for building modern APIs
- 📊 **Drizzle ORM**: Type-safe SQL query builder with schema validation
- 🔄 **RPC-like API**: GraphQL-like capabilities with REST endpoints
- 🔒 **Type Safety**: End-to-end type safety with TypeScript
- 📝 **Zod Validation**: Request and response validation with Zod
- 🧪 **Testing Utilities**: Built-in tools for testing API endpoints

## Tech Stack

- [Hono](https://hono.dev/) - Lightweight web framework
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [SQLite](https://www.sqlite.org/) - Embedded database
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/hono-rpc-graphql-like-rest-api-drizzle-query.git
cd hono-rpc-graphql-like-rest-api-drizzle-query
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development server
```bash
pnpm dev
```

This will:
- Push the Drizzle schema to the SQLite database
- Start the Drizzle Studio on port 7044
- Start the development server on port 3000

```
open http://localhost:3000/test-user
```

## Project Structure

```
src/
├── api/                # API routes and handlers
│   └── user/           # User-related endpoints
│       ├── create/     # Create user endpoint
│       ├── get/        # Get user endpoint
│       ├── update/     # Update user endpoint
│       └── delete/     # Delete user endpoint
├── db/                 # Database configuration
│   ├── drizzle.ts      # Drizzle ORM setup
│   └── user.schema.ts  # User schema definition
├── types/              # TypeScript type definitions
├── apiClient.ts        # Type-safe API client
├── constants.ts        # Application constants
├── index.ts            # Application entry point
└── test-crud.ts        # CRUD operation tests
```

## API Endpoints

### User API

- **Create User**: `POST /api/user`
- **Get User**: `POST /api/user/:userId`
- **Update User**: `PATCH /api/user/:userId`
- **Delete User**: `DELETE /api/user/:userId`

## Database Management

- **Drizzle Studio**: Access the database UI at `http://localhost:7044`
- **Schema Push**: Update the database schema with `pnpm drizzle:push`

## Type-Safe API Client

The project includes a type-safe API client that can be used to interact with the API:

```typescript
import { apiClient } from './apiClient';

// Create a user
const createUserResponse = await apiClient.api.user.$post({
  json: {
    email: 'user@example.com',
    name: 'John Doe',
    age: 30
  }
});

// Get a user
const getUserResponse = await apiClient.api.user[':userId'].$post({
  param: { userId: 'user-id' }
});
```

## License

MIT

```
open http://localhost:3000/test-user
```
