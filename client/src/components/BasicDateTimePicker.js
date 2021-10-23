import React from 'react';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { useUser } from '../context/UserContext';
function BasicDateTimePicker({ setSelectedDate, selectedDate }) {
  const handleDateChange = (date) => {
    console.log('date', date);
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        data-testid="DateTimePickerId"
        label="DateTimePicker"
        inputVariant="outlined"
        minDate={Date.now()}
        value={selectedDate}
        onChange={(e) => handleDateChange(e)}
        format="yyyy-MM-dd HH:mm:ss"
      />
    </MuiPickersUtilsProvider>
  );
}

export default BasicDateTimePicker;
