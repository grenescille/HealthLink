import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Container } from '@material-ui/core';
import MarkerMap from './MarkerMap';
import { Redirect } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import ButtonAppBar from './ButtonAppBar';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import BasicDateTimePicker from './BasicDateTimePicker';
import { useHistory } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

const AppointmentCreator = ({ authorization }) => {
  let history = useHistory();

  const {
    selectedDoctor,
    remoteAppointment,
    setRemoteAppointment,
    createAppointment,
  } = useUser();

  const [selectedDate, setSelectedDate] = useState(new Date());

  console.log('@appointment creator: date: ', selectedDate);
  console.log('@appointment creator: selected doctor', selectedDoctor);

  useEffect(() => {}, [selectedDate]);
  if (!authorization) {
    console.log('not authorized!');
    return <Redirect to="login" />;
  }

  //will handle the request to call
  const handleMeetingSubmit = () => {
    //we might need to pass some data to the create appointment
    createAppointment(selectedDate);
    history.push('/');
  };

  const handleClick = () => {
    setRemoteAppointment(!remoteAppointment);
  };

  return (
    <div>
      <ButtonAppBar />

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid item xs={12}>
            <MarkerMap />
          </Grid>
          {selectedDoctor.selected ? (
            <Grid item xs={12}>
              <Box
                sx={{
                  marginTop: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography>
                  You choose {selectedDoctor.name} - {selectedDoctor.specialty}
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!remoteAppointment}
                        onClick={handleClick}
                      />
                    }
                    label="On site"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={remoteAppointment}
                        onClick={handleClick}
                      />
                    }
                    label="Video Call"
                  />
                </FormGroup>
                <Grid
                  item
                  xs={12}
                  sx={{
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                >
                  <BasicDateTimePicker
                    setSelectedDate={setSelectedDate}
                    selectedDate={selectedDate}
                  />
                </Grid>
                <Typography>
                  Your will be scheduled for: {selectedDate.toDateString()}, at{' '}
                  {selectedDate.toLocaleTimeString()} and the price will be{' '}
                  {remoteAppointment
                    ? selectedDoctor.priceremote
                    : selectedDoctor.priceonsite}
                  €
                </Typography>
                <Button onClick={handleMeetingSubmit} variant="contained">
                  Confirm
                </Button>
              </Box>
            </Grid>
          ) : null}
        </Box>
      </Container>
    </div>
  );
};

export default AppointmentCreator;

// Outputs as "February 17, 2017"
