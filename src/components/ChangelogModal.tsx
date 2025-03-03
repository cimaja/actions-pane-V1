import React from 'react';
import { X } from 'lucide-react';

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangelogModal: React.FC<ChangelogModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const changelog = [
    {
      version: "1.1.0",
      date: "March 3, 2025",
      changes: [
        "Added comprehensive action categories for Files, Advanced, and other sections",
        "Improved typography with better font weights and consistent sizing",
        "Enhanced favorites section handling and empty state display",
        "Added detailed documentation for search, sidebar, and library components",
        "Fixed security vulnerability in gh-pages dependency",
        "Deployed to GitHub Pages for easy access and sharing"
      ]
    },
    {
      version: "1.0.0",
      date: "February 28, 2025",
      changes: [
        "Initial release of Actions Pane",
        "Implemented basic workflow editor with ReactFlow",
        "Created sidebar with categorized actions",
        "Added drag-and-drop functionality for workflow creation",
        "Implemented properties panel for node configuration"
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Changelog</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {changelog.map((release, index) => (
            <div key={release.version} className={index > 0 ? "mt-8" : ""}>
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Version {release.version}
                </h3>
                <span className="text-sm text-gray-500">{release.date}</span>
              </div>
              <ul className="space-y-2">
                {release.changes.map((change, i) => (
                  <li key={i} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangelogModal;
