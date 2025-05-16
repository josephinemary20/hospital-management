const express = require('express')
const PatientModel = require('../model/patient')
const router = express.Router();
const jwt = require('jsonwebtoken');


router.post('/patient_signup', async (req, res) => {

    try {
        let patient = req.body;
        const isAlreadyExist = await PatientModel.findOne({ Patientname: patient?.Patientname })
        if (isAlreadyExist) return res.status(401).send("patient already exist")
        const createpatient = await PatientModel.create(patient)
        res.json(createpatient)
    } catch (error) {
        res.status(500).send(error?.message)
    }
})
router.post('/patient_login', async (req, res) => {
    try {
        let patient = req.body;
        const patientExist = await PatientModel.findOne({ Patientname: patient?.Patientname })
        if (!patientExist) return res.status(401).send("patient not exist")
        if (patientExist?.Patientid !== patient?.Patientid) res.status(401).send("Invalid id")

        const token = await jwt.sign({ patient: patientExist }, 'patientauth');
        res.json({
            patient: patientExist,
            token
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports = router
