## Project Overview

First design prototype for the Power Automate Desktop actions pane. Test it -> https://cimaja.github.io/actions-pane-V1/

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
