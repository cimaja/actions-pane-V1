import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { ThemeProvider } from '@fluentui/react';
import App from './App.tsx';
import './index.css';

// Initialize Fluent UI icons
initializeIcons();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
