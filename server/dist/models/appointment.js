"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Some fields are optional when calling UserModel.create() or UserModel.build()
// interface AppointmentCreationAttributes extends Optional<AppointmentAttributes, "id"> {}
// // We need to declare an interface for our model that is basically what our class would be
// interface AppointmentInstance extends Model <AppointmentAttributes, AppointmentCreationAttributes>,
//  AppointmentAttributes {};
module.exports = (sequelize, DataTypes) => {
    ;
    const Appointment = sequelize.define('Appointments', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        remoteappointment: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        onsiteappointment: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        roomid: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        location: {
            type: DataTypes.GEOMETRY('POINT', 4326),
            allowNull: true,
        },
        DoctorId: {
            type: DataTypes.UUID,
            // references: { model: db.Patient, key: db.Patient.id },
        },
        PatientId: {
            type: DataTypes.UUID,
            // references: { model: Doctor, key: Doctor.id },
        },
    });
    // Appointment.associate = (db) => {
    //   db.Appointments.belongsTo(db.Patients, {
    //     onDelete: 'CASCADE',
    //   });
    //   db.Appointments.belongsTo(db.Doctors, {
    //     onDelete: 'CASCADE',
    //   });
    // };
    return Appointment;
};
//# sourceMappingURL=appointment.js.map