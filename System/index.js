const express = require('express');
const dotenv = require('dotenv');
const db = require('./src/models/db-connection');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded( {extended: true}));

(async () => {
  await db.sequelize.sync({
    alter: true
  });
})();

const docRouter = require('./src/modules/doctor/routes');
const patientRouter = require('./src/modules/patients/routes');
const AppointmentRouter = require('./src/modules/appointment/routes');

app.use('/doctor', docRouter);
app.use('/patient', patientRouter);
app.use('/setAppointments', AppointmentRouter);

app.listen(process.env.PORT, ()=> {
  console.log(`server listening at ${process.env.PORT}`);
});

