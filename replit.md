# IT Services Cost Calculator

## Overview

This is a full-stack web application built for calculating IT service costs. The application features a React frontend with a modern UI built using shadcn/ui components and Tailwind CSS, paired with an Express.js backend. The app allows users to configure various IT services (physical servers, virtual servers, monitoring, etc.) and calculate total annual costs with export and sharing functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Management**: PostgreSQL-based session storage with connect-pg-simple
- **Development Tools**: tsx for TypeScript execution, esbuild for production builds
- **API Design**: RESTful API structure with /api prefix for all endpoints

### Data Storage
- **Database**: PostgreSQL (configured for Neon Database)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **ORM**: Drizzle ORM with type-safe query building
- **In-Memory Storage**: Fallback memory storage implementation for development

### Authentication & Authorization
- **Session-based Authentication**: Using express-session with PostgreSQL store
- **User Schema**: Basic user model with username/password authentication
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations

### Development Environment
- **Hot Reload**: Vite HMR for frontend, tsx watch mode for backend
- **TypeScript**: Strict configuration with path mapping for clean imports
- **Code Quality**: ESM modules throughout, consistent file structure
- **Build Process**: Separate build commands for client (Vite) and server (esbuild)

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection for Neon Database
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Web application framework for the backend API
- **react**: Frontend UI library with hooks and modern patterns
- **vite**: Fast build tool and development server

### UI Component Libraries
- **@radix-ui/***: Comprehensive set of accessible UI primitives (40+ components)
- **@tanstack/react-query**: Server state management and caching
- **class-variance-authority**: Utility for creating component variants
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **tsx**: TypeScript execution engine for development
- **esbuild**: Fast bundler for production builds
- **drizzle-kit**: Database migration and introspection tool
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay

### Utility Libraries
- **wouter**: Lightweight routing library
- **date-fns**: Date manipulation utilities
- **nanoid**: URL-safe unique ID generation
- **zod**: TypeScript-first schema validation