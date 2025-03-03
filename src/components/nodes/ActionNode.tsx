import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Globe, Tractor as Transform, Bell, Lock } from 'lucide-react';
import { useUserSettingsStore } from '../../store/userSettings';
import { cn } from '../../lib/utils';
import PremiumIcon from '../../images/Premium.svg';

const icons = {
  api: Globe,
  transform: Transform,
  notification: Bell,
};

interface ActionNodeProps {
  data: {
    label: string;
    type: keyof typeof icons;
    premium?: boolean;
  };
  isConnectable: boolean;
}

const ActionNode = ({ data, isConnectable }: ActionNodeProps) => {
  const Icon = icons[data.type];
  const { isPremiumUser } = useUserSettingsStore();
  const isPremiumAction = data.premium === true;
  const isDisabled = isPremiumAction && !isPremiumUser;

  return (
    <div className={cn(
      "px-4 py-2 shadow-lg rounded-md bg-white border-2 relative",
      isDisabled ? "border-gray-300" : "border-green-500"
    )}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className={cn("w-3 h-3", isDisabled ? "bg-gray-300" : "bg-green-500")}
      />
      <div className="flex items-center">
        <Icon className={cn("h-6 w-6 mr-2", isDisabled ? "text-gray-400" : "text-green-500")} />
        <div className={cn("text-sm font-medium", isDisabled && "text-gray-400")}>{data.label}</div>
        {isPremiumAction && !isPremiumUser && (
          <div className="ml-2 bg-blue-50 rounded-full p-0.5" title="Premium Required">
            <img src={PremiumIcon} alt="Premium" className="w-3.5 h-3.5 opacity-40" />
          </div>
        )}
      </div>
      {isDisabled && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-md">
          <div className="flex items-center gap-1 text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">
            <Lock className="w-3 h-3" />
            Premium Required
          </div>
        </div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className={cn("w-3 h-3", isDisabled ? "bg-gray-300" : "bg-green-500")}
      />
    </div>
  );
};

export default memo(ActionNode);