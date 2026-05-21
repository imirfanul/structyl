import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@aura-ui/themes';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="slate" defaultMode="system">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
