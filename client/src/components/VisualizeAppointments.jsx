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
  console.log('appointmentsVisualizer: render ');
  const { user } = useUser();
  const [fetchedAppointments, setFetchedAppointments] = useState({
    Doctors: [],
  });
  const [sortedAppointments, setSortedAppointments] = useState([]);

  // console.log('user within AppointsVisual ', user);
  useEffect(() => {
    let isMounted = true;    
    if (user.isDoctor) {
      getAppointments('doctor', user.id).then((data) => {
        console.log('Dr data within AppointmentsVisualizer ', data);
        setFetchedAppointments(data);
      });
    } else {
      getAppointments('patient', user.id)
        .then((data) => {
          console.log('Patient data ', data);
          setFetchedAppointments(data.data);
          return data.data.Doctors;
        })
        .then((doc) => {
          console.log('doc ', doc);
          let counter = 0;
          const sortAppointments = [];
          doc.map((doctor) => {
            console.log('doctor in map ', doctor);
            counter++;
            const location = (doctor) => {
              if (doctor.Appointments.onsiteappointment) {
                return 'On Site';
              } else {
                ('Remote');
              }
            };

            sortAppointments.push({
              id: counter,
              col1: doctor.name,
              col2: doctor.Appointments.date,
              col3: location(doctor),
              col4: doctor.Appointments.price,
            });
            console.log('in map sortAppoint:  ', sortAppointments);
          });
          setSortedAppointments(sortAppointments);
        });
    }
    return () => { isMounted = false }
  }, []);

  console.log('sortedAppointments ', sortedAppointments);

  if (!authorization) {
    return <Redirect to="login" />;
  }

  const rows: GridRowsProp = sortedAppointments;

  const columns: GridColDef= [
    { field: 'col1', headerName: "Dr's Name", width: 220 },
    { field: 'col2', headerName: 'Time & Date', width: 220 },
    { field: 'col3', headerName: 'Location', width: 220 },
    { field: 'col4', headerName: 'Rate', width: 220 },
  ];

  console.log('fetchedAppointments ', fetchedAppointments);

  console.log('sortedAppointments ', sortedAppointments);

  return (
    <div>
      <ButtonAppBar />

      <Container component="main" maxWidth="md">
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
