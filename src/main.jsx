import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { BrandDataProvider } from './context/BrandDataContext';
import { CrmDataProvider } from './context/CrmDataContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BrandDataProvider>
          <CrmDataProvider>
            <App />
          </CrmDataProvider>
        </BrandDataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
