# ActionsPane

A modern React application built with TypeScript and Vite, featuring drag-and-drop functionality and flow-based interfaces.

## 🚀 Features

- Built with React 18 and TypeScript
- Drag and drop functionality using `@dnd-kit`
- Flow-based interface using `reactflow`
- State management with `zustand`
- Modern UI with Tailwind CSS
- Icon system using `lucide-react`

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **UI Libraries:**
  - DND Kit for drag and drop
  - React Flow for flow-based interfaces
  - Lucide React for icons
- **Development Tools:**
  - ESLint for code linting
  - PostCSS for CSS processing
  - TypeScript for type safety

## 🏃‍♂️ Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd ActionsPane
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code using ESLint

## 🏗️ Project Structure

```
ActionsPane/
├── src/
│   ├── components/    # React components
│   ├── data/         # Data files
│   ├── lib/          # Utility functions and helpers
│   ├── store/        # Zustand store configurations
│   ├── App.tsx       # Main application component
│   └── main.tsx      # Application entry point
├── public/           # Static assets
└── ...config files   # Various configuration files
```

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint configuration

## 🎯 Views and Controls

### Main Navigation

The application features a comprehensive sidebar with the following main sections:

- **Favorites** (`mainNavItems`) - Quick access to starred items
- **AI** (`mainNavItems`) - Artificial Intelligence related actions
- **Apps** (`appsActionItems`) - Application-specific actions
- **Logic** (`logicActionItems`) - Programming control flow actions
- **Interaction** (`interactionActionItems`) - User interface and browser automation
- **Files** (`fileActionItems`) - File system operations
- **Advanced** (`advancedActionItems`) - System-level and administrative tasks

### Additional Features

- **Templates** (`bottomNavItems`) - Pre-configured automation templates
- **Library** (`bottomNavItems`) - Resource library and saved components
- **Search** - Global search functionality
- **Filtering** (`categories`) - Category-based filtering including:
  - Lead management
  - Sales pipeline
  - Marketing campaigns
  - Customer support
  - Data management
  - Project management
  - Tickets & incidents

### UI Components

- **DraggableItem** - Drag-and-drop enabled components
- **FilterDropdown** - Category and type filtering
- **LibraryModal** - Access to saved resources
- **PropertiesPanel** - Item configuration
- **TemplatesModal** - Template management
- **Sidebar** - Main navigation and action selection

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
