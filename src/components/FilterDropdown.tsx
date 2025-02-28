import React, { useState, useRef, useEffect } from 'react';
import { Filter, Check } from 'lucide-react';
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
    label: 'DLP Actions',
    description: 'Data Loss Prevention actions'
  },
  {
    id: 'premium',
    label: 'Premium Actions',
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
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
          <div className="px-3 py-2 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900">Filters</h3>
          </div>
          
          <div className="py-2">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => toggleFilter(option.id)}
                className="w-full px-3 py-2 flex items-start hover:bg-gray-50 transition-colors group"
              >
                <div className={cn(
                  "w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors",
                  selectedFilters.includes(option.id)
                    ? "bg-[#0078d4] border-[#0078d4]"
                    : "border-gray-300 group-hover:border-[#0078d4]"
                )}>
                  <Check className={cn(
                    "w-3 h-3 transition-opacity",
                    selectedFilters.includes(option.id) ? "text-white opacity-100" : "opacity-0"
                  )} />
                </div>
                <div className="ml-3 text-left">
                  <div className="text-sm font-medium text-gray-900">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}