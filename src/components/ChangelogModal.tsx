import React from 'react';
import { X, ClipboardList } from 'lucide-react';

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
        "🔍 Improved search experience with instant results across all tabs",
        "📏 New filtering options for premium content and DLP compliance",
        "📝 Enhanced connector details page with rich documentation",
        "⭐ Enhanced favorites section with better organization and visibility",
        "💎 Clearer premium features with transparent free vs. premium indicators",
        "🎨 Refined visual design with consistent typography and spacing"
      ]
    },
    {
      version: "1.0.0",
      date: "February 28, 2025",
      changes: [
        "🚀 Initial release of Actions Pane",
        "📂 New IA and categories",
        "📚 Library experience to browse and download connectors",
        "📋 Introduce a template library"
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col animate-fadeIn">
        <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-blue-50 to-white">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 text-white p-1.5 rounded-md">
              <ClipboardList size={18} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">What's New</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {changelog.map((release, index) => (
            <div key={release.version} className={index > 0 ? "mt-10" : ""}>
              <div className="flex items-baseline justify-between mb-4 pb-2 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <span className="text-blue-500">Version {release.version}</span>
                  {index === 0 && <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">Latest</span>}
                </h3>
                <span className="text-sm text-gray-500 bg-gray-50 px-2 py-0.5 rounded">{release.date}</span>
              </div>
              <ul className="space-y-3">
                {release.changes.map((change, i) => (
                  <li key={i} className="flex items-start hover:bg-gray-50 p-1.5 -ml-1.5 rounded-md transition-colors">
                    <span className="text-gray-700">{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="p-5 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangelogModal;
