import { useEffect } from 'react';
import { RecipeCard } from '../../components/page/recipes/RecipeCard';
import { useRecipes } from '../../contexts/RecipePageContext';
import { CircularProgress } from '@mui/material';

export const RecipesPage = () => {
  const { recipes } = useRecipes();

  // Optional: log updates
  useEffect(() => {
    console.log("Recipes updated:", recipes);
  }, [recipes]);

  if (!recipes) return <CircularProgress size={40}/>; // still fetching
  if (recipes.length === 0) return <p>No recipes found</p>; // fetched but empty

  return (
    <div className='grid grid-cols-3 gap-4'>
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};
