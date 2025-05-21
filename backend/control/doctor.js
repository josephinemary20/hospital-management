const express = require('express')
const DoctorModel = require('../model/doctor')
const router = express.Router();
const jwt = require('jsonwebtoken');



router.post('/doctor_signup', async (req, res) => {

    try {
        let doctor = req.body;
        const isAlreadyExist = await DoctorModel.findOne({ Doctorname: doctor?.Doctorname })
        if (isAlreadyExist) return res.status(401).send("doctor already exist")
        const createdoctor = await DoctorModel.create(doctor)
        res.json(createdoctor)
    } catch (error) {
        res.status(500).send(error?.message)
    }
})



router.post('/doctor_login', async (req, res) => {

    try {
        let doctor = req.body;
        const doctorExist = await DoctorModel.findOne({ Doctorname: doctor?.Doctorname })
        if (!doctorExist) return res.status(401).send("doctor not exist")
        if (doctorExist?.Doctorid !== doctor?.Doctorid) res.status(401).send("Invalid id")

        const token = await jwt.sign({ doctor: doctorExist }, 'doctorauth');
        res.json({
            doctor: doctorExist,
            token
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/doctor_get', async (req, res) => {
    let doctor = await DoctorModel.find();
    res.json(doctor)
})

module.exports = router;