import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Logout } from '../APIcalls/ApiService';
import { useUser } from '../context/UserContext';
import { Redirect, useHistory } from 'react-router-dom';

export default function ButtonAppBar() {
  const { userAuth, setUserAuth } = useUser();
  const history = useHistory();
  const handleLogout = () => {
    Logout();
    // setUserAuth(false);
    history.push('/login');
    // return <Redirect to="/login" />;
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            data-testid="NEWS"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            News
          </Typography>
          <Button color="inherit" data-testid="logout" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
