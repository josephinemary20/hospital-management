const express = require('express')
require('./db/index')
const doctor = require('./control/doctor')
const app = express();

app.use(express.json());
app.use('/', doctor)

app.listen(6000, () => {
    console.log('server connection')
})