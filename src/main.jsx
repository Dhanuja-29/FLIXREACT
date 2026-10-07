// ============================================
// MAIN.JSX — The Entry Point
// ============================================
// 🎓 LEARNING CONCEPT: How React "mounts" to the DOM
//
// This file answers the question:
//   "How does React get on the page?"
//
// Steps:
//   1. We import React and ReactDOM
//   2. We find the <div id="root"> in index.html
//   3. We tell React to render our <App> component inside it
//   4. React takes over from there!
//
// StrictMode: a development tool that warns about potential
// issues. It has NO effect on production builds.
// ============================================

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Find the root element and mount our React app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
