const express = require('express')
const DoctorModel = require('../model/doctor')
const router = express.Router();



router.post('/signup', async (req, res) => {

    try {
        let doctor = req.body;
        const isAlreadyExist = await DoctorModel.findOne({ Doctorname: doctor?.Doctorname })
        if (isAlreadyExist) return res.status(401).send("doctor already exist")
        const createdoctor = await DoctorModel.create(doctor)
        res.json(createdoctor)
        console.log("doctor", createdoctor)
    } catch (error) {
        res.status(500).send(error?.message)
    }
})

module.exports = router;