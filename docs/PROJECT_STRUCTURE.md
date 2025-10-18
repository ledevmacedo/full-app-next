# Project Structure

This document describes the organization of the Next.js boilerplate project.

## Directory Structure

```
├── app/                   # Next.js App Router
│   ├── (public)/          # Public routes
│   ├── api/               # API routes
│   ├── providers/         # React providers
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── layout/           # Layout components
│   └── shared/           # Shared components
├── features/             # Feature modules
│   ├── auth/             # Authentication feature
│   │   ├── components/   # Auth-specific components
│   │   ├── services/     # Auth API services
│   │   ├── types/        # Auth types
│   │   └── index.ts      # Barrel export
│   └── dialogs/          # Dialogs feature
│       ├── components/   # Dialog components
│       ├── hooks/        # Dialog hooks
│       └── index.ts      # Barrel export
├── lib/                  # Shared utilities and configs
│   ├── api/               # API client and utilities
│   │   ├── client.ts    # Axios instances
│   │   ├── errorHandler.ts
│   │   ├── validation.ts
│   │   └── index.ts     # Barrel export
│   ├── utils/           # Utility functions
│   └── constants/       # App constants
├── store/                # Redux store
│   ├── slices/          # Redux slices
│   ├── hooks.ts         # Typed Redux hooks (useAppDispatch, useAppSelector)
│   ├── store.ts         # Store configuration
│   └── types.d.ts       # Store types
├── types/                # TypeScript types
│   ├── api/             # API types
│   ├── models/          # Data models
│   ├── common/          # Common types
│   ├── store/           # Store types
│   └── index.ts         # Barrel export
├── hooks/                # Custom React hooks
└── public/               # Static assets
```

## Import Conventions

### Using Barrel Exports

All major directories have barrel exports (`index.ts`) for cleaner imports:

```typescript
// ✅ Good - Using barrel export
import { GlobalDialog } from "@/features/dialogs";
import { authService } from "@/features/auth";
import { globalInstance, handleApiError } from "@/lib/api";
import { Button, ModeToggle } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// ❌ Avoid - Direct file imports
import { GlobalDialog } from "@/features/dialogs/components/GlobalDialog";
import { authService } from "@/features/auth/services/authService";
```

### Path Aliases

The project uses `@/*` alias for all imports:

```typescript
import { Component } from "@/components/ui";
import { authService } from "@/features/auth";
import type { User } from "@/types/models";
import { useAppSelector } from "@/store/hooks";
```

## Feature Organization

Features follow a consistent structure:

```
features/[feature-name]/
├── components/      # Feature-specific components
├── services/       # API services for this feature
├── types/          # Feature-specific types
├── utils/          # Feature-specific utilities (optional)
└── index.ts        # Barrel export
```

**Note:** Custom hooks should be placed in the root `/hooks` directory or use Redux hooks from `/store/hooks.ts`.

### Creating a New Feature

1. Create the feature directory: `features/my-feature/`
2. Add subdirectories as needed (components, services, types, utils)
3. Create `index.ts` to export public API
4. Keep feature-specific code isolated within the feature
5. For hooks, use Redux hooks from `/store/hooks.ts` or create global hooks in `/hooks`

## Type Organization

Types are organized by category:

- `types/api/` - API request/response types
- `types/models/` - Domain models (User, Product, etc.)
- `types/common/` - Utility types and common interfaces
- `types/store/` - Redux store types

Feature-specific types should stay within the feature directory.

## Component Organization

- `components/ui/` - Base UI components from shadcn/ui
- `components/layout/` - Layout components (Header, Footer, Sidebar)
- `components/shared/` - Shared components used across features
- `features/*/components/` - Feature-specific components

## Best Practices

1. **Use barrel exports** - Import from directory index files
2. **Keep features isolated** - Feature code should be self-contained
3. **Shared code in lib/** - Common utilities go in `/lib`
4. **Types in types/** - Shared types go in `/types`
5. **Follow naming conventions**:
   - Components: PascalCase (e.g., `UserProfile.tsx`)
   - Utilities: camelCase (e.g., `formatDate.ts`)
   - Types: PascalCase with `.types.ts` suffix
   - Hooks: camelCase with `use` prefix (e.g., `useAuth.ts`)

## Migration Notes

This structure was created as part of Module 1 improvements:

- Services consolidated from `/services` and `/app/services` to `/lib/api`
- Types moved from scattered locations to `/types`
- Features created for better code organization
- Barrel exports added for cleaner imports
