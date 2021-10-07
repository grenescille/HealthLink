import React, { useRef, useState, useEffect } from 'react';
import { Button, Container, Paper } from '@material-ui/core';
import { CallContextProvider } from '../context/CallContext';
import VideoChat from './VideoChat';
import Options from './Options';
import Notifications from './Notification';
import MarkerMap from './MarkerMap';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import ButtonAppBar from './ButtonAppBar';
import { Box } from '@mui/system';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Typography, AppBar } from '@mui/material';
import OutlinedCard from './Card';
import Grid from '@mui/material/Grid';
import { getAppointments } from '../APIcalls/ApiService';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];

const useStyles = makeStyles((theme) => ({
  container: {
    width: '600px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  mypaper: {
    borderRadius: 10,
  },
  mycard: {
    fontWeight: 'bold',
  },
}));
/* eslint-disable */
const AppointmentsVisualizer = ({ authorization }) => {
  const { user } = useUser();
  const [fetchedAppointments, setFetchedAppointments] = useState([]);
  // console.log('user within AppointsVisual ', user);
  useEffect(() => {
    if (user.isDoctor) {
      getAppointments('doctor', user.id).then((data) => {
        console.log('Dr data within AppointmentsVisualizer ', data);
        setFetchedAppointments(data);
      });
    } else {
      getAppointments('patient', user.id).then((data) => {
        console.log('Patient data ', data);
        setFetchedAppointments(data.data);
      });
    }
  }, []);
  if (!authorization) {
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
          <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default AppointmentsVisualizer;
