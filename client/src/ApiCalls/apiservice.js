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
