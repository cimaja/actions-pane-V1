import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Webhook, Clock, FileInput } from 'lucide-react';

const icons = {
  webhook: Webhook,
  schedule: Clock,
  form: FileInput,
};

interface TriggerNodeProps {
  data: {
    label: string;
    type: keyof typeof icons;
  };
  isConnectable: boolean;
}

const TriggerNode = ({ data, isConnectable }: TriggerNodeProps) => {
  const Icon = icons[data.type];

  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-white border-2 border-blue-500">
      <div className="flex items-center">
        <Icon className="h-6 w-6 text-blue-500 mr-2" />
        <div className="text-sm font-medium">{data.label}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-500"
      />
    </div>
  );
};

export default memo(TriggerNode);