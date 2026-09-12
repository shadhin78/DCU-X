import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initSecurityProtection } from './utils/security.ts';
import { registerServiceWorker } from './registerServiceWorker.ts';

// Enable devtool and right-click restriction protections
initSecurityProtection();

// Register PWA service worker
registerServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
