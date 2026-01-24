import React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export const PromptPage = ({user}) => {
  const userInfo = Object.entries(user).map(([key, value]) => (
  <Typography key={key}>
    {key}: {String(value)}
  </Typography>
));
  
  return (
    <>
      <Typography variant="h1" align="center" gutterBottom>
        Prompt Page
      </Typography>

      <Grid container spacing={2}>{userInfo}</Grid>
    </>
  )
}

export default PromptPage