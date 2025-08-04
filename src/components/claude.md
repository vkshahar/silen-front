# Components Directory - UI Component Library

This directory houses the reusable UI component library for the Silen frontend application, built with a design system approach using Tailwind CSS and Radix UI primitives.

## Directory Structure

```
components/
└── ui/                                 # UI component library
    ├── add-source-drawer.tsx           # Modal drawer for adding log sources
    ├── area-charts-2.tsx               # Chart utility components  
    ├── button.tsx                      # Button with variants (CVA)
    ├── card.tsx                        # Card container component
    ├── dropdown-menu-demo.tsx          # Dropdown menu components
    ├── ingress-egress-chart.tsx        # Network traffic chart
    ├── metric-card.tsx                 # Dashboard metric display
    ├── selector-chips.tsx              # Filter selection chips
    ├── sidebar.tsx                     # Main navigation sidebar
    └── simple-flow-chart.tsx           # Flow diagram visualization
```

## Component Categories

### 1. Layout Components
Components that structure page layouts and navigation.

### 2. Data Display Components  
Components for presenting data, metrics, and visualizations.

### 3. Interactive Components
Components for user interactions, forms, and controls.

### 4. Overlay Components
Modals, drawers, and other overlay interfaces.

## Component Documentation

### Layout Components

#### `sidebar.tsx` (289 lines)
**Purpose**: Main navigation sidebar with collapsible functionality

**Key Features**:
- Collapsible sidebar with animation
- Active route highlighting  
- User profile section at bottom
- Responsive behavior

**Props Interface**:
```typescript
// Internal navigation item structure
interface NavigationItem {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}
```

**State Management**:
```typescript
const [isCollapsed, setIsCollapsed] = useState(false)
const [activeItem, setActiveItem] = useState("dashboard")
```

**Navigation Items**:
- Dashboard (/)
- Source Management (/source)
- Optimization Initiatives (/optimization)
- Filter Management (/filters)
- Destination Management (/destination) - TODO
- Pipeline Manager (/pipeline) - TODO
- Dehydrated Logs (/dehydrated) - TODO
- Style Guide (/style-guide)

**Usage Pattern**:
```tsx
// Used in all main pages
<div className="flex min-h-screen">
  <Sidebar />
  <main>{/* Page content */}</main>
</div>
```

### Data Display Components

#### `metric-card.tsx` (56 lines)
**Purpose**: Displays key metrics with optional trend indicators

**Props Interface**:
```typescript
export interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon?: LucideIcon
  subtitle?: string
}
```

**Features**:
- Trend indicators with color coding
- Optional icons from Lucide React
- Consistent spacing and typography
- Responsive design

**Usage Examples**:
```tsx
<MetricCard
  title="Current Log Volume"
  value="2.3 TB"
  change="+12.5%"
  changeType="positive"
  icon={Database}
/>
```

#### `ingress-egress-chart.tsx` (187 lines)
**Purpose**: Visualizes network traffic data with area charts

**Key Features**:
- Dual-axis area chart for ingress/egress data
- Responsive design with Recharts
- Custom color scheme matching brand
- Interactive tooltips and legends

**Data Structure Expected**:
```typescript
interface ChartDataPoint {
  name: string        // Time period label
  ingress: number     // Ingress volume
  egress: number      // Egress volume
}
```

**Chart Configuration**:
- Ingress: Red/pink color scheme
- Egress: Green color scheme
- Responsive container with aspect ratio
- Custom styled tooltips

#### `simple-flow-chart.tsx` (405 lines)
**Purpose**: Displays process flow diagrams for log processing

**Key Features**:
- Multi-stage flow visualization
- Source expansion/collapse functionality
- Volume reduction calculations
- Interactive elements

**Components**:
- Source nodes with expandable details
- Process stages with metrics
- Connection lines and flow indicators
- Volume reduction summaries

### Interactive Components

#### `button.tsx` (55 lines)
**Purpose**: Comprehensive button component with variants using CVA

**Variants Available**:
```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-brand-primary text-white hover:bg-brand-dark",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        outline: "border border-slate-300 bg-transparent hover:bg-slate-50",
        ghost: "hover:bg-slate-100",
        link: "text-brand-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    }
  }
)
```

**Props Interface**:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean  // Radix UI Slot integration
}
```

#### `selector-chips.tsx` (145 lines)
**Purpose**: Multi-select filter chips with animations

**Key Features**:
- Risk level filtering (Critical, High, Medium, Low)
- Color-coded selection states
- Framer Motion animations
- Count displays for each category

**Props Interface**:
```typescript
interface SelectorChipsProps {
  options: Array<{ label: string; count: number }>
  selectedOptions: string[]
  onSelectionChange: (selected: string[]) => void
  multiSelect?: boolean
}
```

**Color Mapping**:
- Critical: Red (#dc2626)
- High: Orange (#ea580c)  
- Medium: Yellow (#ca8a04)
- Low: Green (#16a34a)

#### `dropdown-menu-demo.tsx` (146 lines)
**Purpose**: Various dropdown menu implementations

**Components Exported**:
- `QuickActionsDropdown` - Bulk operations menu
- `UserProfileDropdown` - User account menu
- `ActionsDropdown` - Generic actions menu
- `SimpleDropdown` - Basic dropdown implementation

**Common Features**:
- Radix UI primitives for accessibility
- Consistent styling with Tailwind
- Keyboard navigation support
- Icon integration with Lucide React

### Container Components

#### `card.tsx` (146 lines)
**Purpose**: Flexible card container with variants

**Variants Using CVA**:
```typescript
const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-border",
        elevated: "shadow-md"
      }
    }
  }
)
```

**Sub-components**:
- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardDescription` - Subtitle text  
- `CardContent` - Main content area
- `CardFooter` - Footer section

### Overlay Components

#### `add-source-drawer.tsx` (347 lines)
**Purpose**: Modal drawer for adding new log sources

**Key Features**:
- Slide-out drawer animation
- Multi-step form interface
- Source type selection
- Validation and error handling
- Integration test capabilities

**Form Fields**:
- Source name and description
- Source type (Syslog, API, Database, etc.)
- Connection details (endpoint, credentials)
- Configuration options
- Test connection functionality

**State Management**:
```typescript
const [isOpen, setIsOpen] = useState(false)
const [currentStep, setCurrentStep] = useState(1)
const [formData, setFormData] = useState({
  name: '',
  type: '',
  endpoint: '',
  // ... other fields
})
```

### Utility Components

#### `area-charts-2.tsx` (289 lines)
**Purpose**: Reusable chart components and utilities

**Components Provided**:
- Area chart configurations
- Chart styling utilities
- Data formatting helpers
- Responsive chart containers

**Integration**: Used by other chart components like `ingress-egress-chart.tsx`

## Component Development Patterns

### Standard Component Structure
```typescript
"use client" // If client features needed

import React from 'react'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface ComponentProps {
  // TypeScript interface for props
  className?: string
  children?: React.ReactNode
}

export function ComponentName({ className, ...props }: ComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      {/* Component content */}
    </div>
  )
}
```

### CVA Pattern for Variants
```typescript
import { cva, VariantProps } from 'class-variance-authority'

const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-styles",
        secondary: "secondary-styles"
      },
      size: {
        sm: "small-styles",
        lg: "large-styles"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "sm"
    }
  }
)

interface ComponentProps extends VariantProps<typeof componentVariants> {
  // Additional props
}
```

### Radix UI Integration Pattern
```typescript
import * as RadixComponent from '@radix-ui/react-component'

export function Component({ ...props }) {
  return (
    <RadixComponent.Root>
      <RadixComponent.Trigger />
      <RadixComponent.Content>
        {/* Content */}
      </RadixComponent.Content>
    </RadixComponent.Root>
  )
}
```

## Styling Approach

### Design System Integration
All components use consistent design tokens from the Tailwind configuration:

**Colors**:
- Brand: `bg-brand-primary`, `text-brand-primary`
- Status: `bg-red-50`, `text-red-700`, etc.
- Surface: `bg-white`, `bg-surface-secondary`

**Spacing**: `space-y-4`, `p-6`, `px-4 py-2`
**Typography**: `text-xl font-bold`, `text-sm text-slate-600`
**Borders**: `border border-slate-200`, `rounded-lg`

### Responsive Design
Components use Tailwind's responsive prefixes:
- `sm:`, `md:`, `lg:`, `xl:` breakpoints
- Mobile-first approach
- Flexible layouts with Grid and Flexbox

## Dependencies

### External Dependencies
- **@radix-ui/react-slot**: Polymorphic component support
- **class-variance-authority**: Variant management
- **clsx**: Conditional class names  
- **framer-motion**: Smooth animations
- **lucide-react**: Icon library
- **recharts**: Chart library

### Internal Dependencies
- **@/lib/utils**: `cn` utility for class merging
- **Next.js hooks**: `useRouter`, `usePathname`
- **React hooks**: `useState`, `useEffect`, `useMemo`

## Component Relationships

### High Usage Components (Used by Multiple Pages)
- `Sidebar` - All main pages
- `MetricCard` - Dashboard and optimization pages
- `Button` - Most interactive pages

### Specialized Components (Single Use)
- `AddSourceDrawer` - Only source management page
- `SelectorChips` - Only optimization page
- `SimpleFlowChart` - Only dashboard page

### Utility Components (Support Others)
- `area-charts-2.tsx` - Supports chart components
- `card.tsx` - Used by metric-card and others

## Performance Considerations

### Current State
- No React.memo implementation yet
- Some large components (simple-flow-chart: 405 lines)
- Efficient re-rendering patterns mostly followed

### Optimization Opportunities
- Add React.memo for expensive components
- Break down large components into smaller pieces
- Implement proper loading states
- Add error boundaries

## Testing Strategy (Future)

### Component Testing Approach
```typescript
// Example test structure
describe('MetricCard', () => {
  it('displays metric data correctly', () => {
    // Test rendering with props
  })
  
  it('shows trend indicators appropriately', () => {
    // Test conditional rendering
  })
})
```

### Integration Testing
- Test component interactions
- Test state management
- Test API integration (when added)

This component library provides a solid foundation for the Silen dashboard with consistent styling, proper TypeScript support, and modern React patterns throughout.