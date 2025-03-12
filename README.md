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

The project includes a type-safe API client that can be used to interact with the API. The API supports GraphQL-like capabilities for selecting specific columns and relations.

### Database Schema

#### User Table
- `id`: UUID (primary key, auto-generated)
- `email`: String (unique, required)
- `name`: String (optional)
- `age`: Integer (optional)

#### User Address Table (One-to-One Relation)
- `userId`: String (foreign key to User.id)
- `address1`: String (optional)
- `address2`: String (optional)
- `city`: String (optional)
- `state`: String (optional)
- `postalCode`: String (optional)
- `country`: String (optional)
- `lat`: Float (optional)
- `lng`: Float (optional)

### Create Operation

Create a user with optional address information:

```typescript
import { apiClient } from './apiClient';

// Create a user with address
const createUserResponse = await apiClient.api.user.$post({
  json: {
    email: 'user@example.com',
    name: 'John Doe',
    age: 30,
    address: {
      address1: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'USA'
    }
  }
});
```

### Get Operation

Get a user with selective columns and relations:

```typescript
import { apiClient } from './apiClient';

// Get a user with all fields
const getUserResponse = await apiClient.api.user[':userId'].$post({
  param: { userId: 'user-id' }
});

// Get a user with selective columns
const getUserSelectiveResponse = await apiClient.api.user[':userId'].$post({
  param: { userId: 'user-id' },
  json: {
    columns: {
      id: true,
      name: true,
      email: true,
      // Selective address fields
      address: {
        city: true,
        country: true
      }
    }
  }
});
```

### Update Operation

Update a user with optional address information:

```typescript
import { apiClient } from './apiClient';

// Update user information
const updateUserResponse = await apiClient.api.user[':userId'].$patch({
  param: { userId: 'user-id' },
  json: {
    name: 'Updated Name',
    age: 31,
    address: {
      city: 'New York',
      state: 'NY',
      postalCode: '10001'
    }
  }
});
```

The API client provides type safety throughout the entire request/response cycle, ensuring that you're using the correct fields and types for each operation.

## License

MIT

```
open http://localhost:3000/test-user
```
