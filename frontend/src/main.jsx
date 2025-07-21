import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { IntelProvider } from './context/IntelContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <IntelProvider>
    <App />
  </IntelProvider>
);
