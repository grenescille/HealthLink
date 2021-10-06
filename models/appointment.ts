
import { Model} from 'sequelize'





module.exports = (sequelize:any, DataTypes:any) => {

  interface AppointmentInstance extends Model{
    id: string,
    remoteappointment: boolean,
    onsiteappointment: boolean,
    date: Date,
    roomid: string|null,
    price: number,
    location: any,
    DoctorId: string,
    PatientId: string,
  };

  const Appointment:AppointmentInstance = sequelize.define('Appointments', {
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
