import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Button, Container } from '@material-ui/core';
import { CallContextProvider } from '../context/CallContext';
import VideoChat from './VideoChat';
import Options from './Options';
import Notifications from './Notification';
import MarkerMap from './MarkerMap';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import ButtonAppBar from './ButtonAppBar';
import { Box, margin } from '@mui/system';
import { Paper } from '@material-ui/core';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Typography } from '@mui/material';
import { AppBar } from '@mui/material';
import OutlinedCard from './Card';
import Grid from '@mui/material/Grid';
import BasicDateTimePicker from './BasicDateTimePicker';
import { useHistory } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { format } from 'date-fns-tz';

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

const AppointmentCreator = ({ authorization }) => {
  let history = useHistory();

  const {
    selectedDoctor,
    setSelectedDoctor,
    remoteAppointment,
    setRemoteAppointment,
    createAppointment,
    userId,
  } = useUser();
  // console.log('hello word', useUser);
  const [selectedDate, setSelectedDate] = useState(new Date());
  let formattedDate = '';
  // console.log('@appointment creator: date: ', selectedDate);
  // console.log('@appointment creator: selected doctor', selectedDoctor);

  useEffect(() => {
    // console.log('newApp useeffect date: ', selectedDate);
    formattedDate = format(selectedDate, 'yyyy-MM-dd HH:mm');
  }, [selectedDate]);
  if (!authorization) {
    // console.log('not authorized!');
    return <Redirect to="login" />;
  }

  //will handle the request to call
  const handleMeetingSubmit = () => {
    //we might need to pass some data to the create appointment
    createAppointment(selectedDate, userId);
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
