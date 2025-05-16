const express = require('express')
const PatientModel = require('../model/patient')
const router = express.Router();


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

