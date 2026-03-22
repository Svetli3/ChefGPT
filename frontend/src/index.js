import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import AuthProviderWithNavigate from './components/utils/AuthProviderWithNavigate';
import App from './App';
import "./index.css";
import { RecipesProvider } from './contexts/RecipePageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <BrowserRouter>
      <AuthProviderWithNavigate>
          <RecipesProvider>
            <App />
          </RecipesProvider>
      </AuthProviderWithNavigate>
    </BrowserRouter>
    
  </React.StrictMode>
);


