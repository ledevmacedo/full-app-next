# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Feature-based architecture in `/features` directory
- Barrel exports for cleaner imports across the project
- Typed Redux hooks (`useAppDispatch`, `useAppSelector`) in `/store/hooks.ts`
- Comprehensive project structure documentation in `/docs/PROJECT_STRUCTURE.md`
- Organized type definitions in `/types` directory (api, models, common, store)
- API client consolidation in `/lib/api` with error handling and validation

### Changed
- **BREAKING**: Moved services from `/services` and `/app/services` to `/lib/api`
- **BREAKING**: Moved `GlobalDialog` from `/components/global` to `/features/dialogs`
- Reorganized Redux store to use typed hooks
- Updated all imports to use `@/` alias consistently
- Improved README with architecture highlights and documentation links

### Removed
- Duplicate service files in `/services` and `/app/services`
- `useAuth` hook (use Redux hooks directly from `/store/hooks`)
- Unused imports and legacy code

### Fixed
- Import paths now use consistent `@/` alias
- Type safety improved with proper TypeScript types organization

## [0.1.0] - Initial Release

### Added
- Next.js 15 with App Router
- TypeScript configuration
- Tailwind CSS 4
- Redux Toolkit setup
- shadcn/ui components
- Basic project structure
