const express = require('express')
const DoctorModel = require('../model/doctor')
const router = express.Router();



router.post('/doctor', async (req, res) => {
    try {
        let doctor = new DoctorModel(req.body)
        await doctor.save();
        res.json(doctor)

    } catch (error) {
        res.status(500).send(error?.message)
    }
})

module.exports = router;