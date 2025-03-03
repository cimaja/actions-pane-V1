import React from 'react';
import { Check, Lock } from 'lucide-react';
import { cn } from '../lib/utils';
import CloudIcon from '../images/cloud.svg';
import PremiumIcon from '../images/Premium.svg';
import { useUserSettingsStore } from '../store/userSettings';

export interface AppCardProps {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColorClass: string;
  premium: boolean;
  installed?: boolean;
  onSeeDetails: (e: React.MouseEvent) => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  name,
  description,
  icon: Icon,
  color,
  bgColorClass,
  premium,
  installed,
  onSeeDetails,
}) => {
  const { isPremiumUser } = useUserSettingsStore();
  return (
    <div className="relative" onClick={onSeeDetails}>
      {premium && !isPremiumUser && (
        <div className="absolute -top-2 -right-2 flex items-center gap-1">
          <div className="bg-blue-50 rounded-full p-0.5" title="Premium Required">
            <img src={PremiumIcon} alt="Premium" className="w-3.5 h-3.5 opacity-40" />
          </div>
          <div className={cn(
            "rounded-full p-0.5",
            installed ? "bg-green-100" : "bg-gray-100"
          )}>
            {installed ? (
              <Check className="w-3.5 h-3.5 text-green-600" />
            ) : (
              <img 
                src={CloudIcon} 
                alt="Cloud" 
                className="w-3.5 h-3.5 opacity-40" 
                title="Not installed"
              />
            )}
          </div>
        </div>
      )}
      <div className="flex gap-2 items-start">
        <div className={cn("p-1.5 rounded-lg flex-shrink-0 w-6 h-6 flex items-center justify-center", bgColorClass)}>
          <Icon className={cn("w-4 h-4", color)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-medium text-gray-900 truncate" style={{ fontFamily: '"Segoe UI Semibold", "Segoe UI", sans-serif' }}>
              {name}
            </h3>
          </div>
          <p className="text-xs leading-tight text-gray-500 mt-0.5">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
