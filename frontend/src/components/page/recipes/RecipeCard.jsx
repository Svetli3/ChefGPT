import { Avatar, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import React from 'react'

export const RecipeCard = ({ recipe }) => {
    console.log(recipe);
  return (
    <Card>
        <CardContent>
            <div className='flex flex-col items-center'>
                {/* Title + Image */}
                <Stack spacing={2}>
                    <div className='flex items-center gap-x-2'>
                        <Typography gutterBottom variant='h5'> {recipe.title} </Typography>
                        <CardMedia component="img" image={ recipe.imageUrl } sx={{ maxHeight: 100, maxWidth: 100 }}/>
                    </div>
                </Stack>
                
                {/* Difficulty, No. of Ingredients, Preparation Time, Cooking Time, Calories */}
                <Stack spacing={1}>
                    <div className='flex items-center gap-x-2 relative'>
                        { Array.from({length: recipe.difficulty}).map((_, i) => (
                            <>
                                <div className='relative mr-10 h-10'>
                                    <Avatar src='/images/difficulty-image-fire.png' sx={ {position: 'absolute', zIndex: '10'} }/>
                                    <Avatar src='/images/difficulty-image-pan.png' sx={ {position: 'absolute'} }/>
                                </div>
                            </>
                        ))}
                    </div>
                    <Typography variant='h6'>No. of Ingredients: {recipe.noOfIngredients}</Typography>
                    <Typography variant='h6'>Preparation Time: {recipe.preparationTime} minutes</Typography>
                    <Typography variant='h6'>Cooking Time: {recipe.cookingTime} minutes</Typography>
                    <Typography variant='h6'>Calories (kcal): {recipe.recipeCalories}kcal</Typography>
                </Stack>
            </div>
        </CardContent>
    </Card>
  )
}
