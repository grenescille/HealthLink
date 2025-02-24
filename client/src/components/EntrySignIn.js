import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
<<<<<<< HEAD
import { useHistory } from 'react-router-dom';
=======

import { useHistory, Redirect } from 'react-router-dom';
>>>>>>> backend
import { useUser } from '../context/UserContext';
import { login } from '../APIcalls/ApiService';

const initialLoginState = { email: '', password: '' };

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Health Link
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  let history = useHistory();

<<<<<<< HEAD
  const { setPassword, setUserEmail, setUserAuth, Login, user, getAllDoctors } =
    useUser();

  const handleRegister = () => {
    history.push('/register');
  };

  const handleUserEmail = (event) => {
    setUserEmail(event.target.value);
  };

  const handleUserPass = (event) => {
    setPassword(event.target.value);
=======
  const { setUserAuth } = useUser();
  const [userLogin, setUserLogin] = useState(initialLoginState);
  const { user, setUser } = useUser();

  const handleRegister = () => {
    // console.log('handleChangeReg');
    // return <Redirect to="/register" />;

    history.push('/register');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserLogin((prevState) => ({ ...prevState, [name]: value }));
>>>>>>> backend
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
<<<<<<< HEAD
    const data = new FormData(event.currentTarget);
    let validLogin = await Login();
    if (validLogin) {
=======

    let validLogin = await login(userLogin);

    if (validLogin) {
      console.log('validLogin within EntrySignIn ', validLogin);
      setUser({ ...validLogin });
>>>>>>> backend
      setUserAuth(true);
      history.push('/');
    }
<<<<<<< HEAD
    history.push('/');
=======
>>>>>>> backend
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/resources/logo.png)',
            backgroundColor: '#1BD7DB',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    data-testid="registerLink"
                    variant="body2"
                    onClick={handleRegister}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
