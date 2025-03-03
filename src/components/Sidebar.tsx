import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Search, X, Brain, AppWindow, Zap, MousePointerClick, FolderOpen, Settings2, LayoutPanelTop as FileTemplate, Library, ChevronRight, Grid, Star, History, Sparkles, ChevronDown, Download, Diamond } from 'lucide-react';
import { Spinner } from './Spinner';
import { FilterDropdown } from './FilterDropdown';
import { cn } from '../lib/utils';
import { templates } from '../data/templates';
import { mainNavItems, bottomNavItems } from '../data/navigation';
import { apps, type App } from '../data/apps';
import { appsActionItems, logicActionItems, interactionActionItems, fileActionItems, advancedActionItems, sortActionSections, type ActionSection } from '../data/actions';
import { TemplatesModal } from './TemplatesModal';
import { LibraryModal } from './LibraryModal';
import { useAppStore } from '../store/appStore';
import { AppCard } from './AppCard';
import { isPremiumConnectorAction } from '../lib/premiumUtils';
import { useUserSettingsStore } from '../store/userSettings';
import PremiumIcon from '../images/Premium.svg';

const categories = [
  { id: 'lead-management', label: 'Lead management' },
  { id: 'sales-pipeline', label: 'Sales pipeline' },
  { id: 'marketing-campaigns', label: 'Marketing campaigns' },
  { id: 'customer-support', label: 'Customer support' },
  { id: 'data-management', label: 'Data management' },
  { id: 'project-management', label: 'Project management' },
  { id: 'tickets-incidents', label: 'Tickets & incidents' }
];

type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
};

const ItemCountBadge = ({ count, isSubgroup = false }: { count: number; isSubgroup?: boolean }) => {
  if (!isSubgroup) return null;
  
  return (
    <div className="ml-auto bg-gray-100 text-gray-600 text-[10px] font-medium px-1.5 py-[2px] rounded-full min-w-[1.125rem] text-right">
      {count}
    </div>
  );
};

// Component to show when a category has no visible actions due to filters
const NoActionsMessage = () => (
  <div className="py-2 px-4 text-sm text-gray-500 italic">
    No actions visible with current filters
  </div>
);

// Component to show a premium badge for premium actions
const PremiumBadge = () => (
  <div className="inline-flex items-center gap-1 ml-1">
    <div className="bg-blue-50 rounded-full p-0.5" title="Premium Required">
      <img src={PremiumIcon} alt="Premium" className="w-3.5 h-3.5 opacity-40" />
    </div>
  </div>
);

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ComponentType<any>; 
  title: string; 
  description: string;
}) => (
  <div className="py-8 px-4 text-center">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
      <Icon className="w-6 h-6 text-gray-400" />
    </div>
    <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);

const getAllActionItems = () => {
  const items = [
    ...appsActionItems,
    ...logicActionItems,
    ...interactionActionItems,
    ...fileActionItems,
    ...advancedActionItems,
  ];
  return items;
};

// Helper function to get background color from text color
const getBackgroundColorFromTextColor = (color: string): string => {
  if (!color.includes('text-')) return 'bg-gray-100';
  
  // Map text colors to background colors with opacity
  const colorMap: Record<string, string> = {
    'text-blue-600': 'bg-blue-100/80',
    'text-blue-500': 'bg-blue-100/70',
    'text-blue-400': 'bg-blue-50/80',
    'text-purple-600': 'bg-purple-100/80',
    'text-purple-500': 'bg-purple-100/70',
    'text-green-600': 'bg-green-100/80',
    'text-green-500': 'bg-green-100/70',
    'text-red-600': 'bg-red-100/80',
    'text-red-500': 'bg-red-100/70',
    'text-yellow-600': 'bg-yellow-100/80',
    'text-yellow-500': 'bg-yellow-100/70',
    'text-orange-500': 'bg-orange-100/70',
    'text-pink-500': 'bg-pink-100/70',
    'text-gray-800': 'bg-gray-100/80',
    'text-gray-600': 'bg-gray-100/70',
    'text-amber-600': 'bg-amber-100/80',
    'text-amber-500': 'bg-amber-100/70',
    'text-indigo-600': 'bg-indigo-100/80',
    'text-cyan-600': 'bg-cyan-100/80',
    'text-emerald-600': 'bg-emerald-100/80',
    'text-rose-600': 'bg-rose-100/80',
    'text-sky-600': 'bg-sky-100/80',
    'text-violet-600': 'bg-violet-100/80',
  };

  return colorMap[color] || 'bg-gray-100';
};

const Sidebar = () => {
  const [isLibrarySearching, setIsLibrarySearching] = useState(false);
  const [isTemplateSearching, setIsTemplateSearching] = useState(false);
  const [librarySearchResults, setLibrarySearchResults] = useState<App[]>([]);
  const [templateSearchResults, setTemplateSearchResults] = useState(templates);
  const [activeNav, setActiveNav] = useState('apps');
  const [filterType, setFilterType] = useState<'Popular' | 'A-Z'>('Popular');
  const [searchQuery, setSearchQuery] = useState('');
  // Initialize with no filters enabled by default (show all actions)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchTab, setSearchTab] = useState<'local' | 'library' | 'templates'>('local');
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [selectedLibraryApp, setSelectedLibraryApp] = useState<App | null>(null);
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [expandedSubgroups, setExpandedSubgroups] = useState<{ [key: string]: boolean }>({});
  const [sortBy, setSortBy] = useState<'Popular' | 'A-Z'>('Popular');
  const sortRef = useRef<HTMLDivElement>(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const { installedApps } = useAppStore();

  const clearSearch = () => {
    setSearchQuery('');
    setLibrarySearchResults([]);
    setTemplateSearchResults(templates.sort((a, b) => a.title.localeCompare(b.title)));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const NavButton = ({ item }: { item: NavItem }) => {
    const Icon = item.icon;
    const isActive = activeNav === item.id;
    
    const handleClick = () => {
      setSearchQuery('');
      
      if (item.id === 'templates') {
        setActiveNav(item.id);
        setTemplateSearchResults(templates.sort((a, b) => a.title.localeCompare(b.title)));
      } else if (item.id === 'library') {
        setIsLibraryOpen(true);
        setLibrarySearchResults([]);
      } else {
        setActiveNav(item.id);
      }
    };
    
    return (
      <button
        key={item.id}
        onClick={handleClick}
        title={item.label}
        className={cn(
          "w-full p-3 flex items-center justify-center relative group transition-all duration-200",
          "hover:bg-white",
          isActive && "bg-white border-l-2 border-[#0078d4]",
          item.id === 'templates' || item.id === 'library' ? "bg-gray-100" : ""
        )}
      >
        <Icon 
          className={cn(
            "h-5 w-5 transition-colors duration-200",
            isActive ? "text-[#0078d4]" : "text-gray-600 group-hover:text-[#0078d4]"
          )} 
        />
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded 
          opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200
          whitespace-nowrap z-50 shadow-lg">
          {item.label}
        </div>
      </button>
    );
  };

  const getFavoritesByCategory = () => {
    const allSections = [
      ...appsActionItems,
      ...logicActionItems,
      ...interactionActionItems,
      ...fileActionItems,
      ...advancedActionItems,
    ];

    const categorizedFavorites: ActionSection[] = [];
    
    allSections.forEach(section => {
      const sectionFavorites = section.items.filter(item => favorites.includes(item));
      const subgroupFavorites = section.subgroups?.map(subgroup => ({
        ...subgroup,
        items: subgroup.items.filter(item => favorites.includes(item))
      })).filter(subgroup => subgroup.items.length > 0);

      if (sectionFavorites.length > 0 || (subgroupFavorites && subgroupFavorites.length > 0)) {
        categorizedFavorites.push({
          ...section,
          items: sectionFavorites,
          subgroups: subgroupFavorites,
        });
      }
    });

    // Sort categories alphabetically and items within each category
    return sortActionSections(categorizedFavorites);
  };

  const getFilteredTemplates = () => {
    let filtered = [...templates];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(template => 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(template => {
        // You might want to add a category field to your templates
        // For now, we'll just filter based on the title/description containing the category
        return template.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
               template.description.toLowerCase().includes(selectedCategory.toLowerCase());
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'A-Z':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Popular':
        // You might want to add a popularity/usage count field to your templates
        // For now, we'll keep the original order
        break;
    }

    return filtered;
  };

  // Get installed app sections
  const getInstalledAppSections = (): ActionSection[] => {
    if (installedApps.length === 0) return [];

    return installedApps.map(appId => {
      const app = apps.find(a => a.id === appId);
      if (!app) return null;

      // Create a mock action section for the installed app
      const bgColorClass = getBackgroundColorFromTextColor(app.color);
      const items = [
        `Get ${app.name} data`,
        `Create ${app.name} item`,
        `Update ${app.name} item`,
        `Delete ${app.name} item`,
        `Search ${app.name}`,
        `Connect to ${app.name}`,
        `Authenticate with ${app.name}`
      ].sort((a, b) => a.localeCompare(b));

      return {
        category: app.name,
        icon: app.icon,
        color: app.color,
        bgColorClass,
        items,
        collapsed: false
      };
    }).filter(Boolean) as ActionSection[];
  };

  const getLibraryResults = () => {
    if (searchQuery.trim() === '') {
      return [];
    }
    
    return librarySearchResults;
  };

  const getActionItems = () => {
    if (searchQuery && searchTab === 'local') {
      // When searching, group results by main navigation sections
      const mainSections = [
        { id: 'apps', label: 'Connectors', items: [...appsActionItems, ...getInstalledAppSections()] },
        { id: 'logic', label: 'Logic', items: logicActionItems },
        { id: 'interaction', label: 'Interaction', items: interactionActionItems },
        { id: 'files', label: 'Files', items: fileActionItems },
        { id: 'advanced', label: 'Advanced', items: advancedActionItems }
      ];

      const searchResults = mainSections.map(section => {
        // Search through all items in this section
        const matchingItems = section.items.flatMap(actionSection => {
          const matches = [];
          // Check main items
          matches.push(...actionSection.items.filter(item =>
            item.toLowerCase().includes(searchQuery.toLowerCase())
          ).map(item => ({
            item,
            category: actionSection.category,
            icon: actionSection.icon,
            color: actionSection.color
          })));

          // Check subgroup items
          if (actionSection.subgroups) {
            actionSection.subgroups.forEach(subgroup => {
              matches.push(...subgroup.items.filter(item =>
                item.toLowerCase().includes(searchQuery.toLowerCase())
              ).map(item => ({
                item,
                category: `${actionSection.category} › ${subgroup.name}`,
                icon: actionSection.icon,
                color: actionSection.color
              })));
            });
          }
          return matches;
        });

        // Only return sections that have matches
        if (matchingItems.length === 0) return null;

        // Sort matching items alphabetically
        const sortedMatchingItems = [...matchingItems].sort((a, b) => a.item.localeCompare(b.item));

        return {
          category: section.label,
          icon: mainNavItems.find(item => item.id === section.id)?.icon || Grid,
          color: 'text-gray-600',
          bgColorClass: 'bg-gray-100',
          items: sortedMatchingItems.map(match => match.item),
          itemCategories: sortedMatchingItems.reduce((acc, match) => {
            acc[match.item] = match.category;
            return acc;
          }, {} as Record<string, string>),
          itemIcons: sortedMatchingItems.reduce((acc, match) => {
            acc[match.item] = {
              icon: match.icon,
              color: match.color
            };
            return acc;
          }, {} as Record<string, { icon: React.ComponentType<any>, color: string }>),
          collapsed: false
        };
      }).filter(Boolean);

      // Preserve the original order of sections from mainSections
      return searchResults.sort((a, b) => {
        const aIndex = mainSections.findIndex(section => section.label === a.category);
        const bIndex = mainSections.findIndex(section => section.label === b.category);
        return aIndex - bIndex;
      });
    }

    switch (activeNav) {
      case 'favorites':
        return [
          {
            category: 'Recently Used',
            icon: History,
            color: 'bg-gray-100 text-gray-600',
            items: recentlyUsed,
            collapsed: false,
            emptyState: {
              icon: History,
              title: 'No recent actions',
              description: 'Actions you use will appear here'
            }
          },
          // Always include the favorites section, but with empty items if there are no favorites
          ...(!searchQuery ? (favorites.length > 0 ? getFavoritesByCategory() : [{
            category: 'Favorite Actions',
            icon: Star,
            color: 'bg-amber-100 text-amber-600',
            items: [],
            collapsed: false,
            emptyState: {
              icon: Star,
              title: 'No favorite actions yet',
              description: 'Click the star icon to add actions to your favorites'
            }
          }]) : [])
        ];
      case 'logic':
        // Don't sort logic items to keep Variables at the top
        return logicActionItems;
      case 'interaction':
        // Don't sort interaction items to keep UI Automation at the top
        return interactionActionItems;
      case 'files':
        return sortActionSections(fileActionItems);
      case 'advanced':
        return sortActionSections(advancedActionItems);
      case 'apps':
        // Combine default app actions with installed app actions and maintain alphabetical sorting
        const installedAppSections = getInstalledAppSections();
        return sortActionSections([...appsActionItems, ...installedAppSections]);
      default:
        return [];
    }
  };

  // Calculate the total number of action items across all sections
  const getTotalActionItemsCount = useCallback(() => {
    // Count all items from all action sections
    let count = 0;
    
    // Apps section
    appsActionItems.forEach(section => {
      count += section.items.length;
      section.subgroups?.forEach(subgroup => {
        count += subgroup.items.length;
      });
    });
    
    // Logic section
    logicActionItems.forEach(section => {
      count += section.items.length;
      section.subgroups?.forEach(subgroup => {
        count += subgroup.items.length;
      });
    });
    
    // Interaction section
    interactionActionItems.forEach(section => {
      count += section.items.length;
      section.subgroups?.forEach(subgroup => {
        count += subgroup.items.length;
      });
    });
    
    // Files section
    fileActionItems.forEach(section => {
      count += section.items.length;
      section.subgroups?.forEach(subgroup => {
        count += subgroup.items.length;
      });
    });
    
    // Advanced section
    advancedActionItems.forEach(section => {
      count += section.items.length;
      section.subgroups?.forEach(subgroup => {
        count += subgroup.items.length;
      });
    });
    
    return count;
  }, []);

  // Calculate filtered local search results count - always show filtered count when searching
  const getFilteredLocalCount = useCallback(() => {
    if (!searchQuery) return getTotalActionItemsCount();
    
    // When searching, we need to calculate the count differently
    // We need to search through all sections and count matching items
    const mainSections = [
      { id: 'apps', items: appsActionItems },
      { id: 'logic', items: logicActionItems },
      { id: 'interaction', items: interactionActionItems },
      { id: 'files', items: fileActionItems },
      { id: 'advanced', items: advancedActionItems }
    ];

    let count = 0;
    
    // Search through all items in all sections
    mainSections.forEach(section => {
      section.items.forEach(actionSection => {
        // Check main items
        actionSection.items.forEach(item => {
          if (item.toLowerCase().includes(searchQuery.toLowerCase())) {
            count++;
          }
        });

        // Check subgroup items
        if (actionSection.subgroups) {
          actionSection.subgroups.forEach(subgroup => {
            subgroup.items.forEach(item => {
              if (item.toLowerCase().includes(searchQuery.toLowerCase())) {
                count++;
              }
            });
          });
        }
      });
    });
    
    return count;
  }, [searchQuery]);

  const getLocalSearchResultsCount = () => {
    if (!searchQuery) return getTotalActionItemsCount();
    
    return getFilteredLocalCount();
  };

  const handleActionClick = (item: string) => {
    // Don't execute disabled actions (premium actions for non-premium users)
    if (isActionDisabled(item)) {
      // Could show a premium upgrade prompt here
      console.log('Premium action clicked by non-premium user:', item);
      return;
    }
    
    setRecentlyUsed((prev) => {
      const newRecent = [item, ...prev.filter(i => i !== item)].slice(0, 5);
      return newRecent;
    });
  };

  const toggleFavorite = (item: string) => {
    setFavorites((prev) => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item);
      }
      return [...prev, item];
    });
  };

  const toggleSubgroup = (category: string, subgroupName: string) => {
    setExpandedSubgroups(prev => ({
      ...prev,
      [`${category}-${subgroupName}`]: !prev[`${category}-${subgroupName}`]
    }));
  };

  // Get the premium user status from the store
  const isPremiumUser = useUserSettingsStore((state) => state.isPremiumUser);

  // Determine if an action should be hidden based on current filters
  const shouldHideAction = (actionName: string): boolean => {
    // Check if premium filter is active and this is a premium action
    const hidePremium = selectedFilters.includes('premium');
    if (hidePremium && isPremiumConnectorAction(actionName)) {
      return true;
    }

    // Check if DLP filter is active and this is a DLP action
    const hideDLP = selectedFilters.includes('dlp');
    if (hideDLP && actionName.toLowerCase().includes('dlp')) {
      return true;
    }

    return false;
  };

  // Determine if an action should be visually disabled
  const isActionDisabled = (actionName: string): boolean => {
    // Premium actions are disabled for non-premium users
    return !isPremiumUser && isPremiumConnectorAction(actionName);
  };

  const renderFilterBar = () => {
    // For all sections, show a unified search bar
    return (
      <div className="flex-shrink-0 border-b border-gray-200 bg-[#fafafa]">
        <div className="p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  // If we're in templates section and start searching, automatically set the search tab to templates
                  if (activeNav === 'templates' && e.target.value && !searchQuery) {
                    setSearchTab('templates');
                  }
                }}
                placeholder="Search across all actions"
                className={cn(
                  "w-full pl-9 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:border-transparent bg-white/90",
                  searchQuery ? "pr-8" : "pr-3"
                )}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                  title="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {activeNav !== 'templates' && (
              <FilterDropdown
                selectedFilters={selectedFilters}
                onFilterChange={setSelectedFilters}
              />
            )}
          </div>
        </div>
        {searchQuery && (
          <div className="flex border-t border-gray-200">
            <button
              onClick={() => setSearchTab('local')}
              className={cn(
                "flex-1 py-2 text-sm font-medium border-b-2 transition-colors",
                searchTab === 'local'
                  ? "border-[#0078d4] text-[#0078d4]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              Local {searchQuery ? `(${getFilteredLocalCount()})` : ''}
            </button>
            <button
              onClick={() => setSearchTab('library')}
              className={cn(
                "flex-1 py-2 text-sm font-medium border-b-2 transition-colors",
                searchTab === 'library'
                  ? "border-[#0078d4] text-[#0078d4]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              Library {searchQuery ? `(${librarySearchResults.length})` : ''}
            </button>
            <button
              onClick={() => setSearchTab('templates')}
              className={cn(
                "flex-1 py-2 text-sm font-medium border-b-2 transition-colors",
                searchTab === 'templates'
                  ? "border-[#0078d4] text-[#0078d4]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              Templates {searchQuery ? `(${templateSearchResults.length})` : ''}
            </button>
          </div>
        )}
        
        {/* Show template-specific filters only when in templates section and not searching */}
        {activeNav === 'templates' && !searchQuery && (
          <div className="flex items-center gap-2 px-4 pb-4">
            <div ref={sortRef} className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-all duration-200 flex items-center gap-2",
                  "text-gray-600 hover:text-gray-900",
                  showSortDropdown ? "bg-gray-50" : "hover:bg-gray-50/50"
                )}
              >
                <span>{sortBy}</span>
                <ChevronDown className={cn(
                  "w-3.5 h-3.5 text-gray-400 transition-transform duration-200",
                  showSortDropdown && "transform rotate-180"
                )} />
              </button>
              
              {showSortDropdown && (
                <div className="absolute top-full left-0 mt-1 w-36 bg-white rounded-md shadow-sm border border-gray-100 py-1 z-50">
                  {(['Popular', 'A-Z'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSortBy(type);
                        setShowSortDropdown(false);
                      }}
                      className={cn(
                        "w-full px-3 py-1.5 text-sm text-left hover:bg-gray-50 flex items-center",
                        sortBy === type ? "text-[#0078d4]" : "text-gray-600"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div ref={categoryRef} className="relative">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-all duration-200 flex items-center gap-2",
                  "text-gray-600 hover:text-gray-900",
                  showCategoryDropdown ? "bg-gray-50" : "hover:bg-gray-50/50"
                )}
              >
                <span>{selectedCategory}</span>
                <ChevronDown className={cn(
                  "w-3.5 h-3.5 text-gray-400 transition-transform duration-200",
                  showCategoryDropdown && "transform rotate-180"
                )} />
              </button>
              
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-sm border border-gray-100 py-1 z-50">
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setShowCategoryDropdown(false);
                    }}
                    className={cn(
                      "w-full px-3 py-1.5 text-sm text-left hover:bg-gray-50 flex items-center",
                      selectedCategory === 'All' ? "text-[#0078d4]" : "text-gray-600"
                    )}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.label);
                        setShowCategoryDropdown(false);
                      }}
                      className={cn(
                        "w-full px-3 py-1.5 text-sm text-left hover:bg-gray-50 flex items-center",
                        selectedCategory === category.label ? "text-[#0078d4]" : "text-gray-600"
                      )}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const categoryId = entry.target.getAttribute('data-category');
          if (categoryId) {
            setStickyHeaders((prev) => ({
              ...prev,
              [categoryId]: !entry.isIntersecting && entry.boundingClientRect.top < 0
            }));
          }
        });
      },
      {
        root: container,
        threshold: [0, 1],
      }
    );

    const headers = container.querySelectorAll('[data-category]');
    headers.forEach((header) => observer.observe(header));

    return () => observer.disconnect();
  }, []);

  const openLibraryWithApp = (app: App) => {
    setSelectedLibraryApp(app);
    setIsLibraryOpen(true);
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const [stickyHeaders, setStickyHeaders] = useState<{ [key: string]: boolean }>({});

  // Reset loading states when changing active nav
  useEffect(() => {
    setIsLibrarySearching(false);
    setIsTemplateSearching(false);
    if (activeNav === 'templates') {
      setTemplateSearchResults(templates.sort((a, b) => a.title.localeCompare(b.title)));
    }
  }, [activeNav]);

  // Reset search states when changing tabs
  useEffect(() => {
    // Don't reset any search results when switching tabs
    // This ensures consistent behavior across all tabs
  }, [searchTab]);

  // Initialize search results on component mount
  useEffect(() => {
    // Initialize library search results if there's a search query
    if (searchQuery) {
      const results = apps
        .filter(app => 
          app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(app => ({
          id: app.id,
          name: app.name,
          description: app.description,
          icon: app.icon,
          color: app.color,
          bgColorClass: getBackgroundColorFromTextColor(app.color),
          premium: true,
          installed: installedApps.includes(app.id)
        }))
        .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name

      setLibrarySearchResults(results);
    }
    
    // Initialize template search results
    if (searchQuery) {
      const results = templates.filter(template => 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically by title

      setTemplateSearchResults(results);
    } else {
      setTemplateSearchResults(templates.sort((a, b) => a.title.localeCompare(b.title)));
    }
  }, []);

  // Instant library search
  useEffect(() => {
    // Only update library search results when there's a query
    // This prevents resetting results when switching tabs
    if (!searchQuery) {
      // Don't reset library results when there's no query
      // This allows results to persist when switching tabs
      return;
    }

    const results = apps
      .filter(app => 
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(app => ({
        id: app.id,
        name: app.name,
        description: app.description,
        icon: app.icon,
        color: app.color,
        bgColorClass: getBackgroundColorFromTextColor(app.color),
        premium: true,
        installed: installedApps.includes(app.id)
      }))
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name

    setLibrarySearchResults(results);
  }, [searchQuery]);

  // Immediate template search without delay
  useEffect(() => {
    // Only update template search results when there's a query
    if (!searchQuery) {
      // Don't reset template results when there's no query
      return;
    }

    const results = templates.filter(template => 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically by title

    setTemplateSearchResults(results);
  }, [searchQuery]);

  return (
    <div className="flex h-full">
      <div className="w-14 modern-gradient flex flex-col border-r border-gray-200">
        <div className="flex-1">
          {mainNavItems.map((item) => (
            <NavButton key={item.id} item={item} />
          ))}
        </div>

        <div className="border-t border-gray-200">
          {bottomNavItems.map((item) => (
            <NavButton key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="w-[352px] modern-gradient flex flex-col">
        {renderFilterBar()}
        <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[#fafafa] px-3">
          {searchQuery && searchTab === 'library' ? (
            <div className="py-4">
              {librarySearchResults.length === 0 ? (
                <div className="py-8 px-4 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                    <Library className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">No library results</h3>
                  <p className="text-sm text-gray-500">Try searching for something else or browse the library</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {librarySearchResults.map((result) => (
                    <div
                      key={result.id}
                      className="bg-white rounded-lg border border-gray-100/80 p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <AppCard
                        id={result.id}
                        name={result.name}
                        description={result.description}
                        icon={result.icon}
                        color={result.color}
                        bgColorClass={result.bgColorClass}
                        premium={result.premium}
                        installed={result.installed}
                        onSeeDetails={(e) => {
                          e.stopPropagation();
                          openLibraryWithApp(result);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : searchQuery && searchTab === 'templates' ? (
            <div className="py-4">
              {templateSearchResults.length === 0 ? (
                <div className="py-8 px-4 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                    <FileTemplate className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">No template results</h3>
                  <p className="text-sm text-gray-500">Try searching for something else or browse the templates</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {templateSearchResults.map((template) => (
                    <div key={template.id} className="bg-white rounded-lg border border-gray-100/80 p-4 hover:shadow-md transition-shadow">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          {template.usedActions.slice(0, 3).map((action, index) => (
                            <div
                              key={index}
                              className="p-1.5 rounded-lg bg-gray-50"
                            >
                              <action.icon className={cn("w-4 h-4", action.color)} />
                            </div>
                          ))}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">
                            {template.title}
                          </h3>
                          <p className="text-xs leading-normal text-gray-500 mt-1">
                            {template.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] text-gray-400">
                            {template.author}
                          </span>
                          <button 
                            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-[#0078d4] hover:bg-blue-50 rounded transition-colors"
                            onClick={() => setIsTemplatesModalOpen(true)}
                            title={`View details for ${template.title}`}
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : activeNav === 'templates' ? (
            <div className="grid grid-cols-1 gap-3 py-4">
              {getFilteredTemplates().map((template) => (
                <div
                  key={template.id}
                  className="bg-white rounded-lg border border-gray-100/80 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {template.usedActions.slice(0, 3).map((action, index) => (
                        <div
                          key={index}
                          className="p-1.5 rounded-lg bg-gray-50"
                        >
                          <action.icon className={cn("w-4 h-4", action.color)} />
                        </div>
                      ))}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {template.title}
                      </h3>
                      <p className="text-xs leading-normal text-gray-500 mt-1">
                        {template.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400">
                        {template.author}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {getActionItems()
                .filter(section => {
                  // Always show sections with empty states
                  if (section.emptyState) {
                    return true;
                  }
                  // Hide sections where all items are filtered out and all subgroups are filtered out
                  const hasVisibleItems = section.items.some(item => !shouldHideAction(item));
                  const hasVisibleSubgroupItems = section.subgroups?.some(sg => 
                    sg.items.some(item => !shouldHideAction(item))
                  ) ?? false;
                  return hasVisibleItems || hasVisibleSubgroupItems;
                })
                .map((section, index) => (
                <div key={section.category} className={cn("relative mb-6", index > 0 && "mt-6")}>
                  <div 
                    data-category={section.category}
                    className="sticky top-0 z-10 bg-[#fafafa]"
                  >
                    <div className="flex items-center gap-3 py-2">
                      <div className={cn("p-1.5 rounded-lg", section.bgColorClass || section.color)}>
                        <section.icon className={cn("w-4 h-4", section.color)} />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{section.category}</span>
                      {searchQuery && (
                        <span className="text-xs text-gray-500">
                          {section.items.length + (section.subgroups?.reduce((acc, sg) => acc + sg.items.length, 0) || 0)} results
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg border border-gray-100/80 overflow-hidden p-2">
                    <div>
                      {section.items.length === 0 && section.emptyState && (
                        <EmptyState {...section.emptyState} />
                      )}
                      
                      {/* Show no actions message when all items in the section are filtered out */}
                      {(section.items.length > 0 || (section.subgroups && section.subgroups.length > 0)) && 
                       section.items.filter(item => !shouldHideAction(item)).length === 0 && 
                       (!section.subgroups || section.subgroups.every(sg => sg.items.filter(item => !shouldHideAction(item)).length === 0)) && (
                        <NoActionsMessage />
                      )}

                      {section.subgroups?.filter(subgroup => subgroup.items.some(item => !shouldHideAction(item))).map((subgroup) => (
                        <div key={subgroup.name}>
                          <button
                            onClick={() => toggleSubgroup(section.category, subgroup.name)}
                            className="w-full flex items-center gap-2 pl-0 pr-2 py-1.5 hover:bg-gray-50 transition-colors rounded-md"
                            title={expandedSubgroups[`${section.category}-${subgroup.name}`] ? `Collapse ${subgroup.name}` : `Expand ${subgroup.name}`}
                          >
                            <ChevronRight
                              className={cn(
                                "w-4 h-4 transition-transform",
                                expandedSubgroups[`${section.category}-${subgroup.name}`] ? "transform rotate-90" : ""
                              )}
                            />
                            <span className="text-sm text-gray-700">{subgroup.name}</span>
                            <ItemCountBadge count={subgroup.items.length} isSubgroup={true} />
                          </button>
                          
                          {expandedSubgroups[`${section.category}-${subgroup.name}`] && (
                            <div className="pl-6">
                              {/* We don't need to show NoActionsMessage here since we're filtering out empty subgroups */}
                              {subgroup.items.filter(item => !shouldHideAction(item)).map((item) => (
                                <button
                                  key={item}
                                  onClick={() => handleActionClick(item)}
                                  className={cn(
                                    "w-full pr-2 py-1.5 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2 group rounded-md",
                                    searchQuery ? "pl-2" : "pl-6",
                                    isActionDisabled(item) && "opacity-60 cursor-not-allowed"
                                  )}
                                  title={isActionDisabled(item) ? `Premium feature: ${item}` : `Execute ${item} action`}
                                  disabled={isActionDisabled(item)}
                                >
                                  <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
                                    {section.itemIcons?.[item]?.icon && (
                                      <div className={cn(
                                        "flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg",
                                        section.itemIcons[item].color
                                      )}>
                                        {React.createElement(section.itemIcons[item].icon, { width: 16, height: 16 })}
                                      </div>
                                    )}
                                    <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                                      <div className="flex items-center">
                                        <div className="flex items-center">
                                <span className="text-gray-700 truncate">{item}</span>
                                {isPremiumConnectorAction(item) && !isPremiumUser && <PremiumBadge />}
                              </div>
                                        {isPremiumConnectorAction(item) && !isPremiumUser && <PremiumBadge />}
                                      </div>
                                      {searchQuery && section.itemCategories && (
                                        <span className="text-xs text-gray-500 truncate">{section.itemCategories[item]}</span>
                                      )}
                                    </div>
                                  </div>
                                  <Star
                                    className={cn(
                                      "w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
                                      favorites.includes(item) ? "text-amber-400 fill-amber-400 opacity-100" : "text-gray-400"
                                    )}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleFavorite(item);
                                    }}
                                    title={favorites.includes(item) ? "Remove from favorites" : "Add to favorites"}
                                  />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}

                      {section.items.length > 0 && section.items.filter(item => !shouldHideAction(item)).length === 0 && (
                        <NoActionsMessage />
                      )}
                      {section.items.filter(item => !shouldHideAction(item)).map((item) => (
                        <button
                          key={item}
                          onClick={() => handleActionClick(item)}
                          className={cn(
                            "w-full pr-2 py-1.5 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2 group rounded-md",
                            searchQuery ? "pl-2" : "pl-6",
                            isActionDisabled(item) && "opacity-60 cursor-not-allowed"
                          )}
                          title={isActionDisabled(item) ? `Premium feature: ${item}` : `Execute ${item} action`}
                          disabled={isActionDisabled(item)}
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
                            {section.itemIcons?.[item]?.icon && (
                              <div className={cn(
                                "flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg",
                                section.itemIcons[item].color
                              )}>
                                {React.createElement(section.itemIcons[item].icon, { width: 16, height: 16 })}
                              </div>
                            )}
                            <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                              <div className="flex items-center">
                                <span className="text-gray-700 truncate">{item}</span>
                                {isPremiumConnectorAction(item) && !isPremiumUser && <PremiumBadge />}
                              </div>
                              {searchQuery && section.itemCategories && (
                                <span className="text-xs text-gray-500 truncate">{section.itemCategories[item]}</span>
                              )}
                            </div>
                          </div>
                          {section.category !== 'Recently Used' && (
                            <Star
                              className={cn(
                                "w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
                                favorites.includes(item) ? "text-amber-400 fill-amber-400 opacity-100" : "text-gray-400"
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(item);
                              }}
                              title={favorites.includes(item) ? "Remove from favorites" : "Add to favorites"}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {isLibraryOpen && (
        <LibraryModal 
          isOpen={isLibraryOpen} 
          onClose={() => {
            setIsLibraryOpen(false);
            setSelectedLibraryApp(null);
          }}
          initialSelectedApp={selectedLibraryApp}
        />
      )}
      
      <TemplatesModal 
        isOpen={isTemplatesModalOpen} 
        onClose={() => setIsTemplatesModalOpen(false)} 
      />
    </div>
  );
};

export default Sidebar;