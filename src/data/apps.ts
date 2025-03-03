import type { LucideIcon } from 'lucide-react';
import { 
  FileText, Database, Mail, Globe, Cloud, MessageSquare, Calendar, Users, 
  CheckSquare, Trello, Github, BarChart, Twitter, Folder, FileCode, 
  Slack, CreditCard, ShoppingCart, FileSpreadsheet, Video, Clipboard, 
  BookOpen, Map, Link, Send, Instagram, Linkedin, Youtube, Rss, 
  Server, Lock, PenTool, Headphones, Briefcase, BarChart2, FileQuestion,
  Smartphone, Clock, DollarSign, Package, Truck, HelpCircle, Zap
} from 'lucide-react';

export interface App {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  category: string;
  premium?: boolean;
  dateAdded?: string; // ISO date string
}

export const appCategories = [
  { id: 'microsoft', label: 'Microsoft' },
  { id: 'google', label: 'Google' },
  { id: 'social', label: 'Social Media' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'storage', label: 'Storage & Files' },
  { id: 'communication', label: 'Communication' },
  { id: 'business', label: 'Business' },
  { id: 'developer', label: 'Developer Tools' }
];

export const apps: App[] = [
  {
    id: 'sharepoint',
    name: 'SharePoint',
    description: 'Document management and storage system',
    icon: FileText,
    color: 'text-blue-600',
    category: 'microsoft',
    premium: true,
    dateAdded: '2025-02-25T10:00:00Z'
  },
  {
    id: 'office365-outlook',
    name: 'Office 365 Outlook',
    description: 'Email and calendar service',
    icon: Mail,
    color: 'text-blue-500',
    category: 'microsoft',
    premium: true,
    dateAdded: '2025-02-26T14:30:00Z'
  },
  {
    id: 'onedrive-business',
    name: 'OneDrive for Business',
    description: 'File hosting and synchronization service',
    icon: Cloud,
    color: 'text-blue-400',
    category: 'microsoft'
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    description: 'Team collaboration and communication platform',
    icon: MessageSquare,
    color: 'text-purple-600',
    category: 'microsoft'
  },
  {
    id: 'excel-online',
    name: 'Excel Online (Business)',
    description: 'Online spreadsheet service',
    icon: FileSpreadsheet,
    color: 'text-green-600',
    category: 'microsoft'
  },
  {
    id: 'planner',
    name: 'Planner',
    description: 'Task management tool',
    icon: CheckSquare,
    color: 'text-green-500',
    category: 'microsoft'
  },
  {
    id: 'forms',
    name: 'Forms',
    description: 'Survey and quiz creation tool',
    icon: Clipboard,
    color: 'text-purple-500',
    category: 'microsoft'
  },
  {
    id: 'power-bi',
    name: 'Power BI',
    description: 'Business analytics service',
    icon: BarChart,
    color: 'text-yellow-600',
    category: 'microsoft'
  },
  {
    id: 'dynamics-365',
    name: 'Dynamics 365',
    description: 'Enterprise resource planning and CRM',
    icon: Users,
    color: 'text-blue-600',
    category: 'microsoft'
  },
  {
    id: 'sql-server',
    name: 'SQL Server',
    description: 'Relational database management system',
    icon: Database,
    color: 'text-red-600',
    category: 'microsoft'
  },
  {
    id: 'adobe-sign',
    name: 'Adobe Acrobat Sign',
    description: 'Electronic signature service',
    icon: PenTool,
    color: 'text-red-500',
    category: 'business',
    premium: true
  },
  {
    id: 'docusign',
    name: 'DocuSign',
    description: 'Electronic signature and agreement cloud',
    icon: FileText,
    color: 'text-blue-500',
    category: 'business'
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Email service by Google',
    icon: Mail,
    color: 'text-red-500',
    category: 'google'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    description: 'Social networking service',
    icon: Twitter,
    color: 'text-blue-400',
    category: 'social'
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'File hosting service',
    icon: Folder,
    color: 'text-blue-500',
    category: 'storage'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Business communication platform',
    icon: Slack,
    color: 'text-purple-600',
    category: 'communication'
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Marketing automation platform',
    icon: Mail,
    color: 'text-yellow-500',
    category: 'business'
  },
  {
    id: 'trello',
    name: 'Trello',
    description: 'Web-based Kanban-style list-making application',
    icon: Trello,
    color: 'text-blue-500',
    category: 'productivity'
  },
  {
    id: 'asana',
    name: 'Asana',
    description: 'Web and mobile work management platform',
    icon: CheckSquare,
    color: 'text-red-400',
    category: 'productivity',
    premium: true
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Software development and version control',
    icon: Github,
    color: 'text-gray-800',
    category: 'developer'
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Issue tracking product',
    icon: CheckSquare,
    color: 'text-blue-500',
    category: 'developer'
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Customer relationship management service',
    icon: Cloud,
    color: 'text-blue-600',
    category: 'business'
  },
  {
    id: 'http',
    name: 'HTTP',
    description: 'Make HTTP requests to any API',
    icon: Globe,
    color: 'text-gray-600',
    category: 'developer'
  },
  {
    id: 'azure-devops',
    name: 'Azure DevOps',
    description: 'Development collaboration tools',
    icon: FileCode,
    color: 'text-blue-600',
    category: 'microsoft'
  },
  {
    id: 'onedrive',
    name: 'OneDrive',
    description: 'File hosting service and synchronization service',
    icon: Cloud,
    color: 'text-blue-500',
    category: 'microsoft'
  },
  {
    id: 'outlook',
    name: 'Outlook.com',
    description: 'Personal email service',
    icon: Mail,
    color: 'text-blue-500',
    category: 'microsoft'
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Time-management and scheduling calendar service',
    icon: Calendar,
    color: 'text-blue-500',
    category: 'google'
  },
  {
    id: 'google-contacts',
    name: 'Google Contacts',
    description: 'Contact management tool',
    icon: Users,
    color: 'text-blue-500',
    category: 'google'
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'File storage and synchronization service',
    icon: Folder,
    color: 'text-green-500',
    category: 'google'
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    description: 'Spreadsheet program',
    icon: FileSpreadsheet,
    color: 'text-green-600',
    category: 'google'
  },
  {
    id: 'google-tasks',
    name: 'Google Tasks',
    description: 'Task management service',
    icon: CheckSquare,
    color: 'text-blue-500',
    category: 'google'
  },
  {
    id: 'bing-maps',
    name: 'Bing Maps',
    description: 'Web mapping service',
    icon: Map,
    color: 'text-blue-500',
    category: 'microsoft'
  },
  {
    id: 'bitly',
    name: 'Bitly',
    description: 'URL shortening service',
    icon: Link,
    color: 'text-red-500',
    category: 'productivity'
  },
  {
    id: 'blogger',
    name: 'Blogger',
    description: 'Blog-publishing service',
    icon: BookOpen,
    color: 'text-orange-500',
    category: 'google'
  },
  {
    id: 'box',
    name: 'Box',
    description: 'Cloud content management and file sharing service',
    icon: Folder,
    color: 'text-blue-500',
    category: 'storage'
  },
  {
    id: 'buffer',
    name: 'Buffer',
    description: 'Social media management platform',
    icon: Send,
    color: 'text-blue-500',
    category: 'social'
  },
  {
    id: 'campfire',
    name: 'Campfire',
    description: 'Web-based group chat tool',
    icon: MessageSquare,
    color: 'text-green-500',
    category: 'communication'
  },
  {
    id: 'cisco-webex',
    name: 'Cisco Webex Meetings',
    description: 'Video conferencing service',
    icon: Video,
    color: 'text-blue-500',
    category: 'communication'
  },
  {
    id: 'cognito-forms',
    name: 'Cognito Forms',
    description: 'Online form builder',
    icon: Clipboard,
    color: 'text-green-500',
    category: 'productivity'
  },
  {
    id: 'disqus',
    name: 'Disqus',
    description: 'Blog comment hosting service',
    icon: MessageSquare,
    color: 'text-blue-500',
    category: 'social'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Social media and social networking service',
    icon: Users,
    color: 'text-blue-600',
    category: 'social'
  },
  {
    id: 'freshdesk',
    name: 'Freshdesk',
    description: 'Cloud-based customer support software',
    icon: HelpCircle,
    color: 'text-green-500',
    category: 'business'
  },
  {
    id: 'ftp',
    name: 'FTP',
    description: 'File Transfer Protocol',
    icon: Folder,
    color: 'text-gray-600',
    category: 'developer'
  },
  {
    id: 'gotomeeting',
    name: 'GoToMeeting',
    description: 'Online meeting, desktop sharing, and video conferencing software',
    icon: Video,
    color: 'text-green-500',
    category: 'communication'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Photo and video sharing social networking service',
    icon: Instagram,
    color: 'text-pink-500',
    category: 'social'
  },
  {
    id: 'intercom',
    name: 'Intercom',
    description: 'Customer messaging platform',
    icon: MessageSquare,
    color: 'text-blue-500',
    category: 'business'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Business and employment-oriented online service',
    icon: Linkedin,
    color: 'text-blue-600',
    category: 'social'
  },
  {
    id: 'medium',
    name: 'Medium',
    description: 'Online publishing platform',
    icon: BookOpen,
    color: 'text-gray-800',
    category: 'social'
  },
  {
    id: 'mysql',
    name: 'MySQL',
    description: 'Open-source relational database management system',
    icon: Database,
    color: 'text-blue-500',
    category: 'developer'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Online payments system',
    icon: CreditCard,
    color: 'text-blue-600',
    category: 'business'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    description: 'Image sharing and social media service',
    icon: Globe,
    color: 'text-red-600',
    category: 'social'
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks Online',
    description: 'Accounting software package',
    icon: DollarSign,
    color: 'text-green-600',
    category: 'business'
  },
  {
    id: 'rss',
    name: 'RSS',
    description: 'Web feed',
    icon: Rss,
    color: 'text-orange-500',
    category: 'productivity'
  },
  {
    id: 'sftp',
    name: 'SFTP',
    description: 'SSH File Transfer Protocol',
    icon: Lock,
    color: 'text-gray-600',
    category: 'developer'
  },
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'E-commerce platform',
    icon: ShoppingCart,
    color: 'text-green-500',
    category: 'business'
  },
  {
    id: 'smartsheet',
    name: 'Smartsheet',
    description: 'Work management platform',
    icon: FileSpreadsheet,
    color: 'text-blue-500',
    category: 'productivity'
  },
  {
    id: 'smtp',
    name: 'SMTP',
    description: 'Simple Mail Transfer Protocol',
    icon: Mail,
    color: 'text-gray-600',
    category: 'developer'
  },
  {
    id: 'surveymonkey',
    name: 'SurveyMonkey',
    description: 'Online survey development cloud-based software',
    icon: FileQuestion,
    color: 'text-green-500',
    category: 'productivity'
  },
  {
    id: 'twilio',
    name: 'Twilio',
    description: 'Cloud communications platform',
    icon: Smartphone,
    color: 'text-red-500',
    category: 'developer'
  },
  {
    id: 'typeform',
    name: 'Typeform',
    description: 'Online form builder',
    icon: Clipboard,
    color: 'text-blue-500',
    category: 'productivity'
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    description: 'Content management system',
    icon: Globe,
    color: 'text-blue-500',
    category: 'productivity'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    description: 'Video sharing service',
    icon: Youtube,
    color: 'text-red-600',
    category: 'social'
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    description: 'Customer service software and support ticket system',
    icon: HelpCircle,
    color: 'text-green-500',
    category: 'business'
  },
  {
    id: 'zoho-crm',
    name: 'Zoho CRM',
    description: 'Customer relationship management software',
    icon: Users,
    color: 'text-red-500',
    category: 'business'
  },
  {
    id: 'eventbrite',
    name: 'Eventbrite',
    description: 'Event management and ticketing website',
    icon: Calendar,
    color: 'text-orange-500',
    category: 'business'
  },
  {
    id: 'evernote',
    name: 'Evernote',
    description: 'App designed for note taking and archiving',
    icon: BookOpen,
    color: 'text-green-500',
    category: 'productivity'
  },
  {
    id: 'http-azure-ad',
    name: 'HTTP with Azure AD',
    description: 'HTTP connector with Azure Active Directory authentication',
    icon: Lock,
    color: 'text-blue-600',
    category: 'microsoft'
  },
  {
    id: 'infusionsoft',
    name: 'Infusionsoft',
    description: 'Sales and marketing software for small businesses',
    icon: BarChart2,
    color: 'text-green-500',
    category: 'business'
  },
  {
    id: 'mailjet',
    name: 'Mailjet',
    description: 'Email delivery service',
    icon: Mail,
    color: 'text-purple-500',
    category: 'communication'
  },
  {
    id: 'mandrill',
    name: 'Mandrill',
    description: 'Transactional email API for Mailchimp',
    icon: Mail,
    color: 'text-blue-500',
    category: 'communication'
  },
  {
    id: 'marketo',
    name: 'Marketo',
    description: 'Marketing automation software',
    icon: BarChart,
    color: 'text-purple-600',
    category: 'business'
  },
  {
    id: 'microsoft-bookings',
    name: 'Microsoft Bookings',
    description: 'Appointment scheduling and management system',
    icon: Calendar,
    color: 'text-blue-500',
    category: 'microsoft'
  },
  {
    id: 'microsoft-forms-pro',
    name: 'Microsoft Forms Pro',
    description: 'Survey and quiz maker',
    icon: Clipboard,
    color: 'text-purple-500',
    category: 'microsoft'
  },
  {
    id: 'microsoft-kaizala',
    name: 'Microsoft Kaizala',
    description: 'Mobile chat-based communication and work management app',
    icon: MessageSquare,
    color: 'text-blue-500',
    category: 'microsoft'
  },
  {
    id: 'microsoft-staffhub',
    name: 'Microsoft StaffHub',
    description: 'Schedule management tool',
    icon: Clock,
    color: 'text-blue-500',
    category: 'microsoft'
  },
  {
    id: 'nexmo',
    name: 'Nexmo',
    description: 'Cloud communications platform',
    icon: Smartphone,
    color: 'text-blue-500',
    category: 'communication'
  },
  {
    id: 'office365-groups',
    name: 'Office 365 Groups',
    description: 'Cross-application membership service',
    icon: Users,
    color: 'text-blue-500',
    category: 'microsoft'
  },
  {
    id: 'office365-users',
    name: 'Office 365 Users',
    description: 'User management for Office 365',
    icon: Users,
    color: 'text-blue-500',
    category: 'microsoft'
  },
  {
    id: 'plumsail-documents',
    name: 'Plumsail Documents',
    description: 'Document generation and automation',
    icon: FileText,
    color: 'text-purple-500',
    category: 'productivity'
  },
  {
    id: 'plumsail-forms',
    name: 'Plumsail Forms',
    description: 'Form builder for SharePoint and Microsoft Teams',
    icon: Clipboard,
    color: 'text-purple-500',
    category: 'productivity'
  },
  {
    id: 'plumsail-helpdesk',
    name: 'Plumsail HelpDesk',
    description: 'Ticketing system for SharePoint',
    icon: HelpCircle,
    color: 'text-purple-500',
    category: 'productivity'
  },
  {
    id: 'plumsail-sp',
    name: 'Plumsail SP',
    description: 'SharePoint automation',
    icon: FileText,
    color: 'text-purple-500',
    category: 'productivity'
  },
  {
    id: 'powerapps-notification',
    name: 'PowerApps Notification',
    description: 'Send push notifications to PowerApps',
    icon: Zap,
    color: 'text-purple-500',
    category: 'microsoft'
  },
  {
    id: 'project-online',
    name: 'Project Online',
    description: 'Project management service',
    icon: Briefcase,
    color: 'text-green-500',
    category: 'microsoft'
  },
  {
    id: 'reddit',
    name: 'Reddit',
    description: 'Social news aggregation and discussion website',
    icon: Globe,
    color: 'text-orange-500',
    category: 'social'
  },
  {
    id: 'salesforce-marketing-cloud',
    name: 'Salesforce Marketing Cloud',
    description: 'Digital marketing platform',
    icon: BarChart,
    color: 'text-blue-500',
    category: 'business'
  },
  {
    id: 'servicenow',
    name: 'ServiceNow',
    description: 'Cloud computing platform',
    icon: Cloud,
    color: 'text-green-500',
    category: 'business'
  },
  {
    id: 'skype-business',
    name: 'Skype for Business Online',
    description: 'Business communication platform',
    icon: Video,
    color: 'text-blue-500',
    category: 'microsoft'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Online payment processing',
    icon: CreditCard,
    color: 'text-blue-500',
    category: 'business'
  },
  {
    id: 'sugarcrm',
    name: 'SugarCRM',
    description: 'Customer relationship management system',
    icon: Users,
    color: 'text-red-500',
    category: 'business'
  },
  {
    id: 'toggl',
    name: 'Toggl',
    description: 'Time tracking software',
    icon: Clock,
    color: 'text-red-500',
    category: 'productivity'
  }
];