"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('./../models/model');
const bcrypt = require('bcrypt');
exports.getAllDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('welcome to getAlldoctors');
        const allDoctors = yield db.Doctors.findAll();
        //i need all doctors in a GeoJson Format
        let geoJsonDoctors = {
            type: 'JsonGeolocation',
            features: []
        };
        for (let doctor of allDoctors) {
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
    }
    catch (err) {
        res.status(500).send('Error!');
    }
});
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('here!!');
        const { email, password } = req.body;
        console.log('email: ', email, ' || pass: ', password);
        const userPatient = yield db.Patients.findOne({ where: { email: email } });
        // console.log(userPatient);
        const userDoctor = yield db.Doctors.findOne({ where: { email: email } });
        // console.log(userDoctor);
        if (userPatient) {
            const passValidation = yield bcrypt.compare(password, userPatient.password);
            if (!passValidation) {
                // console.log('shit, bad pass');
                throw new Error();
            }
            req.session.uid = userPatient._id;
            res.status(200).send(userPatient);
        }
        else if (userDoctor) {
            const passValidation = yield bcrypt.compare(password, userDoctor.password);
            if (!passValidation) {
                // console.log('shit, bad pass');
                throw new Error();
            }
            req.session.uid = userDoctor._id;
            res.status(200).send(userDoctor);
        }
        else {
            res.status(409).send({ message: 'User does not exists!' });
        }
    }
    catch (err) {
        res.status(500).send(null);
    }
});
exports.logout = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res
                .status(500)
                .send({ error, message: 'Could not log out, please try again' });
        }
        else {
            console.log('destroy session');
            res.clearCookie('sid');
            res.sendStatus(200);
        }
    });
};
//get patient by id
exports.getPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('welcome to getPatient');
        const patient = yield db.Patients.findAll({
            where: { id: req.params.id },
        });
        res.status(200).send(patient);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
//get doctor by id
exports.getDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('welcome to getDoctor: ', req.params.id);
        const doctor = yield db.Doctors.findAll({
            where: { id: req.params.id },
        });
        res.status(200).send(doctor);
    }
    catch (err) {
        // console.log('error!');
        res.status(500).send(err);
    }
});
//create a patient
exports.addPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('welcome to addPatient');
        let { name, age, email, username, password, stripeid, location, peerid } = req.body;
        // console.log(name, ' ', age, ' ', email, ' ', password);
        let patientExist = false;
        const existingPatients = yield db.Patients.findAll();
        for (let patient of existingPatients) {
            if (patient.email === email) {
                // console.log('patient exists');
                patientExist = true;
                break;
            }
        }
        if (patientExist) {
            //if user already exist, we will respond to the request with a null answer
            res.status(409).send({ message: 'User already exists!' });
        }
        else {
            //10 stands for number of times the password will be encrypted. More encryption times = more secure, but also more slower too.
            const hashPass = yield bcrypt.hash(password, 10);
            // console.log(hashPass);
            const patient = yield db.Patients.create({
                name,
                age,
                email,
                password: hashPass,
            });
            // console.log(patient);
            req.session.uid = patient._id;
            res.status(200).send(patient);
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
});
//create a doctor
exports.addDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('welcome to addDoctor');
        let { name, age, workyears, email, username, password, specialty, location, priceremote, priceonsite, peerid, onsiteavailability, radius, } = req.body;
        // console.log(location.type);
        let doctorExists = false;
        const existingDoctors = yield db.Doctors.findAll();
        for (let doctor of existingDoctors) {
            if (doctor.email === email) {
                doctorExists = true;
                break;
            }
        }
        if (doctorExists) {
            //if user already exist, we will respond to the request with a null answer
            // console.log('doctor exists');
            res.status(409).send({ message: 'User already exists!' });
        }
        else {
            const hashPass = yield bcrypt.hash(password, 10);
            const doctor = yield db.Doctors.create({
                name: name,
                age: age,
                workyears: workyears,
                email: email,
                username: username,
                password: hashPass,
                specialty: specialty,
                location: location,
                priceonsite: priceonsite,
                priceremote: priceremote,
                peerid: peerid,
                onsiteavailability: onsiteavailability,
                radius: radius,
            });
            req.session.uid = doctor._id;
            res.status(200).send(doctor);
        }
    }
    catch (err) {
        console.log('error!');
        res.status(500).send(err);
    }
});
// create a appointment
exports.addAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('here in addappointment');
        const { remoteappointment, onsiteappointment, date, roomid, price, DoctorId, PatientId, } = req.body;
        // const {remoteappointment,onsiteappointment,date,roomid,price, DoctorId, PatientId} = req.body;
        // console.log('d', 'p', req.body, req.body.DoctorId);
        const appointement = yield db.Appointments.create({
            remoteappointment: remoteappointment,
            onsiteappointment: onsiteappointment,
            date: date,
            roomid: roomid,
            price: price,
            DoctorId: DoctorId,
            PatientId: PatientId,
        });
        // const appointement = await db.Appointments.create({remoteappointment: remoteappointment,onsiteappointment: onsiteappointment,date: date,roomid: roomid,price: price, DoctorId: doctorId, PatientId: patientId});
        res.status(200).send(appointement);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
exports.getDoctorAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('welcome to getDoctor: ', req.params.id);
        //attributes = SELECT
        const doctorAppointments = yield db.Appointments.findAll({
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
    }
    catch (err) {
        console.log('error! : ', err);
        res.status(500).send(err);
    }
});
exports.getPatientAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('welcome to getDoctor: ', req.params.id);
        //attributes = SELECT
        const doctorAppointments = yield db.Appointments.findAll({
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
    }
    catch (err) {
        console.log('error! : ', err);
        res.status(500).send(err);
    }
});
// start call - signalling events
// my signalling server event listeners
exports.callHandshake = (req, res) => {
    const io = require('socket.io')(req.server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });
    // console.log('here in callhandshake!');
    io.on('connection', (socket) => {
        socket.emit('ownuser', socket.id); //as soon client makes a request to connect with the server, a socket is created, and here we handover this client socket.id with the emit() function
        // console.log('connection established');
        socket.on('disconnect', () => {
            // console.log('disconnected');
            socket.broadcast.emit('callended'); //all users will be notified that the call has been terminated
        });
        socket.on('call', ({ destinationUser, signallingData, senderUser, senderName }) => {
            // console.log('going to call');
            io.to(destinationUser).emit('calluser', {
                signal: signallingData,
                senderUser,
                senderName,
            });
        });
        socket.on('answer', (data) => {
            // console.log('going to answer');
            io.to(data.callerId).emit('callaccepted', data.signaldata);
        });
    });
};
//# sourceMappingURL=contollers.js.map