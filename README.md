# Silen Design System

A comprehensive design system for the Silen dashboard, inspired by the Wiz security platform's clean, professional aesthetic with Silen's purple brand identity.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to view the complete style guide.

## 🎨 Design Philosophy

This design system combines:

- **Wiz-inspired UI patterns**: Clean layouts, clear hierarchy, and professional aesthetics
- **Silen purple branding**: `#9D4EDD` as the primary brand color with complementary purples
- **Security dashboard focus**: Optimized for log management and security monitoring interfaces

## 📊 Key Features

### Color System
- **Primary Purple**: `#9D4EDD` (main brand)
- **Accent Purples**: Light (`#C77DFF`) and Dark (`#7B2CBF`)
- **Status Colors**: Red (Critical), Orange (High), Yellow (Medium), Green (Low)
- **Surface Colors**: White, Light Gray backgrounds for proper hierarchy

### Typography
- **Font**: Inter (Google Fonts)
- **Scale**: Display, Heading (XL-SM), Body (LG-SM), Caption
- **Features**: Optimized letter spacing, consistent line heights

### Components
- **Metric Cards**: Dashboard-style cards with trend indicators
- **Status Indicators**: Color-coded alerts with proper iconography
- **Buttons**: Primary, Secondary, Tertiary, and status variants
- **Form Elements**: Inputs, selects, checkboxes with purple focus states

### Data Visualization
- **Line Charts**: Trend analysis with purple theming
- **Area Charts**: Ingress/Egress data flow visualization
- **Pie Charts**: Issue distribution and proportional data
- **Dashboard Layouts**: Example layouts following Wiz patterns

## 🛠 Technical Stack

- **Framework**: Next.js 15+ with App Router
- **Styling**: Tailwind CSS with custom design tokens
- **Charts**: Recharts library
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and design tokens
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Style guide page
└── tailwind.config.ts       # Tailwind configuration with custom colors
```

## 🎯 Usage Guidelines

### Colors
- Use `bg-brand-primary` for primary actions and highlights
- Use status colors (`status-critical`, `status-high`, etc.) only for severity indicators
- Use surface colors (`surface-primary`, `surface-secondary`) for backgrounds

### Typography
- Use `text-display-*` for large numbers and metrics
- Use `text-heading-*` for section titles and card headers
- Use `text-body-*` for regular content
- Use `text-caption` for timestamps and metadata

### Components
- Follow the card-based layout pattern from Wiz
- Maintain consistent spacing with Tailwind's spacing scale
- Use proper shadows (`shadow-card`, `shadow-card-hover`) for depth

### Charts
- Always use purple color scheme for primary data
- Use status colors for categorical data (severity levels)
- Include legends and proper labeling
- Maintain clean, minimal axis styling

## 🔧 Customization

The design system is built with Tailwind CSS custom properties. To modify colors or spacing:

1. Edit `tailwind.config.ts` for design tokens
2. Update `globals.css` for custom CSS properties
3. Modify component styles in the main page component

## 📱 Responsive Design

All components are built mobile-first with responsive breakpoints:
- `sm:` - 640px and up
- `md:` - 768px and up  
- `lg:` - 1024px and up
- `xl:` - 1280px and up

## 🌟 Best Practices

1. **Consistency**: Always use the defined color palette and typography scale
2. **Accessibility**: Maintain proper contrast ratios and keyboard navigation
3. **Data Focus**: Prioritize clear data presentation over decorative elements
4. **White Space**: Use generous spacing to reduce visual clutter
5. **Performance**: Optimize for fast loading with Next.js best practices

## 🚧 Development

To extend the design system:

1. Add new components following the existing patterns
2. Use the established color and typography tokens
3. Test responsiveness across different screen sizes
4. Maintain accessibility standards
5. Document new patterns in the style guide

## 📄 License

This design system is proprietary to Silen.

---

**Version**: 1.0  
**Last Updated**: January 2025  
**Built with**: Next.js 15, Tailwind CSS, Recharts
