import { Lock, Terminal, FileCode, FileText, Database, Mail, Globe, Table, Bot, GitCompare, Variable } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Template {
  id: string;
  title: string;
  description: string;
  author: string;
  usedActions: {
    icon: LucideIcon;
    color: string;
  }[];
}

export const templates: Template[] = [
  {
    id: 'login-session',
    title: 'Login and session handling for web apps',
    description: 'Automate login for web applications, handling session persistence and multi-factor authentication if needed.',
    author: 'Power Automate',
    usedActions: [
      { icon: Globe, color: 'text-blue-600' },
      { icon: Variable, color: 'text-indigo-600' },
      { icon: Lock, color: 'text-violet-600' }
    ]
  },
  {
    id: 'exception-handling',
    title: 'Exception handling and logging',
    description: 'Standardized error handling and logging mechanism that records errors and sends notifications when failures occur.',
    author: 'Power Automate',
    usedActions: [
      { icon: Terminal, color: 'text-gray-600' },
      { icon: Mail, color: 'text-sky-600' }
    ]
  },
  {
    id: 'image-recognition',
    title: 'Image recognition and click',
    description: 'Detect an image (e.g., button, icon) on the screen and click it dynamically.',
    author: 'Power Automate',
    usedActions: [
      { icon: FileCode, color: 'text-emerald-600' },
      { icon: Bot, color: 'text-purple-600' }
    ]
  },
  {
    id: 'pdf-extraction',
    title: 'PDF data extraction',
    description: 'Extract text, tables, or specific data points from PDF files for further processing.',
    author: 'Power Automate',
    usedActions: [
      { icon: FileText, color: 'text-red-600' },
      { icon: Table, color: 'text-green-600' }
    ]
  },
  {
    id: 'database-query',
    title: 'Database Query',
    description: 'Connect to a SQL database, execute a query, and return results as a dataset.',
    author: 'Power Automate',
    usedActions: [
      { icon: Database, color: 'text-emerald-600' },
      { icon: Variable, color: 'text-indigo-600' }
    ]
  },
  {
    id: 'email-parsing',
    title: 'Email parsing and extraction',
    description: 'Extract key information from incoming emails, such as sender, subject, attachments, or specific keywords, and pass the data to another subflow.',
    author: 'Power Automate',
    usedActions: [
      { icon: Mail, color: 'text-sky-600' },
      { icon: GitCompare, color: 'text-blue-600' }
    ]
  },
  {
    id: 'web-scraping',
    title: 'Data scraping from webpages',
    description: 'Scrape structured data (tables, prices, product details) from a webpage and store it in an Excel file or a database.',
    author: 'Power Automate',
    usedActions: [
      { icon: Globe, color: 'text-blue-600' },
      { icon: Table, color: 'text-green-600' },
      { icon: Database, color: 'text-emerald-600' }
    ]
  },
  {
    id: 'csv-excel',
    title: 'CSV and excel data processing',
    description: 'Read, clean, filter, and format data from a CSV or Excel file before passing it to another workflow.',
    author: 'Power Automate',
    usedActions: [
      { icon: Table, color: 'text-green-600' },
      { icon: FileText, color: 'text-red-600' }
    ]
  }
];