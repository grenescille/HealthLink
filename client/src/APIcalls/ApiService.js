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
  return fetch(`${process.env.REACT_APP_HOST}/doctors`)
    .then((res) => {
      console.log('my headers', res.headers);
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const login = (login) => {
  return fetch(`${process.env.REACT_APP_HOST}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      ...login,
    }),
  })
    .then((res) => {
      // console.log('Form the API:', res.json());
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log('error: ', err);
      return false;
    });
};

export const Logout = () => {
  return fetch(`${process.env.REACT_APP_HOST}/logout`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

export const getAppointments = async (user, id) => {
  console.log('API_Service:', user, id);
  try {
    const responsObj = await fetch(
      `${process.env.REACT_APP_HOST}/${user}/${id}/appointments`
    );
    const dataAppt = await responsObj.json();
    return { error: null, data: dataAppt };
  } catch (error) {
    return { data: null, error: 'network error' };
  }
};
