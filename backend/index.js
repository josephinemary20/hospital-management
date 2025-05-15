const express = require('express')
require('./db/index')
const app = express();

app.use(express.json());

app.listen(6000, () => {
    console.log('server connection')
})