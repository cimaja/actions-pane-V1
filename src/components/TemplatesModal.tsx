import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown, X as CloseIcon, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { getBackgroundColorFromTextColor } from '../lib/colorUtils';
import { templates } from '../data/templates';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { id: 'lead-management', label: 'Lead management' },
  { id: 'sales-pipeline', label: 'Sales pipeline' },
  { id: 'marketing-campaigns', label: 'Marketing campaigns' },
  { id: 'customer-support', label: 'Customer support' },
  { id: 'data-management', label: 'Data management' },
  { id: 'project-management', label: 'Project management' },
  { id: 'tickets-incidents', label: 'Tickets & incidents' }
];

export function TemplatesModal({ isOpen, onClose }: TemplatesModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'Popular' | 'A-Z'>('Popular');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showAuthorDropdown, setShowAuthorDropdown] = useState(false);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  
  // Get unique authors from templates
  const authors = [...new Set(templates.map(template => template.author))];
  const modalRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

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
      if (authorRef.current && !authorRef.current.contains(event.target as Node)) {
        setShowAuthorDropdown(false);
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
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(template => {
        return selectedCategories.some(category => 
          template.title.toLowerCase().includes(category.toLowerCase()) ||
          template.description.toLowerCase().includes(category.toLowerCase())
        );
      });
    }

    // Apply author filter
    if (selectedAuthors.length > 0) {
      filtered = filtered.filter(template => selectedAuthors.includes(template.author));
    }

    // Apply sorting
    switch (sortBy) {
      case 'A-Z':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Popular':
        // Keep the original order for now
        break;
    }

    return filtered;
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
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Templates</h2>
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

        <div className="p-4 border-b border-gray-200 bg-[#fafafa] space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates"
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
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-sm border border-gray-100 divide-y divide-gray-100 z-50">
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
                    {categories
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
                    <div className="p-2 flex justify-end">
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

            <div ref={authorRef} className="relative">
              <button
                onClick={() => setShowAuthorDropdown(!showAuthorDropdown)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-all duration-200 flex items-center gap-2",
                  "text-gray-600 hover:text-gray-900",
                  showAuthorDropdown ? "bg-gray-50" : "hover:bg-gray-50/50"
                )}
              >
                <span>
                  {selectedAuthors.length === 0 ? 'All authors' : 
                   selectedAuthors.length === 1 ? selectedAuthors[0] :
                   `${selectedAuthors.length} authors`}
                </span>
                <ChevronDown className={cn(
                  "w-3.5 h-3.5 text-gray-400 transition-transform duration-200",
                  showAuthorDropdown && "transform rotate-180"
                )} />
              </button>
              
              {showAuthorDropdown && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-sm border border-gray-100 divide-y divide-gray-100 z-50">
                  <div className="p-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        value={authorFilter}
                        onChange={(e) => setAuthorFilter(e.target.value)}
                        placeholder="Search authors"
                        className="w-full pl-8 pr-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="py-1 max-h-64 overflow-y-auto">
                    {authors
                      .filter(author => 
                        author.toLowerCase().includes(authorFilter.toLowerCase())
                      )
                      .map((author) => (
                    <button
                      key={author}
                      onClick={() => {
                        setSelectedAuthors(prev => {
                          const isSelected = prev.includes(author);
                          if (isSelected) {
                            return prev.filter(a => a !== author);
                          } else {
                            return [...prev, author];
                          }
                        });
                      }}
                      className={cn(
                        "w-full px-3 py-1.5 text-sm text-left hover:bg-gray-50 flex items-center gap-2",
                        selectedAuthors.includes(author) ? "text-[#0078d4]" : "text-gray-600"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 border rounded flex items-center justify-center flex-shrink-0",
                        selectedAuthors.includes(author) 
                          ? "border-[#0078d4] bg-[#0078d4] text-white" 
                          : "border-gray-300"
                      )}>
                        {selectedAuthors.includes(author) && (
                          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      {author}
                    </button>
                  ))}
                  </div>
                  {selectedAuthors.length > 0 && (
                    <div className="p-2 flex justify-end">
                      <button
                        onClick={() => {
                          setSelectedAuthors([]);
                          setAuthorFilter('');
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredTemplates().map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-lg border border-gray-100/80 p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {template.usedActions.slice(0, 3).map((action, index) => (
                      <div
                        key={index}
                        className={cn(
                          "p-1.5 rounded-lg",
                          getBackgroundColorFromTextColor(action.color)
                        )}
                      >
                        <action.icon className={cn("w-4 h-4", action.color)} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {template.title}
                    </h3>
                    <p className="text-xs leading-normal text-gray-500 mt-1">
                      {template.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {template.author}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {getFilteredTemplates().length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">No templates found</h3>
              <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}