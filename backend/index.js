const express = require('express')
require('./db/index')
const doctor = require('./control/doctor')
const patient = require('./control/patient')
const app = express();

app.use(express.json());
app.use('/', doctor)
app.use('/', patient)

app.listen(6000, () => {
    console.log('server connection')
})