import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';


const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <Button 
            variant='contained'
            sx={{
              width: {
                xs: "60%",   
                sm: "75%",   
                md: "100%",   
              },
              fontSize: {
                xs: "1.5rem",
                sm: "1.75rem",
                md: "2rem",
              },
              padding: {
                xs: "8px 16px",
                sm: "12px 24px",
                md: "16px 32px",
              },
            }} 
            onClick={() => loginWithRedirect()}>Sign In</Button>
        )
  )
}

export default LoginButton
