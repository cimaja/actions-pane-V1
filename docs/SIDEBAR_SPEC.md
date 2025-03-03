# ActionsPane Sidebar Specification

## Overview
This document outlines the specifications for the ActionsPane sidebar component, which serves as the primary navigation and action selection interface for the application. The sidebar provides access to various action categories, templates, and library items, allowing users to efficiently browse, search, and use actions in their workflows.

## Core Components

### Navigation Rail
- **Position**: Left-most column, fixed width (56px)
- **Content**: Main navigation icons and bottom utility icons
- **Visual Style**: Modern gradient background with subtle border
- **Behavior**: 
  - Clicking an icon activates that section
  - Active icon is highlighted with blue color and left border
  - Hover shows tooltip with section name

### Main Content Panel
- **Position**: Right of navigation rail, fixed width (352px)
- **Content**: Varies based on active navigation section
- **Visual Style**: Light background (#fafafa) with white content cards
- **Sections**: 
  - Favorites
  - Connectors (Apps)
  - Logic
  - Interaction
  - Files
  - Advanced
  - Templates
  - Library

### Filter Bar
- **Position**: Top of main content panel
- **Content**: Search input and filter dropdown
- **Visual Style**: Light background with subtle border
- **Components**:
  - Search input with icon and clear button
  - Filter dropdown (for applicable sections)
  - Category/sort dropdowns (for Templates section)

### Search Tabs
- **Position**: Below filter bar, only visible when searching
- **Content**: Local, Library, and Templates tabs with result counts
- **Visual Style**: Tab-style interface with active tab highlighted
- **Behavior**: Allows switching between search result categories

## Section Specifications

### Favorites Section
- **Content**:
  - Recently Used actions list
  - Categorized favorite actions
- **Organization**: 
  - Actions grouped by their original categories
  - Categories sorted alphabetically
- **Empty States**:
  - "No recent actions" when no recent actions exist
  - "No favorite actions yet" when no favorites exist

### Connectors (Apps) Section
- **Content**: 
  - Built-in app connectors
  - User-installed app connectors
- **Organization**:
  - Alphabetically sorted categories
  - Each category can be collapsed/expanded
  - Subgroups can be collapsed/expanded
- **Actions**:
  - Each action can be favorited
  - Clicking an action adds it to the workflow

### Logic Section
- **Content**: Programming logic constructs
  - Variables
  - Conditions
  - Loops
  - Error handling
- **Organization**: 
  - Maintains specific order (Variables first)
  - Categories can be collapsed/expanded

### Interaction Section
- **Content**: UI and user interaction components
  - UI Automation
  - Forms
  - Notifications
- **Organization**:
  - Maintains specific order (UI Automation first)
  - Categories can be collapsed/expanded

### Files Section
- **Content**: File handling operations
  - Compression
  - PDF operations
  - File system operations
- **Organization**:
  - Alphabetically sorted categories
  - Categories can be collapsed/expanded

### Advanced Section
- **Content**: Specialized operations
  - Active Directory
  - Database operations
  - XML handling
- **Organization**:
  - Alphabetically sorted categories
  - Categories can be collapsed/expanded

### Templates Section
- **Content**: Pre-built workflow templates
- **Organization**:
  - Grid layout of template cards
  - Sortable by Popular or A-Z
  - Filterable by category
- **Template Card**:
  - Shows action icons used in template
  - Displays title and description
  - Shows author information
  - View button to see details

### Library Section
- **Content**: Collection of available apps/connectors
- **Organization**:
  - Grid layout of app cards
- **App Card**:
  - App icon with branded color
  - Name and description
  - Installation status
  - Premium indicator if applicable

## Interaction Specifications

### Category Headers
- **Behavior**:
  - Sticky headers when scrolling
  - Shows category icon and name
  - Shows result count when searching
- **Visual Style**:
  - Icon with category color
  - Clear visual hierarchy

### Action Items
- **Behavior**:
  - Clickable to add to workflow
  - Star icon to add/remove from favorites
  - Hover state with background change
- **Visual Style**:
  - Clean text with appropriate spacing
  - Category-specific icons when applicable
  - Star icon for favoriting

### Subgroups
- **Behavior**:
  - Expandable/collapsible with chevron icon
  - Shows count of contained items
  - Maintains expanded/collapsed state
- **Visual Style**:
  - Indented under parent category
  - Clear hierarchy with parent

### Drag and Drop
- **Behavior**:
  - Actions can be dragged to workflow canvas
  - Visual feedback during drag operation
  - Positioning based on drop location

## Visual Design Specifications

### Color Scheme
- **Primary UI Color**: #0078d4 (Microsoft blue)
- **Background**: #fafafa (light gray)
- **Cards**: #ffffff (white)
- **Text**: 
  - Primary: #111827 (near black)
  - Secondary: #6B7280 (medium gray)
  - Tertiary: #9CA3AF (light gray)
- **Category Colors**: Various colors specific to each category

### Typography
- **Font Family**: System font stack
- **Sizes**:
  - Category headers: 14px (font-medium)
  - Action items: 14px (font-normal)
  - Subgroup headers: 14px (font-normal)
  - Metadata: 12px or 10px (font-normal)

### Spacing and Layout
- **Padding**:
  - Section padding: 16px
  - Card padding: 16px
  - Item padding: 8px vertical, 16px horizontal
- **Margins**:
  - Between categories: 24px
  - Between items: 8px
- **Border Radius**:
  - Cards: 8px
  - Buttons: 6px
  - Icons: 6px

### Icons
- **Style**: Lucide icons (consistent stroke width)
- **Sizes**:
  - Navigation icons: 20px
  - Category icons: 16px
  - Action icons: 16px
  - Utility icons: 14px

## Responsive Behavior
- **Collapsible**: Sidebar can be collapsed to show only navigation rail
- **Resizable**: Width adjustments may be supported in future versions
- **Scrolling**: Vertical scrolling with sticky category headers

## Accessibility Considerations
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Readers**: Proper ARIA labels and roles
- **Focus States**: Clear visual indication of focused elements
- **Color Contrast**: All text meets WCAG AA standards

## Performance Considerations
- **Virtualization**: For large lists of actions
- **Lazy Loading**: For library and template content
- **Efficient Rendering**: Optimized component updates

## Future Enhancements
- **Customizable Layout**: User-defined organization of actions
- **Pinned Actions**: Quick access to specific actions
- **Extended Search**: Advanced filtering and sorting options
- **Keyboard Shortcuts**: For power users
- **Contextual Suggestions**: Based on workflow context
