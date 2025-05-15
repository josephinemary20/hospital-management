const express = require('express')
const dp = require('./db/index')
const app = express();

app.use(express.json());
app.use('/', dp)
app.listen(6000, () => {
    console.log('server connection')
})