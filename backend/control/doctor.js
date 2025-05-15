const express = require('express')
const DoctorModel = require('../model/doctor')
const router = express.Router();



router.post('/doctor', async (req, res) => {
    try {
        let doctor = req.body;
        const createdoctor = await DoctorModel.create(doctor)
        res.json(createdoctor)
        console.log("doctor", createdoctor)
    } catch (error) {
        res.status(500).send(error?.message)
    }
})

module.exports = router;