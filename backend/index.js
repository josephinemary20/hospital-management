const express = require('express')
require('./db/index')
const doctor = require('./control/doctor')
const app = express();
app.use('/', doctor)
app.use(express.json());

app.listen(6000, () => {
    console.log('server connection')
})