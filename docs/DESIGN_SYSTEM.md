# ActionsPane Design System

This document outlines the design system for ActionsPane, including typography, colors, and UI components.

## Typography

### Fonts

| Font Family | Usage | Example |
|-------------|-------|---------|
| Segoe UI Semibold | Headings, Labels, Emphasis | `font-family: "Segoe UI Semibold", "Segoe UI", sans-serif` |
| Segoe UI | Regular text | `font-family: "Segoe UI", sans-serif` |
| System Sans-Serif | Fallback | `font-family: sans-serif` |

### Text Sizes

| Size Class | Value | Usage |
|------------|-------|-------|
| text-xs | 0.75rem | Very small text, template descriptions, footnotes |
| text-sm | 0.875rem | Labels, secondary text, titles (with font-medium) |
| text-base | 1rem | Body text |
| text-lg | 1.125rem | Section headings |
| text-xl | 1.25rem | Panel headings |
| text-2xl | 1.5rem | Page headings |

### Font Weights

| Weight Class | Value | Usage |
|--------------|-------|-------|
| font-normal | 400 | Regular body text |
| font-medium | 500 | Emphasis, labels |
| font-semibold | 600 | Headings, important labels |
| font-bold | 700 | Strong emphasis |

## Colors

### Primary Colors

| Color Name | Hex Value | Usage |
|------------|-----------|-------|
| Primary Blue | #3b82f6 | Active states, buttons, toggles |
| Primary Gray | #d1d5db | Inactive states, backgrounds |

### Text Colors

| Color Name | Hex Value | Usage |
|------------|-----------|-------|
| Text Dark | #111827 (gray-900) | Primary text, headings |
| Text Medium | #374151 (gray-700) | Body text |
| Text Light | #6b7280 (gray-500) | Secondary text, labels |
| Text Disabled | #9ca3af (gray-400) | Disabled text |

### Background Colors

| Color Name | Hex Value | Usage |
|------------|-----------|-------|
| Background Light | #fafafa | Panel backgrounds |
| Background White | #ffffff | Main content background |
| Background Hover | #f3f4f6 (gray-100) | Hover states |

### Border Colors

| Color Name | Hex Value | Usage |
|------------|-----------|-------|
| Border Light | #e5e7eb (gray-200) | Panel borders, dividers |
| Border Medium | #d1d5db (gray-300) | Input borders |

## UI Components

### Toggles

Toggles use the Fluent UI Toggle component with custom styling:

```tsx
<Toggle
  checked={isEnabled}
  onChange={handleChange}
  inlineLabel
  onText=""
  offText=""
  styles={{
    root: { marginBottom: 0, marginTop: 0 },
    pill: { background: isEnabled ? '#3b82f6' : '#d1d5db' },
    thumb: { backgroundColor: 'white' }
  }}
/>
```

### Buttons

Primary buttons use blue background with white text:
```tsx
<button className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md">
  Button Text
</button>
```

Secondary buttons use gray background with dark text:
```tsx
<button className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-md">
  Button Text
</button>
```

### Panels

Panels use a light gray background with border:
```tsx
<div className="bg-[#fafafa] border-l border-gray-200 p-4">
  Panel content
</div>
```

## Usage Guidelines

1. Use Segoe UI Semibold for headings and important labels
2. Use the primary blue color for interactive elements and to indicate active states
3. Maintain consistent spacing with the padding and margin utilities
4. Use the appropriate text color based on hierarchy and importance
5. Follow the Fluent UI design language for component styling

## Implementation

When implementing new components or modifying existing ones, refer to this design system to ensure consistency across the application. For components not covered in this document, follow the established patterns and consult with the design team.

```tsx
// Example implementation of a labeled setting with toggle
<div className="flex items-center justify-between">
  <span 
    className="text-sm font-medium text-gray-900" 
    style={{ fontFamily: '"Segoe UI Semibold", "Segoe UI", sans-serif' }}
  >
    Setting Label
  </span>
  <Toggle
    checked={isEnabled}
    onChange={handleChange}
    inlineLabel
    onText=""
    offText=""
    styles={{
      root: { marginBottom: 0, marginTop: 0 },
      pill: { background: isEnabled ? '#3b82f6' : '#d1d5db' },
      thumb: { backgroundColor: 'white' }
    }}
  />
</div>
```
