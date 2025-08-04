# Source Directory - Core Application Structure

This directory contains the main source code for the Silen frontend application, organized using Next.js 15 App Router architecture.

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
├── components/             # Reusable UI component library  
└── lib/                    # Shared utility functions
```

## Overview

The `src/` directory follows Next.js 15 conventions with a clear separation of concerns:

- **`app/`** - Contains all pages, layouts, and route-specific logic
- **`components/`** - Houses the reusable UI component library
- **`lib/`** - Stores shared utilities and helper functions

## Architecture Patterns

### 1. Feature-Based Page Organization
Each major feature gets its own route in the `app/` directory:
- Dashboard (`/`) - Main analytics and overview
- Source Management (`/source`) - Log source CRUD operations  
- Optimization (`/optimization`) - Volume reduction strategies
- Filters (`/filters`) - Filter management interface
- Style Guide (`/style-guide`) - Design system documentation

### 2. Component Library Structure
Components are organized in `components/ui/` following a design system approach:
- Base components (Button, Card, etc.)
- Composite components (MetricCard, Sidebar, etc.)
- Feature-specific components (AddSourceDrawer, SelectorChips, etc.)

### 3. Utility Organization
The `lib/` directory contains shared utilities that can be used across the application:
- Class name utilities (`cn` function)
- Type definitions (when added)
- Shared constants (when added)

## Import Patterns & Path Mapping

### Path Aliases
TypeScript is configured with `@/*` mapping to `./src/*`, enabling clean imports:

```typescript
// Instead of relative imports
import { Sidebar } from '../../components/ui/sidebar'

// Use path aliases
import { Sidebar } from '@/components/ui/sidebar'
```

### Common Import Patterns

#### Page Components
```typescript
// Standard page imports
import { Sidebar } from '@/components/ui/sidebar'
import { MetricCard } from '@/components/ui/metric-card'
import { Button } from '@/components/ui/button'
```

#### Next.js Specific
```typescript
// Navigation and routing
import { useRouter, usePathname } from 'next/navigation'
import { Metadata } from 'next'

// Client component directive
"use client"
```

#### External Dependencies
```typescript
// Icons
import { Home, Settings, LogOut } from 'lucide-react'

// State management
import { useState, useEffect, useMemo } from 'react'

// Charts
import { LineChart, Area, XAxis, YAxis } from 'recharts'
```

## File Naming Conventions

### Pages (`app/` directory)
- `page.tsx` - Route component (required by Next.js)
- `layout.tsx` - Layout component (optional)
- `globals.css` - Global styles (root layout only)

### Components (`components/` directory)
- `kebab-case.tsx` - Component files use kebab-case
- Descriptive names indicating purpose (e.g., `add-source-drawer.tsx`)

### Utilities (`lib/` directory)
- `kebab-case.ts` - Utility files use kebab-case
- Generic names indicating function (e.g., `utils.ts`)

## State Management Approach

### Local State Pattern
Most components use React's built-in state management:

```typescript
// Component state
const [isOpen, setIsOpen] = useState(false)
const [selectedItems, setSelectedItems] = useState<string[]>([])

// Form state
const [formData, setFormData] = useState({
  name: '',
  type: '',
  endpoint: ''
})
```

### Navigation State
Next.js router handles navigation state:

```typescript
const router = useRouter()
const pathname = usePathname()

// Programmatic navigation
router.push('/optimization')
```

## Component Communication Patterns

### Props Down, Events Up
```typescript
// Parent passes data and callbacks
<MetricCard 
  title="Log Volume"
  value="2.3 TB"
  onChange={handleMetricChange}
/>

// Child component interface
interface MetricCardProps {
  title: string
  value: string
  onChange?: (value: string) => void
}
```

### Context Pattern (Not Currently Used)
The application currently doesn't use React Context, but it would be added here when needed for:
- Theme/dark mode
- User authentication state
- Global application state

## Integration Points

### With Next.js Framework
- Pages auto-route based on file structure
- Built-in optimizations (fonts, images, etc.)
- Server-side rendering capabilities
- Static generation support

### With Tailwind CSS
- Global styles in `app/globals.css`
- Component-level utilities throughout
- Design tokens configured in root `tailwind.config.js`

### With TypeScript
- Strict type checking enabled
- Component prop interfaces
- Next.js types imported automatically

## Development Workflow

### Adding New Pages
1. Create directory in `src/app/`
2. Add `page.tsx` with default export
3. Follow layout pattern with Sidebar
4. Import needed UI components

### Adding New Components
1. Create file in `src/components/ui/`
2. Define TypeScript interface for props
3. Use consistent styling patterns
4. Export for use in pages

### Adding Utilities
1. Create or extend files in `src/lib/`
2. Export functions for reuse
3. Add TypeScript types as needed

## Common Patterns & Best Practices

### Component Structure
```typescript
"use client" // If client-side features needed

import { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

interface MyComponentProps {
  // Props definition
}

export function MyComponent({ ...props }: MyComponentProps) {
  // Component logic
  return (
    // JSX with consistent styling
  )
}
```

### Error Handling
Currently minimal error handling - opportunity for enhancement:
- Error boundaries not implemented
- Form validation basic
- Loading states minimal

### Performance Considerations
- Components could benefit from React.memo where appropriate
- Large components (style-guide) could use code splitting
- State updates follow React best practices

## File Dependencies

### High-Impact Changes
Files that affect multiple parts of the application:
- `app/globals.css` - Global styles affect all pages
- `components/ui/sidebar.tsx` - Used by all main pages
- `lib/utils.ts` - Used by most components

### Isolated Changes
Files with limited impact:
- Individual page components in `app/*/page.tsx`
- Specific UI components used by few pages
- Feature-specific utilities

This source directory structure provides a solid foundation for scalable React development with clear separation of concerns and consistent patterns throughout.