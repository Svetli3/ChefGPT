import Avatar from "@mui/material/Avatar";
import { Link, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Header({user}) {  
  return (
    <header className="h-20 px-6 bg-white border-b">

      <div className="grid grid-cols-3 h-full items-center">

        {/* Logo/Home page redirect */}
        <Link 
          component={RouterLink} 
          to="/" 
          sx={{ display: 'flex', alignItems: 'center' }}
          className="justify-self-start"
        >
          <Box
            component="img"
            src="/images/logo.png"
            alt="ChefGPT"
            sx={{ maxHeight: 50, maxWidth: 50 }}
          />
        </Link>
       
        {/* Recipes Page */}
        <Link 
          component={RouterLink} 
          to="/recipes" 
          sx={{ display: 'flex', alignItems: 'center' }}
          className="justify-self-center"
        >
          <Box
            component="img"
            src="/images/recipes-page-logo.jpg"
            alt="Your Recipes"
            sx={{ maxHeight: 80, maxWidth: 80 }}
          />
        </Link>

        {/* User profile */}
        <Avatar 
          className="justify-self-end" 
          alt={user.nickname} 
          src={user.picture} 
          slotProps={{img: {draggable: false} }} 
          sx={{ maxWidth: 'md' }}
        />
      
        
      </div>
    </header>
  );
}
export default Header;
