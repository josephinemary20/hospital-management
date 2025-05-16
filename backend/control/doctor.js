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



router.post('/login', async (req, res) => {

    try {
        let doctor = req.body;
        const doctorExist = await DoctorModel.findOne({ Doctorname: doctor?.Doctorname })
        if (!doctorExist) return res.status(401).send("doctor not exist")
        if (doctorExist?.Doctorid !== doctor?.Doctorid) res.status(401).send("Invalid id")

        const token = await jwt.sign({ doctor: doctorExist }, 'doctorauth');
        res.json({
            user: doctorExist,
            token
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;