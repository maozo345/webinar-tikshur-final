import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (!container) {
  console.error("FATAL ERROR: Could not find element with id 'root' in index.html");
  document.body.innerHTML = '<div style="color: white; padding: 20px;">Failed to find root element. Please check console.</div>';
} else {
  console.log("Found root element, mounting React app...");
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}