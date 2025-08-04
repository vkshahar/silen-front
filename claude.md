# Silen Frontend - Security Dashboard & Log Volume Reduction Platform

## Project Overview

Silen is a modern security dashboard built with Next.js 15 that helps organizations reduce log volume and manage security data efficiently. The frontend provides interfaces for log source management, optimization initiatives, filtering, and comprehensive analytics.

## High-Level Architecture

### Technology Stack
- **Framework**: Next.js 15.4.5 with App Router
- **Runtime**: React 19.1.0 
- **Language**: TypeScript 5+ (strict mode)
- **Styling**: Tailwind CSS 3.4.17 with custom design system
- **Components**: Radix UI primitives + custom components
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Animation**: Framer Motion

### Key Features
1. **Dashboard Analytics**: Real-time metrics, ingress/egress charts, log source overview
2. **Source Management**: CRUD operations for log sources and destinations
3. **Optimization Initiatives**: View and apply volume reduction strategies
4. **Filter Management**: Control active optimization filters
5. **Design System**: Comprehensive style guide and component library

## Project Structure

```
silen_front/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout (fonts, metadata)
│   │   ├── page.tsx         # Dashboard homepage
│   │   ├── globals.css      # Global styles & design tokens
│   │   ├── optimization/    # Optimization initiatives page
│   │   ├── source/          # Source management page
│   │   ├── filters/         # Filter management page
│   │   └── style-guide/     # Design system documentation
│   ├── components/ui/       # Reusable UI component library
│   └── lib/                 # Utility functions
├── public/                  # Static assets
└── [config files]          # Next.js, Tailwind, TypeScript configs
```

## Design System & Branding

### Color Palette
- **Brand Primary**: #9D4EDD (Silen Purple)
- **Brand Secondary**: #C77DFF (Light Purple) 
- **Brand Dark**: #7B2CBF (Dark Purple)
- **Status Colors**: Red (Critical), Orange (High), Yellow (Medium), Green (Low)
- **Surface Colors**: White, Light Gray, Background Gray

### Typography Scale
- **Display**: 48px - Large numbers and key metrics
- **Headings**: XL (36px), LG (30px), MD (24px), SM (20px)
- **Body**: LG (18px), MD (16px), SM (14px)
- **Caption**: 12px - Metadata and timestamps

## Component Architecture

### Layout Pattern
All pages follow a consistent layout structure:
```tsx
<div className="flex min-h-screen bg-surface-secondary">
  <Sidebar />
  <div className="flex-1">
    <header>{/* Page header */}</header>
    <main>{/* Page content */}</main>
  </div>
</div>
```

### Component Categories
1. **Layout Components**: Sidebar, page headers, containers
2. **Data Display**: MetricCard, charts, tables
3. **Interactive Elements**: Buttons, dropdowns, forms, chips
4. **Overlays**: Drawers, modals

## Key Dependencies & Their Usage

| Dependency | Purpose | Key Files |
|------------|---------|-----------|
| `@radix-ui/react-slot` | Polymorphic components | button.tsx |
| `class-variance-authority` | Component variants | button.tsx, card.tsx |
| `clsx` + `tailwind-merge` | Class merging utility | lib/utils.ts |
| `framer-motion` | Animations | selector-chips.tsx |
| `lucide-react` | Icon system | All components |
| `recharts` | Data visualization | Chart components |

## Development Workflow

### Common Commands
```bash
npm run dev        # Start development server
npm run build      # Build for production  
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Page Development Pattern
1. Create page directory in `src/app/`
2. Add `page.tsx` with default export
3. Import and use UI components from `src/components/ui/`
4. Follow the standard layout pattern with Sidebar
5. Use consistent styling with Tailwind classes

### Component Development Pattern
1. Create component in `src/components/ui/`
2. Use TypeScript interfaces for props
3. Implement variants with CVA if needed
4. Use Tailwind classes following design system
5. Export component for use in pages

## Navigation Structure

```typescript
const navigationItems = [
  { name: "Log Size Reduction Dashboard", href: "/" },
  { name: "Source Management", href: "/source" },
  { name: "Optimization Initiatives", href: "/optimization" },
  { name: "Filter Management", href: "/filters" },
  { name: "Destination Management", href: "/destination" }, // TODO
  { name: "Pipeline Manager", href: "/pipeline" },         // TODO  
  { name: "Dehydrated Logs", href: "/dehydrated" },       // TODO
  { name: "Style Guide", href: "/style-guide" }
]
```

## State Management Patterns

### Local State (useState)
- Component-specific UI state (open/closed, selected items)
- Form data and validation state
- Filter selections and search terms

### URL State (Next.js Router)
- Current page navigation
- Query parameters for filters/search

### Props Pattern
- Parent components pass data down to children
- Child components communicate up via callback props

## Cross-Component Relationships

### Shared Components
- **Sidebar**: Used by all main pages for navigation
- **MetricCard**: Used by dashboard and optimization pages
- **Button**: Used across multiple pages for actions
- **Dropdown**: Used for user actions and quick selections

### Data Dependencies
- Chart components depend on sample data (currently hardcoded)
- Form components manage their own validation state
- Status displays use consistent color mapping functions

## Configuration Files

### `tailwind.config.js`
- Defines the complete design system
- Custom colors, typography, spacing, shadows
- Plugin configurations for animations

### `next.config.ts`
- Standard Next.js configuration
- Currently minimal, room for optimization settings

### `tsconfig.json`
- Path mapping for clean imports (`@/*` → `./src/*`)
- Strict TypeScript configuration
- Modern JavaScript target (ES2017)

## Performance Considerations

### Current State
- Static site generation ready
- Tailwind CSS for optimized styling
- SVG icons for scalability
- Component-based architecture for code splitting potential

### Optimization Opportunities
- Implement React.memo for expensive components
- Add dynamic imports for large components (style-guide page)
- Optimize bundle size with tree shaking
- Add image optimization with Next.js Image component

## Security & Best Practices

### Current Implementation
- TypeScript for type safety
- ESLint for code quality
- No external API calls yet (all data is currently mock/static)
- Proper component prop typing

### Future Considerations
- Input validation for forms
- CSRF protection for API integration
- Content Security Policy headers
- Environment variable management

## Development Context for AI Assistants

### When Working on This Project
1. **Follow the established patterns** - consistent layout, component structure
2. **Use the design system** - refer to tailwind.config.js for colors and spacing
3. **Maintain TypeScript strictness** - always type props and state
4. **Responsive design** - mobile-first approach with Tailwind breakpoints
5. **Component reusability** - prefer composition over duplication

### Key Files to Reference
- `src/app/globals.css` - Design tokens and base styles
- `tailwind.config.js` - Complete design system configuration
- `src/components/ui/sidebar.tsx` - Navigation and layout patterns
- `src/components/ui/button.tsx` - Component variant patterns
- `src/lib/utils.ts` - Utility functions

### Current Limitations & TODOs
- No API integration yet (all data is mock)
- Missing destination, pipeline, and dehydrated pages
- Style guide page needs refactoring (1057 lines)
- No testing framework implemented
- No error boundaries or loading states

## Git Integration Notes
- Main branch: `main`
- Recent commits focus on UI improvements and optimization features
- Clean working directory maintained
- Ready for feature development

This documentation serves as both a comprehensive guide and context for AI assistants working on the Silen frontend codebase.