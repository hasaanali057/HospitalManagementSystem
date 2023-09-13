const express = require('express');
const app = express()

app.use(express.json());
app.use(express.urlencoded( {extended: true}));

const {
  docRouter
} = require('./src/modules/doctor/routes');

app.use('/doctor', docRouter)

app.listen(5000, ()=> {
  console.log('server listening at 5000');
})