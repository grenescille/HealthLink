import React from 'react';
import { Container } from '@material-ui/core';
import MarkerMap from './MarkerMap';
import { Redirect } from 'react-router-dom';
import ButtonAppBar from './ButtonAppBar';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';

const AppointmentsVisualizer = ({ authorization }) => {
  if (!authorization) {
    console.log('not authorized!');
    return <Redirect to="login" />;
  }

  return (
    <div>
      <ButtonAppBar />

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid item xs={12}>
            <MarkerMap />
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default AppointmentsVisualizer;
