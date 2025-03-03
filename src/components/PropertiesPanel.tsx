import React from 'react';
import { Node } from 'reactflow';
import { useWorkflowStore } from '../store/workflow';
import { cn } from '../lib/utils';
import { useUserSettingsStore } from '../store/userSettings';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface PropertiesPanelProps {
  selectedNode: Node | null;
}



const PropertiesPanel = ({ selectedNode }: PropertiesPanelProps) => {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);
  const isPremiumUser = useUserSettingsStore((state) => state.isPremiumUser);
  const setIsPremiumUser = useUserSettingsStore((state) => state.setIsPremiumUser);
  
  // We're not using this handler anymore as we're using inline handlers
  const handleTogglePremium = () => {};


  if (!selectedNode) {
    return (
      <div className="w-80 bg-[#fafafa] border-l border-gray-200 p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: '"Segoe UI Semibold", "Segoe UI", sans-serif' }}>Settings</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900" style={{ fontFamily: '"Segoe UI Semibold", "Segoe UI", sans-serif' }}>User is Premium</span>
              <Toggle
                checked={isPremiumUser}
                onChange={() => {
                  console.log('Toggle clicked, current:', isPremiumUser);
                  setIsPremiumUser(!isPremiumUser);
                }}
                inlineLabel
                onText=""
                offText=""
                styles={{
                  root: { marginBottom: 0, marginTop: 0 },
                  pill: { background: isPremiumUser ? '#3b82f6' : '#d1d5db' },
                  thumb: { backgroundColor: 'white' }
                }}
              />
            </div>
          </div>

        </div>
      </div>   );
  }

  return (
    <div className="w-80 bg-[#fafafa] border-l border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: '"Segoe UI Semibold", "Segoe UI", sans-serif' }}>Settings</h3>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900" style={{ fontFamily: '"Segoe UI Semibold", "Segoe UI", sans-serif' }}>User is Premium</span>
            <Toggle
              checked={isPremiumUser}
              onChange={() => {
                console.log('Toggle clicked, current:', isPremiumUser);
                setIsPremiumUser(!isPremiumUser);
              }}
              inlineLabel
              onText=""
              offText=""
              styles={{
                root: { marginBottom: 0, marginTop: 0 },
                pill: { background: isPremiumUser ? '#3b82f6' : '#d1d5db' },
                thumb: { backgroundColor: 'white' }
              }}
            />
          </div>
        </div>       <div>
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