export const createDoctor = (doctor) => {
  return fetch(`${process.env.REACT_APP_HOST}/doctor`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ ...doctor }),
  })
    .then((res) => {
      // returns a doctor
      return res.json();
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const createPatient = (patient) => {
  return fetch(`${process.env.REACT_APP_HOST}/patient`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ ...patient }),
  })
    .then((res) => {
      //res.json() will be a patient
      return res.json();
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const getAllDoctors = () => {
  fetch(`${process.env.REACT_APP_HOST}/doctors`)
    .then((res) => {
      console.log('my headers', res.headers);
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const login = (user) => {
  console.log('user', user);
  return fetch(`${process.env.REACT_APP_HOST}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      ...user,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log('error: ', err);
      return false;
    });
  // console.log('i am here?');
};

export const Logout = () => {
  fetch(`${process.env.REACT_APP_HOST}/logout`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

// export const createAppointment = (appointmentDateAndTime, uId) => {
//   // console.log('lets fetch appointments console UID:', user);
//   fetch(`${process.env.REACT_APP_HOST}/appointment`, {
//     method: 'POST',
//     credentials: 'include',
//     mode: 'cors',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify({
//       PatientId: user.id,
//       DoctorId: selectedDoctor.id,
//       remoteappointment: remoteAppointment,
//       onsiteappointment: !remoteAppointment,
//       date: appointmentDateAndTime,
//       location: geolocation,
//       price: remoteAppointment
//         ? selectedDoctor.priceremote
//         : selectedDoctor.priceonsite,
//       priceonsite: selectedDoctor.priceonsite,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => setUser(data));
// };
