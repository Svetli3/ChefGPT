import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../../components/page/login/LoginButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

const LoginPage = () => {  
    return (
        <Stack
        sx={{
            height: "100vh",                 
            justifyContent: "center",        
            alignItems: "center",            
            bgcolor: "#FFFBF5",              
        }}
        >
            <Paper
                elevation={6}                    
                sx={{
                p: { xs: 4, sm: 6, md: 8 },    
                borderRadius: 4,               
                border: "2px solid #ccc",       
                textAlign: "center",            
                bgcolor: "#white",               
                minWidth: { xs: "90%", sm: "400px", md: "500px" }, 
                }}
            >
                <Typography
                variant="h2"
                component="h2"
                sx={{ mb: { xs: 4, sm: 6 } }}   
                >
                Welcome to ChefGPT!
                </Typography>

                <LoginButton/>
            </Paper>
        </Stack>
  );
}

export default LoginPage