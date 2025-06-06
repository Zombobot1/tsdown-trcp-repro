# tRPC Library

A small TypeScript library demonstrating the usage of `initTRPC` and `TRPCError` from `@trpc/server`.

## Features

- ✅ Uses `initTRPC` to create tRPC instance
- ✅ Demonstrates `TRPCError` for proper error handling
- ✅ TypeScript support with full type safety
- ✅ Authentication middleware example
- ✅ Input validation with Zod
- ✅ Query and mutation procedures

## Installation

```bash
npm install
```

## Usage

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Run built version

```bash
npm start
```

## Library Features

The library includes:

1. **Public procedures** - Accessible without authentication
2. **Protected procedures** - Require user authentication
3. **Error handling** - Various TRPCError examples
4. **Input validation** - Using Zod schemas
5. **Context management** - User context handling

## Example Procedures

- `greeting` - Public query procedure
- `getUserInfo` - Protected query procedure
- `updateUserName` - Protected mutation with validation
- `riskOperation` - Demonstrates different error types

## Error Types Demonstrated

- `UNAUTHORIZED` - Authentication required
- `BAD_REQUEST` - Invalid input/validation errors
- `FORBIDDEN` - Access denied
- `INTERNAL_SERVER_ERROR` - Server-side errors
