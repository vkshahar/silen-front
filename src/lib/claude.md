# Lib Directory - Shared Utilities & Helpers

This directory contains shared utility functions, type definitions, and helper modules that can be used across the entire Silen frontend application.

## Directory Structure

```
lib/
└── utils.ts                           # Core utility functions
```

## Current Files

### `utils.ts` (5 lines)
**Purpose**: Core utility functions for class name management and common operations

**Main Function**: `cn()` - Class name utility combining clsx and tailwind-merge

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage Pattern**:
```typescript
// Conditional classes
cn("base-class", condition && "conditional-class")

// Merge conflicting Tailwind classes  
cn("p-4 px-6") // Results in "p-4 px-6" (px-6 overrides p-4's horizontal padding)

// Component prop className merging
cn("default-styles", className)
```

**Why This Utility is Important**:
1. **clsx**: Handles conditional class names elegantly
2. **tailwind-merge**: Resolves conflicting Tailwind classes properly
3. **Combined**: Provides the best of both worlds for dynamic styling

## Expanded Utility Structure (Recommended)

As the project grows, the lib directory should be expanded to include:

```
lib/
├── utils.ts                           # General utilities (current)
├── types.ts                           # Shared TypeScript interfaces
├── constants.ts                       # Application constants
├── api.ts                             # API client utilities (future)
├── validations.ts                     # Form validation schemas
├── formatters.ts                      # Data formatting utilities
├── colors.ts                          # Color utility functions
└── hooks.ts                          # Custom React hooks
```

## Utility Categories

### 1. Class Name Utilities (Current)

#### `cn()` Function
**Usage Examples**:
```typescript
// In component props
<div className={cn("bg-white rounded-lg", className)} />

// Conditional styling
<button className={cn(
  "px-4 py-2 rounded",
  isActive ? "bg-blue-500 text-white" : "bg-gray-100",
  isDisabled && "opacity-50 cursor-not-allowed"
)} />

// Variant-based styling (with CVA)
<div className={cn(buttonVariants({ variant, size }), className)} />
```

### 2. Type Definitions (Recommended Addition)

```typescript
// lib/types.ts
export interface LogSource {
  id: string
  name: string
  type: 'Syslog' | 'API' | 'Database' | 'File'
  status: 'Connected' | 'Disconnected' | 'Error'
  volume: string
  lastSeen: string
  endpoint?: string
}

export interface OptimizationStrategy {
  id: string
  title: string
  description: string
  source: string
  potentialSavings: string
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low'
  type: 'compression' | 'filtering' | 'sampling'
}

export interface MetricData {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
}
```

### 3. Constants (Recommended Addition)

```typescript
// lib/constants.ts
export const RISK_LEVELS = {
  CRITICAL: 'Critical',
  HIGH: 'High', 
  MEDIUM: 'Medium',
  LOW: 'Low'
} as const

export const SOURCE_TYPES = {
  SYSLOG: 'Syslog',
  API: 'API',
  DATABASE: 'Database',
  FILE: 'File'
} as const

export const STATUS_OPTIONS = {
  CONNECTED: 'Connected',
  DISCONNECTED: 'Disconnected',
  ERROR: 'Error'
} as const

export const ROUTES = {
  DASHBOARD: '/',
  SOURCE: '/source',
  OPTIMIZATION: '/optimization',
  FILTERS: '/filters',
  STYLE_GUIDE: '/style-guide'
} as const
```

### 4. Data Formatters (Recommended Addition)

```typescript
// lib/formatters.ts
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`
}

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  if (hours > 0) return `${hours}h ${minutes}m`
  if (minutes > 0) return `${minutes}m ${secs}s`
  return `${secs}s`
}
```

### 5. Color Utilities (Recommended Addition)

```typescript
// lib/colors.ts
export const getRiskColor = (risk: string): string => {
  const riskLower = risk.toLowerCase()
  
  if (riskLower.includes('critical')) return 'red'
  if (riskLower.includes('high')) return 'orange'
  if (riskLower.includes('medium')) return 'yellow'
  if (riskLower.includes('low')) return 'green'
  
  return 'gray'
}

export const getRiskColorClasses = (risk: string): string => {
  const color = getRiskColor(risk)
  
  const colorMap = {
    red: 'bg-red-50 text-red-700 border-red-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200'
  }
  
  return colorMap[color as keyof typeof colorMap]
}

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'connected': return 'green'
    case 'disconnected': return 'yellow'
    case 'error': return 'red'
    default: return 'gray'
  }
}
```

### 6. Validation Utilities (Recommended Addition)

```typescript
// lib/validations.ts
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const validateLogSourceName = (name: string): string | null => {
  if (!name.trim()) return 'Name is required'
  if (name.length < 3) return 'Name must be at least 3 characters'
  if (name.length > 50) return 'Name must be less than 50 characters'
  return null
}
```

### 7. Custom Hooks (Recommended Addition)

```typescript
// lib/hooks.ts
import { useState, useEffect } from 'react'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  return [storedValue, setValue] as const
}

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
```

## Current Usage Patterns

The `cn()` utility is currently used extensively throughout the component library:

### In Component Props
```typescript
// components/ui/button.tsx
<button className={cn(buttonVariants({ variant, size }), className)} />

// components/ui/card.tsx  
<div className={cn("rounded-lg border bg-card", className)} />
```

### In Conditional Styling
```typescript
// components/ui/selector-chips.tsx
<div className={cn(
  "px-3 py-1 rounded-full text-sm font-medium transition-all",
  isSelected ? "text-white" : "text-gray-700"
)} />
```

### With CVA (Class Variance Authority)
```typescript
// components/ui/button.tsx
const buttonVariants = cva(baseStyles, { variants: {...} })

// Usage with cn for additional classes
<button className={cn(buttonVariants({ variant }), "additional-class")} />
```

## Integration Points

### With Components
Every UI component uses the `cn()` utility for flexible styling:
- Merging default styles with custom className props
- Handling conditional classes based on state
- Resolving Tailwind class conflicts

### With Tailwind CSS
The utility integrates perfectly with Tailwind's utility-first approach:
- Prevents duplicate/conflicting utilities  
- Maintains proper specificity
- Enables component composition

### With TypeScript
All utilities maintain strict TypeScript support:
- Proper type inference
- Interface definitions for complex types
- Generic utility functions where appropriate

## Best Practices

### 1. Keep Utilities Pure
Functions should be side-effect free and predictable:
```typescript
// Good - pure function
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

// Avoid - side effects
export const logAndFormat = (amount: number): string => {
  console.log(amount) // Side effect
  return formatCurrency(amount)
}
```

### 2. Use TypeScript Generics
Make utilities reusable with proper typing:
```typescript
// Good - generic utility
export const groupBy = <T, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key])
    groups[groupKey] = groups[groupKey] || []
    groups[groupKey].push(item)
    return groups
  }, {} as Record<string, T[]>)
}
```

### 3. Export Named Functions
Prefer named exports for better tree-shaking:
```typescript
// Good
export const validateEmail = (email: string) => { /* ... */ }
export const formatDate = (date: Date) => { /* ... */ }

// Less optimal
export default {
  validateEmail: (email: string) => { /* ... */ },
  formatDate: (date: Date) => { /* ... */ }
}
```

## Future Expansion

As the Silen project grows, the lib directory should expand to include:

1. **API Client**: HTTP client configuration and utilities
2. **Cache Management**: Client-side caching strategies  
3. **Error Handling**: Centralized error processing
4. **Feature Flags**: Configuration for A/B testing
5. **Analytics**: Event tracking utilities
6. **Performance**: Monitoring and optimization helpers

The current foundation with the `cn()` utility provides an excellent starting point for this expansion while maintaining the clean, functional approach that makes utilities easy to test and maintain.