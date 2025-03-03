# Sidebar Search Specification

## Overview
This document outlines the expected behavior for the search functionality in the ActionsPane sidebar component. The search feature allows users to filter actions across three tabs: Local, Library, and Templates.

## Search Components
- **Search Input**: Single search box that filters across all tabs
- **Clear Button**: X icon to clear the search query
- **Tab Navigation**: Three tabs (Local, Library, Templates) with counts
- **Results Display**: Filtered items based on the current tab and search query
- **Category Indicators**: Shows category information for search results

## Core Principles
1. **Instant Search**: All filtering happens instantly as soon as the first character is typed
2. **Immediate UI Response**: Search tabs appear immediately when typing begins
3. **Accurate Counts**: Tab counts always reflect the current filtered results
4. **Persistent Results**: Search results persist when switching between tabs
5. **Clear Visual Feedback**: Users always understand what they're seeing and why
6. **Context Preservation**: Search results maintain their original context (category, icons, etc.)

## Detailed Behavior Specification

### Search Input
- **Behavior**: 
  - Filters items across all tabs simultaneously
  - Search tabs appear immediately upon first keystroke
  - Filtering happens with each keystroke without delay
  - When searching in templates section, automatically sets search tab to templates
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
  - Active tab is highlighted with blue underline and text (#0078d4)
  - Inactive tabs are gray with hover states

### Search Filtering Logic
- **Local Tab**: 
  - Searches across all action items in all sections and subgroups
  - Matches item names against search query (case-insensitive)
  - Results are grouped by main navigation sections (Connectors, Logic, Interaction, Files, Advanced)
  - Each result displays its original category and icon for context
  
- **Library Tab**:
  - Searches app names and descriptions
  - Matches are case-insensitive
  - Results include all metadata (icon, description, premium status)
  - Results are sorted alphabetically by name
  
- **Templates Tab**:
  - Searches template titles and descriptions
  - Matches are case-insensitive
  - Results maintain all template metadata and styling
  - Results are sorted alphabetically by title

### Empty States
- **No Results**:
  - Local: Shows "No results found" message with search icon
  - Library: Shows "No library results" message with library icon and suggestion to try another search
  - Templates: Shows "No template results" message with template icon and suggestion to try another search

### Additional Features
- **Result Context**: 
  - When displaying search results in the Local tab, each item shows its original category path
  - For subgroup items, the path is displayed as "Category › Subgroup"
  - Original icons and colors are preserved in search results

- **Sorting**:
  - Local search results preserve the original order of main navigation sections
  - Within each section, items are sorted alphabetically
  - Library search results are sorted alphabetically by name
  - Template search results are sorted alphabetically by title

- **Filtering**:
  - In non-template sections, users can apply additional filters via the filter dropdown
  - In templates section, users can filter by category and sort by popularity or alphabetically

### Search Performance
- **Optimization**:
  - All search operations happen client-side for immediate response
  - Search is performed on each keystroke without debouncing
  - UI updates synchronously with search input for a fluid experience

### Interaction with Navigation
- **Navigation State**:
  - When in search mode, the active navigation item remains highlighted
  - Clearing search returns to the normal view of the active navigation section
  - When clicking a navigation item while searching, search is cleared
