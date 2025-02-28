# Sidebar Search Specification

## Overview
This document outlines the expected behavior for the search functionality in the ActionsPane sidebar component. The search feature allows users to filter actions across three tabs: Local, Library, and Templates.

## Search Components
- **Search Input**: Single search box that filters across all tabs
- **Clear Button**: X icon to clear the search query
- **Tab Navigation**: Three tabs (Local, Library, Templates) with counts
- **Results Display**: Filtered items based on the current tab and search query

## Core Principles
1. **Instant Search**: All filtering happens instantly as soon as the first character is typed
2. **Immediate UI Response**: Search tabs appear immediately when typing begins
3. **Accurate Counts**: Tab counts always reflect the current filtered results
4. **Persistent Results**: Search results persist when switching between tabs
5. **Clear Visual Feedback**: Users always understand what they're seeing and why

## Detailed Behavior Specification

### Search Input
- **Behavior**: 
  - Filters items across all tabs simultaneously
  - Search tabs appear immediately upon first keystroke
  - Filtering happens with each keystroke without delay
- **Placeholder**: "Search across all actions"
- **Clear Button**: Appears when text is entered, clears search and resets all filters when clicked

### Tab Counts
- **Local Tab**:
  - When search box is empty: No count is displayed, shows only "Local"
  - When search is active (any input): Shows count of filtered local action items
  - Format when searching: `Local (count)`
  
- **Library Tab**:
  - When search box is empty: No count is displayed, shows only "Library"
  - When search is active (any input): Shows count of filtered library apps
  - Format when searching: `Library (count)`
  
- **Templates Tab**:
  - When search box is empty: No count is displayed, shows only "Templates"
  - When search is active (any input): Shows count of filtered templates
  - Format when searching: `Templates (count)`

### Tab Switching Behavior
- **Search Persistence**: 
  - Search query persists when switching tabs
  - Search results for each tab persist independently
  - No resetting of results when switching tabs
  
- **Visual Indication**:
  - Active tab is highlighted with blue underline and text
  - Inactive tabs are gray with hover states

### Search Filtering Logic
- **Local Tab**: 
  - Searches across all action items in all sections and subgroups
  - Matches item names against search query (case-insensitive)
  
- **Library Tab**:
  - Searches app names and descriptions
  - Matches are case-insensitive
  - Results include all metadata (icon, description, premium status)
  
- **Templates Tab**:
  - Searches template titles and descriptions
  - Matches are case-insensitive
  - Results maintain all template metadata and styling

### Empty States
- **No Results**:
  - When search returns no results, display appropriate empty state
  - Empty state includes icon, title, and description
  - Empty state is specific to the current tab

### Edge Cases
- **Rapid Tab Switching**:
  - Results and counts remain consistent when rapidly switching tabs
  - No flickering or temporary incorrect counts
  
- **Search Clearing**:
  - When search is cleared, search tabs are hidden
  - All content is reset to show full lists
  - Library search results are explicitly reset

- **Empty Search**:
  - When search box is empty, no search tabs are shown
  - When any character is typed, search tabs appear immediately

- **Component Mounting**:
  - Search results are properly initialized on component mount
  - If search query exists on mount, results are filtered accordingly

## Implementation Notes
- Search is performed client-side for immediate feedback
- No debounce is needed due to small dataset size
- All filtering uses case-insensitive string includes() method
- Count calculations use dedicated methods for consistency

## Performance Considerations
- Filtering happens on the client for immediate feedback
- Search is optimized to avoid unnecessary re-renders
- Large datasets may require virtualization in the future

## Future Enhancements
- Fuzzy search for more forgiving matching
- Search highlighting in results
- Search history or recent searches
- Advanced filtering options
- Keyboard navigation for search results
