import React from 'react';
import { Node } from 'reactflow';
import { useWorkflowStore } from '../store/workflow';
import { cn } from '../lib/utils';

interface PropertiesPanelProps {
  selectedNode: Node | null;
}



const PropertiesPanel = ({ selectedNode }: PropertiesPanelProps) => {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);

  if (!selectedNode) {
    return (
      <div className="w-80 bg-[#fafafa] border-l border-gray-200 p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Properties</h3>
        <div className="text-sm text-gray-600">
          No node selected
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-[#fafafa] border-l border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4">Properties</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            value={selectedNode.data.label}
            onChange={(e) => updateNodeData(selectedNode.id, { label: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/90"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;