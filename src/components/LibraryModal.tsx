import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown, X as CloseIcon, Grid, ArrowLeft, Download, Trash2, Check, Diamond, Maximize2, Minimize2, Zap, LayoutPanelTop, Library } from 'lucide-react';
import { Spinner } from './Spinner';
import { cn } from '../lib/utils';
import { getBackgroundColorFromTextColor } from '../lib/colorUtils';
import { useAppStore } from '../store/appStore';
import { useUserSettingsStore } from '../store/userSettings';
import { apps as libraryApps, appCategories } from '../data/apps';
import { appsActionItems } from '../data/actions';
import { AppCard } from './AppCard';
import CloudIcon from '../images/cloud.svg';
import PremiumIcon from '../images/Premium.svg';

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedApp?: AppDetails | null;
}

interface AppDetails {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  category: string;
  premium?: boolean;
  dateAdded?: string;
}

type LibraryTab = 'connectors' | 'custom-actions' | 'ui-elements';

export function LibraryModal({ isOpen, onClose, initialSelectedApp = null }: LibraryModalProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<AppDetails[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const [activeTab, setActiveTab] = useState<LibraryTab>('connectors');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'Popular' | 'A-Z' | 'Date Added'>('Popular');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedApp, setSelectedApp] = useState<AppDetails | null>(initialSelectedApp);
  const [isInstalling, setIsInstalling] = useState(false);
  const { installedApps, installApp, uninstallApp } = useAppStore();
  const { isPremiumUser } = useUserSettingsStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const [apps, setApps] = useState(libraryApps);

  const isAppInstalled = (appId: string) => {
    return installedApps.includes(appId);
  };

  useEffect(() => {
    if (isOpen) {
      // Map apps to include premium flag
      const mappedApps = libraryApps.map(app => ({
        ...app,
        premium: true
      }));
      
      setApps(mappedApps);
      
      if (searchQuery) {
        handleSearch(searchQuery);
      }
    }
  }, [isOpen, searchQuery]);

  // Effect to handle search and tab changes
  useEffect(() => {
    if (activeTab === 'connectors') {
      // Don't show loading state immediately for empty queries
      if (searchQuery) {
        setIsSearching(true);
      }
      
      // Clear previous timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // For empty queries, update immediately
      if (!searchQuery) {
        setSearchResults(getFilteredApps());
        setIsSearching(false);
        return;
      }

      // For non-empty queries, add delay
      searchTimeoutRef.current = setTimeout(() => {
        setSearchResults(getFilteredApps());
        setIsSearching(false);
      }, 2000);

      return () => {
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }
      };
    } else {
      // Clear results when switching away from connectors tab
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery, selectedCategories, sortBy, activeTab]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = ''; // Re-enable scrolling when modal is closed
    };
  }, [isOpen, onClose]);

  const clearSearch = () => {
    setSearchQuery('');
  };



  const getFilteredApps = () => {
    let filtered = [...apps];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(app => 
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(app => {
        return selectedCategories.some(categoryLabel => {
          const categoryId = appCategories.find(cat => cat.label === categoryLabel)?.id;
          return categoryId && app.category === categoryId;
        });
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'A-Z':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Date Added':
        filtered.sort((a, b) => {
          if (!a.dateAdded || !b.dateAdded) return 0;
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        });
        break;
      case 'Popular':
        // Keep the original order for now
        break;
    }
    
    return filtered;
  };

  const handleAppClick = (app: AppDetails) => {
    setSelectedApp(app);
  };

  const handleBackClick = () => {
    setSelectedApp(null);
  };

  const handleInstallApp = async (appId: string) => {
    setIsInstalling(true);
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    installApp(appId);
    setIsInstalling(false);
  };

  const handleUninstallApp = (appId: string) => {
    uninstallApp(appId);
  };

  // Get mock actions for the selected app
  const getAppActions = () => {
    return [
      {
        title: "Get SharePoint data",
        description: "Retrieves data from a SharePoint list or library."
      },
      {
        title: "Create SharePoint item",
        description: "Creates a new item in a SharePoint list."
      },
      {
        title: "Update SharePoint item",
        description: "Updates an existing item in a SharePoint list."
      },
      {
        title: "Delete SharePoint item",
        description: "Deletes an item from a SharePoint list."
      },
      {
        title: "Search SharePoint",
        description: "Searches for content across SharePoint sites."
      }
    ];
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleSearch = (query: string) => {
    setIsSearching(true);
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // For empty queries, update immediately
    if (!query) {
      setSearchResults(getFilteredApps());
      setIsSearching(false);
      return;
    }

    // For non-empty queries, add delay
    searchTimeoutRef.current = setTimeout(() => {
      setSearchResults(getFilteredApps());
      setIsSearching(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className={cn(
          "bg-white rounded-xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden relative transition-all duration-200",
          isExpanded ? "h-[90vh]" : "h-[600px]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {selectedApp ? (
          // Details view header
          <div className="p-4 pb-0 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleBackClick}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-500" />
                </button>
                <h2 className="text-lg font-semibold text-gray-900">
                  Library
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  title={isExpanded ? "Collapse" : "Expand"}
                >
                  {isExpanded ? (
                    <Minimize2 className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Maximize2 className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                <button 
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <CloseIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Main library view header
          <div className="p-4 pb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Library className="w-5 h-5 text-gray-900" />
                <h2 className="text-xl font-semibold text-gray-900">Library</h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  title={isExpanded ? "Collapse" : "Expand"}
                >
                  {isExpanded ? (
                    <Minimize2 className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Maximize2 className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                <button 
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <CloseIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Pivot Tabs */}
            <div className="flex mt-4">
              <button
                onClick={() => setActiveTab('connectors')}
                className={cn(
                  'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                  activeTab === 'connectors'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                )}
                style={{ fontFamily: '"Segoe UI Semibold", "Segoe UI", sans-serif' }}
              >
                Connectors
              </button>
              <button
                onClick={() => setActiveTab('custom-actions')}
                className={cn(
                  'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                  activeTab === 'custom-actions'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                )}
                style={{ fontFamily: '"Segoe UI Semibold", "Segoe UI", sans-serif' }}
              >
                Custom actions
              </button>
              <button
                onClick={() => setActiveTab('ui-elements')}
                className={cn(
                  'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                  activeTab === 'ui-elements'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                )}
                style={{ fontFamily: '"Segoe UI Semibold", "Segoe UI", sans-serif' }}
              >
                UI element collections
              </button>
            </div>
          </div>
        )}
        <div className="border-b border-gray-200"></div>

        {selectedApp ? (
          // App details view
          <div className="flex-1 overflow-y-auto">
            {/* App details content */}
            <div className="p-6 pt-4">
              {/* App header with icon and install button */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={cn("p-3 rounded-lg", getBackgroundColorFromTextColor(selectedApp.color))}>
                    {React.createElement(selectedApp.icon, { 
                      className: cn("w-6 h-6", selectedApp.color) 
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {selectedApp.name}
                    </h2>
                    {selectedApp.premium && !isPremiumUser && (
                      <span className="bg-blue-50 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 whitespace-nowrap">
                        <img src={PremiumIcon} alt="Premium" className="w-3 h-3 opacity-40" />
                        Premium Required
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => isAppInstalled(selectedApp.id) 
                    ? handleUninstallApp(selectedApp.id) 
                    : handleInstallApp(selectedApp.id)
                  }
                  disabled={isInstalling}
                  className={cn(
                    "px-4 py-1.5 rounded-md transition-colors text-sm font-medium",
                    isInstalling
                      ? "bg-blue-500/50 text-white cursor-not-allowed"
                      : isAppInstalled(selectedApp.id)
                        ? "border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                  )}
                >
                  {isInstalling 
                    ? "Installing..." 
                    : isAppInstalled(selectedApp.id) 
                      ? "Remove" 
                      : "Install"
                  }
                </button>
              </div>

              {/* Description section */}
              <div className="mb-6">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Connect to {selectedApp.name} to manage data and perform various database operations. 
                  This connector allows you to execute queries, stored procedures, and manage database 
                  objects within your Power Automate flows.
                </p>
                <a href="#" className="text-sm text-blue-500 hover:underline">View documentation</a>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200 my-6"></div>

              {/* Details section */}
              <div className="mb-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">
                  Details
                </h3>
                <div className="grid grid-cols-3 gap-y-4">
                  <div>
                    <h4 className="text-sm text-gray-500 mb-1">Publisher</h4>
                    <p className="text-sm text-gray-900">Microsoft</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 mb-1">Categories</h4>
                    <p className="text-sm text-gray-900">Database</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 mb-1">Last update</h4>
                    <p className="text-sm text-gray-900">June 15, 2024</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200 my-6"></div>

              {/* Actions section */}
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-4">Actions</h3>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  {getAppActions().map((action, index) => (
                    <div
                      key={index}
                      className={cn(
                        "px-4 py-3 hover:bg-gray-50 transition-colors",
                        index !== 0 && "border-t border-gray-200"
                      )}
                    >
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">{action.title}</h4>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Library view
          <>
            <div className="p-4 border-b border-gray-200 bg-[#fafafa] space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder={{
                      'connectors': 'Search connectors...',
                      'custom-actions': 'Search custom actions...',
                      'ui-elements': 'Search UI elements...'
                    }[activeTab]}
                    className={cn(
                      "w-full pl-9 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:border-transparent bg-white/90",
                      searchQuery ? "pr-8" : "pr-3"
                    )}
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
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
                      {(['Popular', 'A-Z', 'Date Added'] as const).map((type) => (
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
                    <span>
                      {selectedCategories.length === 0 ? 'All categories' : 
                       selectedCategories.length === 1 ? selectedCategories[0] :
                       `${selectedCategories.length} categories`}
                    </span>
                    <ChevronDown className={cn(
                      "w-3.5 h-3.5 text-gray-400 transition-transform duration-200",
                      showCategoryDropdown && "transform rotate-180"
                    )} />
                  </button>
                  
                  {showCategoryDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-sm border border-gray-100 py-1 z-50">
                      <div className="p-2">
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <input
                            type="text"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            placeholder="Search categories"
                            className="w-full pl-8 pr-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="py-1 max-h-64 overflow-y-auto">
                        {appCategories
                          .filter(category => 
                            category.label.toLowerCase().includes(categoryFilter.toLowerCase())
                          )
                          .map((category) => (
                            <button
                              key={category.id}
                              onClick={() => {
                                setSelectedCategories(prev => {
                                  const isSelected = prev.includes(category.label);
                                  if (isSelected) {
                                    return prev.filter(c => c !== category.label);
                                  } else {
                                    return [...prev, category.label];
                                  }
                                });
                              }}
                              className={cn(
                                "w-full px-3 py-1.5 text-sm text-left hover:bg-gray-50 flex items-center gap-2",
                                selectedCategories.includes(category.label) ? "text-[#0078d4]" : "text-gray-600"
                              )}
                            >
                              <div className={cn(
                                "w-4 h-4 border rounded flex items-center justify-center flex-shrink-0",
                                selectedCategories.includes(category.label) 
                                  ? "border-[#0078d4] bg-[#0078d4] text-white" 
                                  : "border-gray-300"
                              )}>
                                {selectedCategories.includes(category.label) && (
                                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                              </div>
                              {category.label}
                            </button>
                          ))}
                      </div>
                      {selectedCategories.length > 0 && (
                        <div className="p-2 flex justify-end border-t border-gray-100">
                          <button
                            onClick={() => {
                              setSelectedCategories([]);
                              setCategoryFilter('');
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                            Clear
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-[#fafafa]">
              {isSearching ? (
                <div className="flex items-center justify-center h-full">
                  <Spinner size="lg" />
                </div>
              ) : activeTab === 'connectors' ? (
                <>
                  {/* Connectors Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.map((app) => {
                      const installed = isAppInstalled(app.id);
                      const bgColorClass = getBackgroundColorFromTextColor(app.color);
                      
                      // All connectors are premium
                      const isPremium = true;
                      
                      return (
                        <div
                          key={app.id}
                          className="bg-white rounded-lg border border-gray-100/80 p-4 hover:shadow-md transition-shadow cursor-pointer relative"
                          onClick={() => handleAppClick(app)}
                        >
                          <AppCard
                            id={app.id}
                            name={app.name}
                            description={app.description}
                            icon={app.icon}
                            color={app.color}
                            bgColorClass={bgColorClass}
                            premium={isPremium}
                            installed={installed}
                            onSeeDetails={(e) => {
                              e.stopPropagation();
                              handleAppClick(app);
                            }}
                          />
                          {installed && (
                            <div className="absolute top-2 right-2">
                              <div 
                                className="bg-green-100 rounded-full p-0.5"
                                title="Installed"
                              >
                                <Check className="w-3.5 h-3.5 text-green-600" />
                              </div>
                            </div>
                          )}
                          {!installed && (
                            <div className="absolute top-2 right-2">
                              <div 
                                className="bg-gray-100 rounded-full p-0.5"
                                title="Not installed"
                              >
                                <img src={CloudIcon} alt="Cloud" className="w-3.5 h-3.5 opacity-40" />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {getFilteredApps().length === 0 && (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                        <Grid className="w-6 h-6 text-gray-400" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1" style={{ fontFamily: '"Segoe UI Semibold", "Segoe UI", sans-serif' }}>No connectors found</h3>
                      <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                    </div>
                  )}
                </>
              ) : activeTab === 'custom-actions' ? (
                <>
                  {/* Custom Actions Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((index) => {
                      const action = {
                        id: `custom-action-${index}`,
                        name: `Custom Action ${index}`,
                        description: 'Automate repetitive tasks with custom actions',
                        icon: Zap,
                        color: 'text-purple-600',
                        bgColorClass: 'bg-purple-100',
                      };
                      
                      // For demo purposes, let's say custom action 2 is installed
                      const isInstalled = index === 2;
                      // Custom actions are not premium
                      const isPremium = false;
                      
                      return (
                        <div
                          key={action.id}
                          className="bg-white rounded-lg border border-gray-100/80 p-4 hover:shadow-md transition-shadow cursor-pointer relative"
                        >
                          <AppCard
                            id={action.id}
                            name={action.name}
                            description={action.description}
                            icon={action.icon}
                            color={action.color}
                            bgColorClass={action.bgColorClass}
                            premium={isPremium}
                            installed={isInstalled}
                            onSeeDetails={() => {}}
                          />
                          {isInstalled && (
                            <div className="absolute top-2 right-2">
                              <div 
                                className="bg-green-100 rounded-full p-0.5"
                                title="Installed"
                              >
                                <Check className="w-3.5 h-3.5 text-green-600" />
                              </div>
                            </div>
                          )}
                          {!isInstalled && (
                            <div className="absolute top-2 right-2">
                              <div 
                                className="bg-gray-100 rounded-full p-0.5"
                                title="Not installed"
                              >
                                <img src={CloudIcon} alt="Cloud" className="w-3.5 h-3.5 opacity-40" />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  {/* UI Element Collections Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((index) => {
                      const collection = {
                        id: `ui-collection-${index}`,
                        name: `UI Collection ${index}`,
                        description: 'Reusable UI components for desktop flows',
                        icon: LayoutPanelTop,
                        color: 'text-indigo-600',
                        bgColorClass: 'bg-indigo-100',
                      };
                      
                      // For demo purposes, let's say UI collection 2 is installed
                      const isInstalled = index === 2;
                      // UI elements are not premium
                      const isPremium = false;
                      
                      return (
                        <div
                          key={collection.id}
                          className="bg-white rounded-lg border border-gray-100/80 p-4 hover:shadow-md transition-shadow cursor-pointer relative"
                        >
                          <AppCard
                            id={collection.id}
                            name={collection.name}
                            description={collection.description}
                            icon={collection.icon}
                            color={collection.color}
                            bgColorClass={collection.bgColorClass}
                            premium={isPremium}
                            installed={isInstalled}
                            onSeeDetails={() => {}}
                          />
                          {isInstalled && (
                            <div className="absolute top-2 right-2">
                              <div className="bg-green-100 rounded-full p-0.5" title="Installed">
                                <Check className="w-3.5 h-3.5 text-green-600" />
                              </div>
                            </div>
                          )}
                          {!isInstalled && (
                            <div className="absolute top-2 right-2">
                              <div className="bg-gray-100 rounded-full p-0.5" title="Not installed">
                                <img src={CloudIcon} alt="Cloud" className="w-3.5 h-3.5 opacity-40" />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}