import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const { isAuthenticated, user } = useAuth0();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
  const stored = sessionStorage.getItem("recipes");
    if (stored) {
      setRecipes(JSON.parse(stored));
    }

    if (user && recipes.length === 0) {
      fetchRecipes();
    }
  }, [user]);

  // Save to sessionStorage whenever recipes change
  useEffect(() => {
    sessionStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  async function fetchRecipes() {
    if (!user) return;
    try {
      let databaseUser = await axios.get(`${API_URL}/api/users/${user.email}`);
      const res = await axios.get(`${API_URL}/api/recipe/${databaseUser.data.id}`);
      
      setRecipes(res.data.recipes);
    } catch(e) {
      console.error("Failed to fetch recipes", e);
    }
  }

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes, fetchRecipes }}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  return useContext(RecipesContext);
}

