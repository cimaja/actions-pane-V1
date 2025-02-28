import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface ActionItemProps {
  id: string;
  item: string;
  isFavorite: boolean;
  onToggleFavorite: (item: string) => void;
  onClick: () => void;
}

export function ActionItem({ id, item, isFavorite, onToggleFavorite, onClick }: ActionItemProps) {
  return (
    <div
      className="px-3 py-1.5 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2 group rounded-md"
    >
      
      <button
        onClick={onClick}
        className="text-left text-gray-700 flex-1"
      >
        {item}
      </button>

      <Star
        className={cn(
          "w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
          isFavorite ? "text-amber-400 fill-amber-400 opacity-100" : "text-gray-400"
        )}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(item);
        }}
      />
    </div>
  );
}