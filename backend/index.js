const express = require('express')
const cors = require('cors')
require('./db/index')
const doctor = require('./control/doctor')
const patient = require('./control/patient')
const admin = require('./control/admin')
const appoint = require('./control/appointment')
const pres = require('./control/prescription')
const app = express();

app.use(express.json());
app.use(cors())
app.use(doctor)
app.use(patient)
app.use(admin)
app.use(appoint)
app.use(pres)

app.listen(2000, () => {
    console.log('server connection')
})