# Next.js Boilerplate

A modern, well-structured Next.js boilerplate with TypeScript, Redux Toolkit, Tailwind CSS, and shadcn/ui components.

## ✨ Features

- ⚡️ **Next.js 15** with App Router
- 🎨 **Tailwind CSS 4** with shadcn/ui components
- 📦 **Redux Toolkit** with typed hooks and persistence
- 🔒 **TypeScript** with strict mode
- 🏗️ **Feature-based architecture** for scalable code organization
- 🎯 **Barrel exports** for clean imports
- 📚 **Comprehensive documentation** in `/docs`

## 📁 Project Structure

```
├── app/              # Next.js App Router
├── components/       # Shared UI components
│   └── ui/          # shadcn/ui base components
├── features/        # Feature modules (auth, dialogs, etc.)
├── lib/             # Utilities and configurations
│   └── api/         # API client and services
├── store/           # Redux store with typed hooks
├── types/           # TypeScript type definitions
├── hooks/           # Custom React hooks
└── docs/            # Project documentation
```

For detailed structure documentation, see [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md).

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 📖 Documentation

- [Project Structure](docs/PROJECT_STRUCTURE.md) - Detailed explanation of the project organization
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI

## 🏗️ Architecture Highlights

### Feature-Based Organization

Features are self-contained modules with their own components, services, and types:

```typescript
features/
├── auth/
│   ├── services/    # API services
│   ├── types/       # Type definitions
│   └── index.ts     # Barrel export
└── dialogs/
    ├── components/  # Feature components
    └── index.ts
```

### Clean Imports with Barrel Exports

```typescript
// ✅ Clean imports
import { Button, Dialog } from "@/components/ui";
import { authService } from "@/features/auth";
import { useAppDispatch } from "@/store/hooks";

// ❌ Avoid
import { Button } from "@/components/ui/button";
import { authService } from "@/features/auth/services/authService";
```

### Typed Redux Hooks

```typescript
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// Fully typed dispatch and state
const dispatch = useAppDispatch();
const user = useAppSelector((state) => state.auth.user);
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
