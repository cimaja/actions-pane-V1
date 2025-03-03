import React, { useState, useRef, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { cn } from '../lib/utils';

interface FilterOption {
  id: string;
  label: string;
  description: string;
}

interface FilterDropdownProps {
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

const filterOptions: FilterOption[] = [
  {
    id: 'dlp',
    label: 'Hide DLP actions',
    description: 'Data Loss Prevention actions'
  },
  {
    id: 'premium',
    label: 'Hide Premium actions',
    description: 'Premium-tier features'
  }
];

export function FilterDropdown({ selectedFilters, onFilterChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFilter = (filterId: string) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(id => id !== filterId)
      : [...selectedFilters, filterId];
    onFilterChange(newFilters);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-2 rounded-lg transition-all duration-200 relative",
          isOpen ? "bg-[#0078d4] text-white" : "bg-white/80 text-gray-600 hover:bg-white",
          selectedFilters.length > 0 && !isOpen && "text-[#0078d4]"
        )}
      >
        <Filter className="w-4 h-4" />
        {selectedFilters.length > 0 && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#0078d4] rounded-full border-2 border-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-900">Filters</h3>
          </div>
          
          <div className="py-1">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => toggleFilter(option.id)}
                className="w-full px-3 py-2.5 flex items-start justify-between hover:bg-gray-50 transition-colors group"
              >
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </div>
                <div className="relative flex-shrink-0 mt-0.5">  
                  <div className={cn(
                    "w-10 h-5 rounded-full transition-colors duration-200",
                    selectedFilters.includes(option.id) 
                      ? "bg-[#0078d4]" 
                      : "bg-gray-200 group-hover:bg-gray-300"
                  )}></div>
                  <div className={cn(
                    "absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200",
                    selectedFilters.includes(option.id) && "translate-x-5"
                  )}></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}