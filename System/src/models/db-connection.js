const dbConfig = require('../../config/db-config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT
  }
);

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.Doctor = require('./doctor/doctor')(sequelize, Sequelize.DataTypes);
db.models.Patient = require('./patient/patient')(sequelize, Sequelize.DataTypes);
db.models.Appointment = require('./appointment/appointment')(sequelize, Sequelize.DataTypes);
db.models.Availability = require('./availability/availability')(sequelize, Sequelize.DataTypes);
db.models.LabTest = require('./labTest/labtest')(sequelize, Sequelize.DataTypes);

const {
  Doctor,
  Patient,
  Appointment,
  Availability,
  LabTest
} = db.models;

Doctor.hasMany(Appointment, {
  foreignKey: 'Doctor_ID',
  targetKey: 'Doctor_ID'
});

Appointment.belongsTo(Doctor, {
  foreignKey: 'Doctor_ID',
  targetKey: 'Doctor_ID',
});

Patient.hasMany(Appointment, {
  foreignKey: 'Patient_ID',
  targetKey: 'Patient_ID'
});

Appointment.belongsTo(Patient, {
  foreignKey: 'Patient_ID',
  targetKey: 'Patient_ID',
});

Doctor.hasMany(Availability, {
  foreignKey: 'Doctor_ID',
  targetKey: 'Doctor_ID'
});

Availability.belongsTo(Doctor, {
  foreignKey: 'Doctor_ID',
  targetKey: 'Doctor_ID'
});

Patient.hasMany(LabTest, {
  foreignKey: 'Patient_ID',
  targetKey: 'Patient_ID'
});

LabTest.belongsTo(Patient, {
  foreignKey: 'Patient_ID',
  targetKey: 'Patient_ID'
});

module.exports = db;