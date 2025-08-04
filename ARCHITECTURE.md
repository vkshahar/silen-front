# Silen Frontend Architecture & Key Relationships

This document provides a comprehensive overview of the Silen frontend architecture, component relationships, data flow patterns, and key project elements that AI assistants should understand when working on this codebase.

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Silen Frontend                          │
│                  (Next.js 15 + React 19)                   │
├─────────────────────────────────────────────────────────────┤
│  App Router Pages           │  UI Component Library          │
│  ┌─────────────────────────┐│  ┌─────────────────────────┐  │
│  │ • Dashboard (/)         ││  │ • Layout (Sidebar)      │  │
│  │ • Optimization          ││  │ • Data Display          │  │
│  │ • Source Management     ││  │ • Interactive Elements │  │
│  │ • Filter Management     ││  │ • Overlay Components    │  │
│  │ • Style Guide           ││  │ • Chart Visualizations │  │
│  └─────────────────────────┘│  └─────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│              Shared Utilities & Design System               │
│  ┌─────────────────────┐    ┌─────────────────────────────┐ │
│  │ • Class utilities   │    │ • Tailwind configuration   │ │
│  │ • Type definitions  │    │ • Design tokens           │ │
│  │ • Constants         │    │ • Component variants       │ │
│  └─────────────────────┘    └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Component Dependency Graph

### High-Level Component Relationships

```
Root Layout (app/layout.tsx)
│
├── Dashboard Page (app/page.tsx)
│   ├── Sidebar
│   ├── MetricCard (×4)
│   ├── IngressEgressChart
│   └── SimpleFlowChart
│
├── Optimization Page (app/optimization/page.tsx)
│   ├── Sidebar
│   ├── MetricCard (×3)
│   ├── SelectorChips
│   ├── QuickActionsDropdown
│   └── Button (×N)
│
├── Source Management Page (app/source/page.tsx)
│   ├── Sidebar
│   ├── Button
│   └── AddSourceDrawer
│
├── Filter Management Page (app/filters/page.tsx)
│   └── Sidebar
│
└── Style Guide Page (app/style-guide/page.tsx)
    ├── IngressEgressChart
    └── QuickActionsDropdown
```

### Component Usage Matrix

| Component | Dashboard | Optimization | Source | Filters | Style Guide |
|-----------|-----------|--------------|--------|---------|-------------|
| Sidebar | ✓ | ✓ | ✓ | ✓ | - |
| MetricCard | ✓ | ✓ | - | - | - |
| Button | - | ✓ | ✓ | - | ✓ |
| IngressEgressChart | ✓ | - | - | - | ✓ |
| SelectorChips | - | ✓ | - | - | - |
| AddSourceDrawer | - | - | ✓ | - | - |
| SimpleFlowChart | ✓ | - | - | - | - |
| QuickActionsDropdown | - | ✓ | - | - | ✓ |

## Data Flow Architecture

### Current State (Static Data)

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Page Level    │    │  Component      │    │  Presentation   │
│   Static Data   │───▶│  Local State    │───▶│   Layer         │
│                 │    │  (useState)     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Future State (API Integration)

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Layer     │    │  State          │    │  Component      │
│   (Future)      │───▶│  Management     │───▶│  Rendering      │
│                 │    │  (React Query?) │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Key Data Structures

### 1. Log Sources
```typescript
interface LogSource {
  name: string
  type: 'Syslog' | 'API' | 'Database' | 'File' | 'Cloud'
  status: 'Connected' | 'Disconnected' | 'Error'
  volume: string
  lastSeen: string
  endpoint?: string
  events?: number
  sources?: number
}
```

**Used By**: Dashboard table, Source management, AddSourceDrawer

### 2. Optimization Strategies
```typescript
interface OptimizationCard {
  id: string
  title: string
  description: string
  source: string
  volume: string
  potentialSavings: string
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low'
  type: 'Smart Compression' | 'Noise Reduction' | 'Field Extraction'
  applied?: boolean
}
```

**Used By**: Optimization page, SelectorChips filtering

### 3. Metrics Data
```typescript
interface MetricData {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon?: LucideIcon
  subtitle?: string
}
```

**Used By**: MetricCard component, Dashboard metrics, Optimization metrics

### 4. Chart Data Points
```typescript
interface ChartDataPoint {
  name: string        // Time period
  ingress?: number    // Incoming data volume
  egress?: number     // Outgoing data volume
  value?: number      // Generic metric value
}
```

**Used By**: IngressEgressChart, area-charts-2, SimpleFlowChart

## Design System Architecture

### Color System Hierarchy
```
Brand Colors (Primary Design Language)
├── Primary: #9D4EDD (Silen Purple)
├── Light: #C77DFF 
└── Dark: #7B2CBF

Status Colors (Functional Communication)
├── Critical: #dc2626 (Red)
├── High: #ea580c (Orange)  
├── Medium: #ca8a04 (Yellow)
└── Low: #16a34a (Green)

Surface Colors (Layout & Structure)
├── Background: #f8fafc
├── Surface: #ffffff
├── Border: #e2e8f0
└── Text: #0f172a
```

### Typography Scale
```
Display Scale (Metrics & Headers)
├── Display: 48px (Large metrics)
├── XL: 36px (Page titles)
├── LG: 30px (Section headers)
├── MD: 24px (Subsection headers)
└── SM: 20px (Component headers)

Body Scale (Content & Interface)
├── LG: 18px (Prominent content)
├── MD: 16px (Default body text)
├── SM: 14px (Secondary text)
└── Caption: 12px (Metadata)
```

### Component Variant System (CVA)
```
Button Variants
├── Variant: default | secondary | outline | ghost | link
├── Size: sm | default | lg | icon
└── State: default | hover | focus | disabled

Card Variants  
├── Variant: default | elevated
├── Padding: default | compact | spacious
└── Border: default | none | thick
```

## Navigation & Routing Architecture

### Route Structure
```
/ (Dashboard)
├── /optimization (Optimization Initiatives)
├── /source (Source Management)
├── /filters (Filter Management)
├── /style-guide (Design System)
└── [Future Routes]
    ├── /destination (Destination Management)
    ├── /pipeline (Pipeline Manager)
    └── /dehydrated (Dehydrated Logs)
```

### Navigation State Management
```typescript
// Sidebar component manages navigation state
const [activeItem, setActiveItem] = useState("dashboard")
const pathname = usePathname() // Next.js hook

// Navigation items configuration
const navigationItems: NavigationItem[] = [
  { id: "dashboard", name: "Log Size Reduction Dashboard", href: "/" },
  { id: "source", name: "Source Management", href: "/source" },
  // ... more items
]
```

## State Management Patterns

### 1. Local Component State
**Pattern**: `useState` for component-specific UI state
**Examples**:
- Drawer open/close state
- Form input values
- Selection states
- Loading indicators

### 2. Computed State  
**Pattern**: `useMemo` for derived data
**Examples**:
- Filtered lists based on criteria
- Calculated metrics
- Sorted data structures

### 3. URL State
**Pattern**: Next.js router for navigation state
**Examples**:
- Current page/route
- Query parameters (future)
- Deep linking support

### 4. Props-Based State
**Pattern**: Parent → Child data flow
**Examples**:
- MetricCard receiving data from pages
- Sidebar receiving navigation configuration
- Charts receiving data points

## Integration Points & Dependencies

### External Library Integration

#### Radix UI (Accessibility Primitives)
```
Used For: Accessible component foundations
Components: Button (Slot), Select, Avatar (removed)
Pattern: Headless UI with custom styling
```

#### Recharts (Data Visualization)
```
Used For: Chart rendering and interactions
Components: IngressEgressChart, area-charts-2
Data Flow: Static data → Chart configuration → Rendered visualization
```

#### Framer Motion (Animations)
```
Used For: Smooth transitions and micro-interactions
Components: SelectorChips, AddSourceDrawer
Pattern: spring animations, layout animations
```

#### Lucide React (Icons)
```
Used For: Consistent iconography
Usage: Import specific icons, standardized sizing
Pattern: Import → Component prop → Render with className
```

### Internal Integration Points

#### Tailwind CSS Configuration
```
Location: tailwind.config.js
Impact: Affects all component styling
Dependencies: All components rely on design tokens
```

#### TypeScript Configuration  
```
Location: tsconfig.json
Impact: Path mapping (@/* aliases), strict typing
Dependencies: All imports use @ aliases
```

#### Utils Library
```
Location: src/lib/utils.ts
Function: cn() class name utility
Usage: Every component uses for conditional styling
```

## Performance Architecture

### Current Optimization Strategies
1. **Static Site Generation**: Next.js optimized builds
2. **Component Composition**: Reusable component patterns
3. **Tailwind Purging**: Unused CSS removal
4. **SVG Icons**: Scalable vector graphics
5. **TypeScript**: Compile-time optimizations

### Optimization Opportunities
1. **Code Splitting**: Dynamic imports for large components
2. **React.memo**: Prevent unnecessary re-renders
3. **Virtual Scrolling**: For large data tables
4. **Image Optimization**: Next.js Image component
5. **Bundle Analysis**: Webpack bundle analyzer

## Error Handling Architecture

### Current State (Minimal)
- TypeScript compile-time error prevention
- Basic form validation in AddSourceDrawer
- Next.js default error boundaries

### Recommended Enhancements
```typescript
// Error Boundary Component
class ErrorBoundary extends React.Component {
  // Catch JavaScript errors anywhere in child tree
}

// Form Validation
const validateForm = (data: FormData): ValidationErrors => {
  // Centralized validation logic
}

// API Error Handling (Future)
const handleApiError = (error: ApiError): UserFriendlyMessage => {
  // Transform API errors to user messages
}
```

## Testing Architecture (Future Implementation)

### Recommended Testing Strategy
```
Unit Tests (Components)
├── Component rendering
├── Props handling  
├── User interactions
└── State changes

Integration Tests (Features)
├── Page navigation
├── Form submissions
├── Data flow
└── API interactions

E2E Tests (User Journeys)
├── Complete user workflows
├── Cross-browser compatibility
├── Performance metrics
└── Accessibility compliance
```

## Deployment & Build Architecture

### Current Build Process
```
Development: npm run dev (Next.js dev server)
Production Build: npm run build (Static generation)
Linting: npm run lint (ESLint + TypeScript)
```

### Build Artifacts
```
.next/ (Build output)
out/ (Static export - if configured)
node_modules/ (Dependencies)
```

## Security Considerations

### Current Security Measures
- TypeScript for type safety
- ESLint for code quality
- No external API calls (yet)
- Sanitized user inputs (minimal)

### Future Security Enhancements
- Input validation and sanitization
- CSRF protection for API calls
- Content Security Policy headers
- Environment variable management
- Authentication/authorization patterns

## Maintenance & Development Workflows

### Code Organization Principles
1. **Separation of Concerns**: Pages, components, utilities clearly separated
2. **Single Responsibility**: Each component has one clear purpose
3. **Composition over Inheritance**: Prefer component composition
4. **Consistent Patterns**: Standardized component structures
5. **Type Safety**: Full TypeScript coverage

### Development Best Practices
1. **Import Organization**: Group imports logically
2. **Component Structure**: Interface → Component → Export
3. **Styling Approach**: Tailwind utilities with design system
4. **State Management**: Prefer local state, lift up when needed
5. **Performance**: Consider React.memo for expensive components

This architecture documentation serves as a comprehensive guide for understanding the Silen frontend codebase structure, relationships, and patterns that should be followed when extending or maintaining the application.