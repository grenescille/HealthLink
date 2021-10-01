const db = require('./../models/model');
const bcrypt = require('bcrypt');
//get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    console.log('welcome to getAlldoctors');
    const allDoctors = await db.Doctors.findAll();

    //i need all doctors in a GeoJson Format
    let geoJsonDoctors = {
      type: 'FeatureCollection',
      features: [],
    };
    for (doctor of allDoctors) {
      let feature = { type: 'Feature', properties: {}, geometry: {} };
      feature.properties = {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        age: doctor.age,
        specialty: doctor.specialty,
        onsiteavailability: doctor.onsiteavailability,
        priceremote: doctor.priceremote,
        priceonsite: doctor.priceonsite,
        peerid: doctor.peerid,
        radius: doctor.radius,
        workyears: doctor.workyears,
        isdoctor: doctor.isdoctor,
      };
      feature.geometry = doctor.location;
      geoJsonDoctors.features.push(feature);
    }

    res.status(200).send(geoJsonDoctors);
  } catch (err) {
    res.status(500).send('Error!');
  }
};

exports.doctorLogin = async (req, res) => {
  const { email, password } = req.body;
  const userDoctor = await db.Doctors.findOne({ where: { email: email } });

  try {
    if (userDoctor) {
      const passValidation = await bcrypt.compare(
        password,
        userDoctor.password
      );
      if (!passValidation) {
        res.status(400).send({ message: 'Invalid credentials' });
      } else {
        req.session.uid = userDoctor.id;
        const { password, ...doctorData } = userDoctor;
        res.status(200).send(doctorData);
      }
    } else {
      res.status(409).send({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.patientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userPatient = await db.Patients.findOne({ where: { email: email } });

    if (userPatient) {
      const passValidation = await bcrypt.compare(
        password,
        userPatient.password
      );
      if (!passValidation) {
        res.status(400).send({ message: 'Invalid credentials' });
      } else {
        req.session.uid = userPatient.id;
        const { password, ...patientData } = userPatient;
        res.status(200).send(patientData);
      }
    } else {
      res.status(409).send({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res
        .status(500)
        .send({ error, message: 'Could not log out, please try again' });
    } else {
      res.clearCookie('sid');
      res.sendStatus(200);
    }
  });
};

//get patient by id
exports.getPatient = async (req, res) => {
  try {
    console.log('welcome to getPatient');
    const patient = await db.Patients.findAll({
      where: { id: req.params.id },
    });

    res.status(200).send(patient);
  } catch (err) {
    res.status(500).send(err);
  }
};

//get doctor by id
exports.getDoctor = async (req, res) => {
  try {
    console.log('welcome to getDoctor: ', req.params.id);
    const doctor = await db.Doctors.findAll({
      where: { id: req.params.id },
    });

    res.status(200).send(doctor);
  } catch (err) {
    console.log('error!');
    res.status(500).send(err);
  }
};

//create a patient
exports.addPatient = async (req, res) => {
  try {
    const patient = req.body;
    const existingPatient = await db.Patients.findOne({
      where: { email: patient.email },
    });
    if (existingPatient) {
      res.status(409).send({ message: 'User already exists!' });
    } else {
      const hashPass = await bcrypt.hash(patient.password, 10);
      const newPatient = await db.Patients.create({
        ...patientData,
        password: hashPass,
      });
      req.session.uid = newPatient.id;
      const { password, ...data } = newPatient;
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

//create a doctor
exports.addDoctor = async (req, res) => {
  try {
    const doctor = req.body;
    const existingDoctor = await findOne({ where: { email: doctor.email } });
    if (existingDoctor) {
      res.status(409).send({ message: 'Doctor already exists!' });
    } else {
      const hashPass = await bcrypt.hash(doctor.password, 10);
      const newDoctor = await db.Doctors.create({
        ...doctorData,
        password: hashPass,
      });
      req.session.uid = newDoctor.id;
      const { password, ...data } = newDoctor;
      res.status(200).send(data);
    }
  } catch (err) {
    console.log('error!');
    res.status(500).send(err);
  }
};
// create a appointment
exports.addAppointment = async (req, res) => {
  try {
    console.log('here in addappointment');
    const {
      remoteappointment,
      onsiteappointment,
      date,
      roomid,
      price,
      doctor_id,
      patient_id,
    } = req.body;
    // const {remoteappointment,onsiteappointment,date,roomid,price, DoctorId, PatientId} = req.body;

    console.log(
      remoteappointment,
      ' e ',
      onsiteappointment,
      ' e ',
      date,
      ' e ',
      roomid,
      ' e ',
      price
    );

    const appointement = await db.Appointments.create({
      remoteappointment: remoteappointment,
      onsiteappointment: onsiteappointment,
      date: date,
      roomid: roomid,
      price: price,
      DoctorId: doctor_id,
      PatientId: patient_id,
    });
    // const appointement = await db.Appointments.create({remoteappointment: remoteappointment,onsiteappointment: onsiteappointment,date: date,roomid: roomid,price: price, DoctorId: doctorId, PatientId: patientId});

    res.status(200).send(appointement);
  } catch (err) {
    console.log('error');
    res.status(500).send(err);
  }
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    console.log('welcome to getDoctor: ', req.params.id);
    //attributes = SELECT
    const doctorAppointments = await db.Appointments.findAll({
      attributes: ['date', 'roomid'],
      include: [
        {
          model: db.Doctors,
          required: true,
        },
      ],
      where: { DoctorId: req.params.id },
    });

    res.status(200).send(doctorAppointments);
  } catch (err) {
    console.log('error! : ', err);
    res.status(500).send(err);
  }
};

exports.getPatientAppointments = async (req, res) => {
  try {
    console.log('welcome to getDoctor: ', req.params.id);
    //attributes = SELECT
    const doctorAppointments = await db.Appointments.findAll({
      attributes: [
        'date',
        'DoctorId',
        'price',
        'onsiteappointment',
        'remoteappointment',
      ],
      include: [
        {
          model: db.Patients,
          required: true,
        },
      ],
      where: { PatientId: req.params.id },
    });

    res.status(200).send(doctorAppointments);
  } catch (err) {
    console.log('error! : ', err);
    res.status(500).send(err);
  }
};

// start call - signalling events
// my signalling server event listeners
exports.callHandshake = (req, res) => {
  const io = require('socket.io')(req.server, {
    cors: {
      origin: '*', //we might need to change, when front end is deployed in netlify
      methods: ['GET', 'POST'],
    },
  });

  console.log('here in callhandshake!');

  io.on('connection', (socket) => {
    socket.emit('ownuser', socket.id); //as soon client makes a request to connect with the server, a socket is created, and here we handover this client socket.id with the emit() function

    console.log('connection established');

    socket.on('disconnect', () => {
      console.log('disconnected');
      socket.broadcast.emit('callended'); //all users will be notified that the call has been terminated
    });

    socket.on(
      'call',
      ({ destinationUser, signallingData, senderUser, senderName }) => {
        console.log('going to call');
        io.to(destinationUser).emit('calluser', {
          signal: signallingData,
          senderUser,
          senderName,
        });
      }
    );

    socket.on('answer', (data) => {
      console.log('going to answer');
      io.to(data.callerId).emit('callaccepted', data.signaldata);
    });
  });
};
