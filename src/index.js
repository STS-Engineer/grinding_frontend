import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ShiftProvider } from './context';  // Ensure correct import path
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ShiftProvider>
      <App />
    </ShiftProvider>
  </React.StrictMode>
);

reportWebVitals();
