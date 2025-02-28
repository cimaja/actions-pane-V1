import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Globe, Tractor as Transform, Bell } from 'lucide-react';

const icons = {
  api: Globe,
  transform: Transform,
  notification: Bell,
};

interface ActionNodeProps {
  data: {
    label: string;
    type: keyof typeof icons;
  };
  isConnectable: boolean;
}

const ActionNode = ({ data, isConnectable }: ActionNodeProps) => {
  const Icon = icons[data.type];

  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-white border-2 border-green-500">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-green-500"
      />
      <div className="flex items-center">
        <Icon className="h-6 w-6 text-green-500 mr-2" />
        <div className="text-sm font-medium">{data.label}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-green-500"
      />
    </div>
  );
};

export default memo(ActionNode);