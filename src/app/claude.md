# App Directory - Next.js 15 App Router Pages

This directory contains all the pages and layouts for the Silen frontend application using Next.js 15's App Router architecture.

## Directory Structure

```
app/
├── favicon.ico                 # Site favicon
├── globals.css                 # Global styles and design tokens
├── layout.tsx                  # Root layout component
├── page.tsx                    # Dashboard homepage (/)
├── filters/
│   └── page.tsx               # Filter management (/filters)
├── optimization/
│   └── page.tsx               # Optimization initiatives (/optimization)
├── source/
│   └── page.tsx               # Source management (/source)
└── style-guide/
    └── page.tsx               # Design system guide (/style-guide)
```

## Routing Structure

Next.js 15 App Router automatically creates routes based on folder structure:

| Route | File | Purpose |
|-------|------|---------|
| `/` | `page.tsx` | Main dashboard with metrics and log sources |
| `/optimization` | `optimization/page.tsx` | Optimization strategies and initiatives |
| `/source` | `source/page.tsx` | Log source management (CRUD operations) |
| `/filters` | `filters/page.tsx` | Active filter management |
| `/style-guide` | `style-guide/page.tsx` | Component library and design system |

## Core Files

### `layout.tsx` - Root Layout
**Purpose**: Defines the base HTML structure and global configurations

**Key Features**:
- Font configuration (Inter from Google Fonts)
- Global metadata (title, description)
- HTML lang attribute
- Root styling classes

```typescript
// Key structure
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
```

**Dependencies**: Next.js fonts, global CSS

### `globals.css` - Global Styles & Design Tokens
**Purpose**: Contains Tailwind CSS imports, CSS custom properties, and global styles

**Key Sections**:
1. **Tailwind Imports**: Base, components, utilities
2. **CSS Custom Properties**: Color definitions for light/dark themes
3. **Global Styles**: Base typography, focus states
4. **Design Tokens**: Surface colors, text colors

**Critical Variables**:
```css
:root {
  --background: 255 255 255;
  --foreground: 15 23 42;
  --brand-primary: 157 78 221;    /* #9D4EDD */
  --surface-secondary: 248 250 252;
}
```

### `page.tsx` - Dashboard Homepage
**Purpose**: Main dashboard displaying security metrics, charts, and log source overview

**Key Components Used**:
- `Sidebar` - Main navigation
- `MetricCard` - Key metrics display  
- `IngressEgressChart` - Network traffic visualization
- `SimpleFlowChart` - Process flow diagram

**Data Displayed**:
- Log volume metrics (Current: 2.3 TB, Reduced: 720 GB)
- Event count and compression metrics
- Log source table with status indicators
- Network ingress/egress charts

**Layout Pattern**:
```tsx
<div className="flex min-h-screen bg-surface-secondary">
  <Sidebar />
  <div className="flex-1">
    <header>...</header>
    <main>
      {/* Metrics grid */}
      {/* Charts section */}
      {/* Log sources table */}
    </main>
  </div>
</div>
```

## Individual Pages

### `/optimization` - Optimization Initiatives
**File**: `optimization/page.tsx` (346 lines)

**Purpose**: Displays available optimization strategies and allows users to apply them

**Key Features**:
- Risk level filtering with selector chips
- Optimization cards showing potential savings
- Apply/Smart Compression buttons
- Metrics overview

**Components Used**:
- `SelectorChips` - Risk level filters
- `MetricCard` - Summary statistics
- `QuickActionsDropdown` - Bulk actions
- Custom optimization cards

**State Management**:
```typescript
const [selectedRisks, setSelectedRisks] = useState<string[]>([])
// Filtered optimization cards based on risk selection
const filteredCards = useMemo(() => { /* filtering logic */ }, [selectedRisks])
```

### `/source` - Source Management  
**File**: `source/page.tsx` (205 lines)

**Purpose**: CRUD interface for managing log sources and destinations

**Key Features**:
- Add new sources via drawer component
- Source/destination tables with status indicators
- Edit and delete operations
- Source type categorization

**Components Used**:
- `AddSourceDrawer` - Modal for adding sources
- Custom data tables
- Status badge components

**Data Structure**:
```typescript
interface LogSource {
  name: string
  type: string
  status: "Connected" | "Disconnected" | "Error"
  volume: string
  lastSeen: string
}
```

### `/filters` - Filter Management
**File**: `filters/page.tsx` (158 lines)

**Purpose**: Manage active optimization filters and their status

**Key Features**:
- Toggle active filters on/off
- Filter status indicators
- Volume impact display
- Filter type categorization

**Components Used**:
- Toggle switches for filter activation
- Status indicators
- Custom filter cards

### `/style-guide` - Design System Documentation
**File**: `style-guide/page.tsx` (1057 lines) ⚠️ **NEEDS REFACTORING**

**Purpose**: Comprehensive showcase of the design system and all UI components

**Sections Include**:
1. Color palette demonstration
2. Typography examples
3. Button variants and states
4. Form components
5. Chart examples
6. Layout components
7. Interactive elements

**Major Issue**: This file is extremely large and should be broken into smaller components

**Components Demonstrated**:
- All button variants and sizes
- Color swatches with hex codes
- Typography scale examples
- Chart components with sample data
- Dropdown menu variations
- Form input examples

## Page Development Patterns

### Standard Page Structure
Every page follows this consistent pattern:

```typescript
"use client"

import { Sidebar } from "@/components/ui/sidebar"
// Other component imports

export default function PageName() {
  return (
    <div className="flex min-h-screen bg-surface-secondary">
      <Sidebar />
      <div className="flex-1 transition-all duration-300 ease-in-out">
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-900">Page Title</h1>
            <p className="text-slate-600 mt-1">Page description</p>
          </div>
        </header>
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page content */}
          </div>
        </main>
      </div>
    </div>
  )
}
```

### Common Styling Patterns

**Page Headers**:
```tsx
<header className="bg-white border-b border-slate-200 px-6 py-4">
  <div className="max-w-7xl mx-auto">
    <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
    <p className="text-slate-600 mt-1">{description}</p>
  </div>
</header>
```

**Main Content Area**:
```tsx
<main className="px-6 py-8">
  <div className="max-w-7xl mx-auto space-y-8">
    {/* Content with consistent spacing */}
  </div>
</main>
```

**Card Layouts**:
```tsx
<div className="bg-white rounded-xl border border-slate-200 p-6">
  {/* Card content */}
</div>
```

## Data Management Patterns

### Static Data (Current State)
All pages currently use hardcoded/mock data:

```typescript
// Example from dashboard
const logSources = [
  { name: "Web Server Logs", type: "Apache", status: "Connected", volume: "450 GB" },
  { name: "Database Logs", type: "MySQL", status: "Connected", volume: "280 GB" },
  // ... more static data
]
```

### State Management
Pages use local React state:

```typescript
// Common patterns across pages
const [isLoading, setIsLoading] = useState(false)
const [selectedItems, setSelectedItems] = useState<string[]>([])
const [filterCriteria, setFilterCriteria] = useState("")
```

### Navigation Integration
Pages integrate with Next.js router:

```typescript
import { useRouter, usePathname } from 'next/navigation'

const router = useRouter()
const pathname = usePathname()

// Programmatic navigation
const handleNavigate = () => router.push('/optimization')
```

## Missing Pages (TODOs)

The navigation includes links to pages that don't exist yet:

1. **`/destination`** - Destination Management (referenced in sidebar)
2. **`/pipeline`** - Pipeline Manager (referenced in sidebar)  
3. **`/dehydrated`** - Dehydrated Logs (referenced in sidebar)

These would follow the same structural patterns as existing pages.

## Performance Considerations

### Current Issues
- **Style guide page is too large** (1057 lines) - impacts bundle size
- No code splitting implemented yet
- Static data means no loading states needed currently

### Optimization Opportunities
- Break down large components
- Implement dynamic imports for heavy pages
- Add React.memo for expensive re-renders
- Implement proper loading states for future API integration

## Accessibility & SEO

### Current State
- Semantic HTML structure in place
- Proper heading hierarchy (h1, h2, h3)
- Alt text would be needed for images when added
- Focus management basic but functional

### Metadata
Currently handled in root layout, but page-specific metadata could be added:

```typescript
// Future pattern for page metadata
export const metadata: Metadata = {
  title: 'Optimization Initiatives | Silen',
  description: 'Manage log volume reduction strategies'
}
```

## Development Guidelines

### Adding New Pages
1. Create directory in `app/`
2. Create `page.tsx` with default export
3. Follow the standard layout pattern
4. Import necessary UI components
5. Add navigation link to sidebar if needed

### Modifying Existing Pages  
1. Maintain the consistent layout structure
2. Follow established component patterns
3. Use TypeScript interfaces for data
4. Keep components focused and small
5. Consider extracting large components

### Testing Considerations
Currently no testing framework, but future tests should:
- Test page rendering
- Test navigation behavior
- Test component interactions
- Mock external dependencies

This app directory structure provides a solid foundation for the Silen dashboard with clear separation of concerns and consistent patterns across all pages.