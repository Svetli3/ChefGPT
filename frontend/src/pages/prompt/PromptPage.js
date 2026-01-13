import React from 'react'
import Typography from '@mui/material/Typography'

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

      <Typography variant="body1">
        {userInfo}
      </Typography>
    </>
  )
}

export default PromptPage