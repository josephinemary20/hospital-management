const express = require('express')
const app = express();

app.use(express.json());
app.listen(6000, () => {
    console.log('server connection')
})