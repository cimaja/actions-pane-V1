// Import icons from lucide-react library for visual representation of different actions
import { Key, Mail, Table, GitCompare, BarChart as FlowChart, Repeat, Variable, Globe, MonitorSmartphone, Cog, Keyboard, Users, Lock, Database, Network, Terminal, FileSymlink as Xml, Clock, Archive, FileText, Folder, Code } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Defines the structure of an action section in the actions pane
 * Each section represents a group of related actions (e.g., Excel actions, Outlook actions)
 */
/**
 * Sorts an array of ActionSection objects alphabetically by category
 * Also sorts items within each section alphabetically
 */
export const sortActionSections = (sections: ActionSection[]): ActionSection[] => {
  return [...sections].sort((a, b) => a.category.localeCompare(b.category)).map(section => {
    // Sort the items alphabetically
    const sortedItems = [...section.items].sort((a, b) => a.localeCompare(b));
    
    // Sort subgroups alphabetically if they exist
    const sortedSubgroups = section.subgroups 
      ? section.subgroups.map(subgroup => ({
          ...subgroup,
          items: [...subgroup.items].sort((a, b) => a.localeCompare(b))
        })).sort((a, b) => a.name.localeCompare(b.name))
      : section.subgroups;
    
    return {
      ...section,
      items: sortedItems,
      subgroups: sortedSubgroups
    };
  });
};

export interface ActionSection {
  /** Name of the action category (e.g., 'Excel', 'Outlook') */
  category: string;
  /** Icon to represent the category visually */
  icon: LucideIcon;
  /** Tailwind CSS color class for the category */
  color: string;
  /** List of action names within this category */
  items: string[];
  /** Whether the section is collapsed in the UI */
  collapsed?: boolean;
  /** Optional nested groups of actions */
  subgroups?: {
    /** Name of the subgroup */
    name: string;
    /** List of actions in the subgroup */
    items: string[];
    /** Whether the subgroup is collapsed */
    collapsed: boolean;
  }[];
  /** Optional state to show when the section is empty */
  emptyState?: {
    /** Icon to show in empty state */
    icon: LucideIcon;
    /** Title for empty state */
    title: string;
    /** Description for empty state */
    description: string;
  };
  /** Optional mapping of items to their categories */
  itemCategories?: Record<string, string>;
  /** Optional mapping of items to their icons and colors */
  itemIcons?: Record<string, { icon: LucideIcon; color: string; }>;
}

/**
 * Actions related to specific applications like AI Builder, CyberArk, Excel, and Outlook
 * These actions represent operations that can be performed within these applications
 */
export const appsActionItems: ActionSection[] = sortActionSections([
  {
    category: 'Access',
    icon: Database,
    color: 'bg-purple-100 text-purple-600',
    items: [
      'Launch Access',
      'Read Access table',
      'Run Access query',
      'Run Access macro',
    ],
    collapsed: false
  },

  {
    category: 'CyberArk',
    icon: Key,
    color: 'bg-blue-100 text-blue-600',
    items: [
      'Get password from CyberArk',
    ],
    collapsed: false
  },
  {
    category: 'Email',
    icon: Mail,
    color: 'bg-blue-100 text-blue-600',
    items: [
      'Retrieve email messages',
      'Process email messages',
      'Send email',
    ],
    collapsed: false
  },
  {
    category: 'Excel',
    icon: Table,
    color: 'bg-green-100 text-green-600',
    items: [
      'Add new worksheet',
      'Attach to running Excel',
      'Clear cells in Excel worksheet',
      'Clear filters in Excel worksheet',
      'Close Excel',
      'Filter cells in Excel worksheet',
      'Launch Excel',
      'Read from Excel worksheet',
      'Save Excel',
      'Set active Excel worksheet',
      'Sort cells in Excel worksheet',
      'Write to Excel worksheet',
    ],
    subgroups: [
      {
        name: 'Advanced',
        items: [
          'Resize columns/rows in Excel worksheet',
          'Run Excel macro',
          'Get active Excel worksheet',
          'Get all Excel worksheets',
          'Delete Excel worksheet',
          'Rename Excel worksheet',
          'Copy Excel worksheet',
          'Activate cell in Excel worksheet',
          'Select cells in Excel worksheet',
          'Get selected cell range from Excel worksheet',
          'Copy cells from Excel worksheet',
          'Paste cells to Excel worksheet',
          'Delete from Excel worksheet',
          'Insert row to Excel worksheet',
          'Delete row from Excel worksheet',
          'Insert column to Excel worksheet',
          'Delete column from Excel worksheet',
          'Find and replace cells in Excel worksheet',
          'Get first free row on column from Excel worksheet',
          'Read formula from Excel',
          'Get table range from Excel worksheet',
          'Auto fill cells in Excel worksheet',
          'Append cells in Excel worksheet',
          'Lookup range in Excel worksheet',
          'Set color of cells in Excel worksheet'
        ],
        collapsed: true
      }
    ],
    collapsed: false
  },
  {
    category: 'Exchange Server',
    icon: Mail,
    color: 'bg-green-100 text-green-600',
    items: [
      'Connect to Exchange server',
      'Retrieve Exchange email messages',
      'Send Exchange email message',
      'Process Exchange email messages',
    ],
    collapsed: false
  },
  {
    category: 'Outlook',
    icon: Mail,
    color: 'bg-sky-100 text-sky-600',
    items: [
      'Close Outlook',
      'Launch Outlook',
      'Process email messages in Outlook',
      'Respond to Outlook message',
      'Retrieve email messages from Outlook',
      'Save Outlook email messages',
      'Send email message through Outlook',
    ],
    collapsed: false
  },
  {
    category: 'Word',
    icon: FileText,
    color: 'bg-blue-100 text-blue-600',
    items: [
      'Launch Word',
      'Attach to running Word',
      'Save Word',
      'Close Word',
      'Read from Word document',
      'Write to Word document',
      'Insert image in Word document',
      'Find and replace words in Word document',
    ],
    collapsed: false
  }
]);

/**
 * Actions related to control flow and programming logic
 * These actions allow users to create loops, conditions, and other programming constructs
 */
export const logicActionItems: ActionSection[] = [
  {
    category: 'Variables',
    icon: Variable,
    color: 'bg-indigo-100 text-indigo-600',
    items: [
      'Increase variable',
      'Decrease variable',
      'Set variable',
    ],
    collapsed: false
  },
  {
    category: 'Conditionals',
    icon: GitCompare,
    color: 'bg-blue-100 text-blue-600',
    items: [
      'Case',
      'Default case',
      'Else',
      'Else if',
      'If',
      'Switch',
    ],
    collapsed: false
  },
  {
    category: 'Loops',
    icon: Repeat,
    color: 'bg-green-100 text-green-600',
    items: [
      'Exit loop',
      'For each',
      'Loop',
      'Loop condition',
      'Next loop',
    ],
    collapsed: false
  },
  {
    category: 'Flow control',
    icon: FlowChart,
    color: 'bg-purple-100 text-purple-600',
    items: [
      'Comment',
      'End',
      'Region',
      'End region',
      'Get last error',
      'Go to',
      'Label',
      'On block error',
      'Run desktop flow',
      'Run subflow',
      'Exit subflow',
      'Stop flow',
      'Wait',
    ],
    collapsed: false
  },
];

/**
 * Actions related to user interaction and browser automation
 * These actions handle web browser operations and user interface interactions
 */
export const interactionActionItems: ActionSection[] = [
  {
    category: 'UI Automation',
    icon: MonitorSmartphone,
    color: 'bg-rose-100 text-rose-600',
    subgroups: [
      {
        name: 'Data extraction',
        items: [
          'Get details of window',
          'Get details of the UI element in window',
          'Get selected checkboxes in window',
          'Get selected radio button in window',
          'Extract data from window',
          'Extract data from table',
          'Take screenshot of UI element',
        ],
        collapsed: true
      },
      {
        name: 'Form filling',
        items: [
          'Focus text field in window',
          'Populate text field in window',
          'Press button in window',
          'Select radio button in window',
          'Set checkbox state in window',
          'Set drop-down list value in window',
        ],
        collapsed: true
      },
      {
        name: 'Window management',
        items: [
          'Get window',
          'Focus window',
          'Set window state',
          'Set window visibility',
          'Move window',
          'Resize window',
          'Close window',
        ],
        collapsed: true
      }
    ],
    items: [
      'Click UI element in window',
      'Drag and drop UI element in window',
      'Expand/collapse tree node in window',
      'If image',
      'If virtual desktop available',
      'If window',
      'If window contains',
      'Select menu option in window',
      'Select tab in window',
      'Use desktop',
      'Wait for image',
      'Wait for virtual desktop',
      'Wait for window',
      'Wait for window content',
    ],
    collapsed: false
  },
  {
    category: 'Browser Automation',
    icon: Globe,
    color: 'bg-blue-100 text-blue-600',
    items: [
      'If web page contains',
      'Wait for web page content',
      'Launch new Internet Explorer',
      'Launch new Firefox',
      'Launch new Chrome',
      'Launch new Microsoft Edge',
      'Create new tab',
      'Go to web page',
      'Click link on web page',
      'Click download link on web page',
      'Run JavaScript function on web page',
      'Hover mouse over element on web page',
      'Close web browser',
      'Extract data from web page',
      'Get details of web page',
      'Get details of element on web page',
      'Take screenshot of web page',
      'Focus text field on web page',
      'Populate text field on web page',
      'Set check box state on web page',
      'Select radio button on web page',
      'Set drop-down list value on web page',
      'Press button on web page',
    ],
    collapsed: false
  },
  {
    category: 'Mouse and keyboard',
    icon: Keyboard,
    color: 'bg-indigo-100 text-indigo-600',
    items: [
      'Block input',
      'Get mouse position',
      'Move mouse',
      'Move mouse to image',
      'Move mouse to text on screen (OCR)',
      'Send mouse click',
      'Send keys',
      'Press/release key',
      'Set key state',
      'Wait for mouse',
      'Get keyboard identifier',
      'Wait for shortcut key',
    ],
    collapsed: false
  },
  {
    category: 'Clipboard',
    icon: FileText,
    color: 'bg-emerald-100 text-emerald-600',
    items: [
      'Get clipboard text',
      'Set clipboard text',
      'Clear clipboard contents',
    ],
    collapsed: false
  },
  {
    category: 'Message boxes',
    icon: MonitorSmartphone,
    color: 'bg-rose-100 text-rose-600',
    items: [
      'Display message',
      'Display input dialog',
      'Display select date dialog',
      'Display select from list dialog',
      'Display select file dialog',
      'Display select folder dialog',
      'Display custom form',
    ],
    collapsed: false
  },
  {
    category: 'System & Environment',
    icon: Cog,
    color: 'bg-gray-100 text-gray-600',
    subgroups: [
      {
        name: 'Workstation Control',
        items: [
          'Print document',
          'Get default printer',
          'Set default printer',
          'Show desktop',
          'Lock workstation',
          'Play sound',
          'Empty recycle bin',
          'Take screenshot',
          'Control screen saver',
          'Get screen resolution',
          'Set screen resolution',
          'Log off user',
          'Shutdown computer',
        ],
        collapsed: true
      },
      {
        name: 'Environment settings',
        items: [
          'Set Windows environment variable',
          'Get Windows environment variable',
          'Delete Windows environment variable',
        ],
        collapsed: true
      },
      {
        name: 'Process Management',
        items: [
          'If process',
          'Wait for process',
          'Run application',
          'Terminate process',
          'Ping',
        ],
        collapsed: true
      }
    ],
    items: [],
    collapsed: false
  },
];

export const fileActionItems: ActionSection[] = [
  {
    category: 'Compression',
    icon: Archive,
    color: 'bg-orange-100 text-orange-600',
    items: [
      'Unzip files',
      'Zip files',
    ],
    collapsed: false
  },
  {
    category: 'Date time',
    icon: Clock,
    color: 'bg-blue-100 text-blue-600',
    items: [
      'Add to datetime',
      'Get current date and time',
      'Subtract dates',
    ],
    collapsed: false
  },
  {
    category: 'Text manipulation',
    icon: FileText,
    color: 'bg-purple-100 text-purple-600',
    items: [
      'Append line to text',
      'Get subtext',
      'Crop text',
      'Pad text',
      'Trim text',
      'Reverse text',
      'Change text case',
      'Convert text to number',
      'Convert number to text',
      'Convert text to datetime',
      'Convert datetime to text',
      'Create random text',
      'Join text',
      'Split text',
      'Parse text',
      'Replace text',
      'Escape text for regular expression',
      'Recognize entities in text',
      'Create HTML content',
    ],
    collapsed: false
  },
  {
    category: 'Folders',
    icon: Folder,
    color: 'bg-amber-100 text-amber-600',
    items: [
      'If folder exists',
      'Get files in folder',
      'Get subfolders in folder',
      'Create folder',
      'Delete folder',
      'Empty folder',
      'Copy folder',
      'Move folder',
      'Rename folder',
      'Get special folder',
    ],
    collapsed: false
  },
  {
    category: 'Files',
    icon: Folder,
    color: 'bg-yellow-100 text-yellow-600',
    items: [
      'Convert Base64 to file',
      'Convert binary data to file',
      'Convert file to Base64',
      'Convert file to binary data',
      'Copy file(s)',
      'Delete file(s)',
      'Get file path part',
      'Get temporary file',
      'If file exists',
      'Move file(s)',
      'Read from CSV file',
      'Read text from file',
      'Rename file(s)',
      'Wait for file',
      'Write text to file',
      'Write to CSV file',
    ],
    collapsed: false
  },
  {
    category: 'PDF',
    icon: FileText,
    color: 'bg-red-100 text-red-600',
    items: [
      'Extract images from PDF',
      'Extract PDF file pages to new PDF file',
      'Extract tables from PDF',
      'Extract text from PDF',
      'Merge PDF files',
    ],
    collapsed: false
  },
];

/**
 * Advanced system-level actions
 * These actions handle more complex operations like Active Directory management
 * and other system administration tasks
 */
export const advancedActionItems: ActionSection[] = [
  {
    category: 'Active Directory',
    icon: Users,
    color: 'bg-blue-100 text-blue-600',
    items: [],
    subgroups: [
      {
        name: 'Group',
        items: [
          'Create group',
          'Get group info',
          'Get group members',
          'Modify group',
        ],
        collapsed: true
      },
      {
        name: 'Object',
        items: [
          'Create object',
          'Delete object',
          'Move object',
          'Rename object',
        ],
        collapsed: true
      },
      {
        name: 'User',
        items: [
          'Create user',
          'Get user info',
          'Modify user',
          'Unlock user',
          'Update user info',
          'Connect to server',
          'Close connection',
          'Add user to group',
          'Remove user from group',
        ],
        collapsed: true
      },
    ],
    collapsed: false
  },
  {
    category: 'Windows services',
    icon: Cog,
    color: 'bg-stone-100 text-stone-600',
    items: [
      'If service',
      'Wait for service',
      'Start service',
      'Stop service',
      'Pause service',
      'Resume service',
    ],
    collapsed: false
  },
  {
    category: 'Work queues',
    icon: Table,
    color: 'bg-lime-100 text-lime-600',
    items: [
      'Process work queue items',
      'Update work queue item',
      'Add work queue item',
      'Add multiple work queue items',
      'Requeue item with delay',
      'Update work queue item processing notes',
      'Get work queue items by filter',
    ],
    collapsed: false
  },
  {
    category: 'HTTP',
    icon: Globe,
    color: 'bg-sky-100 text-sky-600',
    items: [
      'Download from web',
      'Invoke SOAP web service',
      'Invoke web service',
    ],
    collapsed: false
  },
  {
    category: 'FTP',
    icon: Network,
    color: 'bg-fuchsia-100 text-fuchsia-600',
    items: [
      'Open FTP connection',
      'List FTP directory',
      'Open secure FTP connection',
      'Close connection',
      'Change working directory',
      'Download file(s) from FTP',
      'Download folder(s) from FTP',
      'Upload file(s) to FTP',
      'Upload folder(s) to FTP',
      'Delete FTP file',
      'Rename FTP file',
      'Create FTP directory',
      'Delete FTP directory',
      'Invoke FTP command',
      'Synchronize directories',
    ],
    collapsed: false
  },
  {
    category: 'SQL',
    icon: Database,
    color: 'bg-teal-100 text-teal-600',
    items: [
      'Open SQL connection',
      'Execute SQL statement',
      'Close SQL connection',
    ],
    collapsed: false
  },
  {
    category: 'Scripting',
    icon: Code,
    color: 'bg-indigo-100 text-indigo-600',
    items: [
      'Run DOS command',
      'Run VBScript',
      'Run JavaScript',
      'Run PowerShell script',
      'Run Python script',
      'Run .NET script',
    ],
    collapsed: false
  },
  {
    category: 'Cryptography',
    icon: Lock,
    color: 'bg-violet-100 text-violet-600',
    items: [
      'Encrypt text with AES',
      'Decrypt text with AES',
      'Encrypt from file with AES',
      'Decrypt to file with AES',
      'Hash text',
      'Hash from file',
      'Hash text with key',
      'Hash from file with key',
      'Generate random key',
    ],
    collapsed: false
  },
  {
    category: 'CMD session',
    icon: Terminal,
    color: 'bg-slate-100 text-slate-600',
    items: [
      'Open CMD session',
      'Read from CMD session',
      'Write to CMD session',
      'Wait for text on CMD session',
      'Close CMD session',
    ],
    collapsed: false
  },
  {
    category: 'Terminal emulation',
    icon: Terminal,
    color: 'bg-zinc-100 text-zinc-600',
    items: [
      'Open terminal session',
      'Close terminal session',
      'Move cursor on terminal session',
      'Get text from terminal session',
      'Set text on terminal session',
      'Send key to terminal session',
      'Wait for text on terminal session',
      'Search for text on terminal session',
    ],
    collapsed: false
  },
  {
    category: 'Database',
    icon: Database,
    color: 'bg-emerald-100 text-emerald-600',
    items: [
      'Delete database record',
      'Execute SQL query',
      'Get database records',
      'Insert database record',
      'Update database record',
    ],
    collapsed: false
  },
  {
    category: 'Network',
    icon: Network,
    color: 'bg-cyan-100 text-cyan-600',
    items: [
      'Download file',
      'Get DNS records',
      'HTTP request',
      'Ping host',
      'Upload file',
    ],
    collapsed: false
  },
  {
    category: 'Terminal',
    icon: Terminal,
    color: 'bg-gray-100 text-gray-600',
    items: [
      'Execute command',
      'Get command output',
      'Kill process',
      'Wait for process',
    ],
    collapsed: false
  },
  {
    category: 'XML',
    icon: Xml,
    color: 'bg-orange-100 text-orange-600',
    items: [
      'Read XML from file',
      'Write XML to file',
      'Execute XPath expression',
      'Get XML element attribute',
      'Set XML element attribute',
      'Remove XML element attribute',
      'Get XML element value',
      'Set XML element value',
      'Insert XML element',
      'Remove XML element',
      'Create XML',
      'Parse XML',
      'Query XML with XPath',
      'Transform XML with XSLT',
    ],
    collapsed: false
  },
];