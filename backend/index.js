const express = require('express')
require('./db/index')
const doctor = require('./control/doctor')
const patient = require('./control/patient')
const admin = require('./control/admin')
const app = express();

app.use(express.json());
app.use('/', doctor)
app.use('/', patient)
app.use('/', admin)

app.listen(6000, () => {
    console.log('server connection')
})