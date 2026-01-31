import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';


const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && <Button startIcon={<LogoutIcon/>} onClick={() => logout()}>Log Out</Button>
  )
}

export default LogoutButton