import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  NodeTypes,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ClipboardList } from 'lucide-react';

import { useWorkflowStore } from './store/workflow';
import { useUserSettingsStore } from './store/userSettings';
import Sidebar from './components/Sidebar';
import PropertiesPanel from './components/PropertiesPanel';
import TriggerNode from './components/nodes/TriggerNode';
import ActionNode from './components/nodes/ActionNode';
import ChangelogModal from './components/ChangelogModal';
import LoginOverlay from './components/LoginOverlay';

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
};

// Define the sidebar width constant
const sidebarWidth = 408;

function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useWorkflowStore();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [changelogOpen, setChangelogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const position = {
        x: event.clientX - sidebarWidth,
        y: event.clientY - 40,
      };

      const newNode = {
        id: `${data.type}_${Date.now()}`,
        type: data.type,
        position,
        data: data.data,
      };

      useWorkflowStore.setState((state) => ({
        nodes: [...state.nodes, newNode],
      }));
    },
    []
  );



  return (
    <div className="flex h-screen">
      {!isAuthenticated && <LoginOverlay onAuthenticated={() => setIsAuthenticated(true)} />}
      <div className="w-[408px] flex-shrink-0 relative border-r border-gray-200">
        <Sidebar />
      </div>
      <div className="flex-1 flex">
        <button 
          onClick={() => setChangelogOpen(true)}
          className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-xs rounded-md z-50 flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <ClipboardList size={14} />
          <span>Changelog</span>
        </button>
        <ChangelogModal isOpen={changelogOpen} onClose={() => setChangelogOpen(false)} />
        <div className="flex-1" style={{ height: '100vh' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={(_, node) => setSelectedNode(node)}
            onPaneClick={() => setSelectedNode(null)}
            nodeTypes={nodeTypes}
            onDragOver={onDragOver}
            onDrop={onDrop}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background />
          </ReactFlow>
        </div>
        <PropertiesPanel selectedNode={selectedNode} />
      </div>
    </div>
  );
}

export default App;