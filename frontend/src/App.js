import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/home/HomePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import CircularProgress from "@mui/material/CircularProgress";
import LoginPage from "./pages/login/LoginPage";
import Callback from "./pages/auth/Callback";

import "./styling/global/App.css";
import { RecipesPage } from "./pages/recipes/RecipesPage";
import { RecipesProvider } from "./contexts/RecipePageContext";

function App() {
  const { isLoading, error, isAuthenticated, user } = useAuth0();

  if (isLoading) return <CircularProgress size={40} />;
  if (error) return <p>Authentication Error</p>;
  
  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/prompt" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/prompt" replace /> : <LoginPage />
        }
      />

      <Route
        path="/prompt"
        element={
          isAuthenticated ? 
          <MainLayout user={user}><HomePage/></MainLayout> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/recipes"
        element={
          isAuthenticated ? 
          <MainLayout user={user}>
              <RecipesPage/>
          </MainLayout> : <Navigate to="/login" replace />
        }
      />

      <Route path="/callback" element={<Callback />} />
    </Routes>
  );
}

export default App;