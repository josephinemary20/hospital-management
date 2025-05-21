const express = require('express')
const AppoinmentModel = require('../model/appointment')
const router = express.Router();


router.post('/appoint', async (req, res) => {
    try {
        let appoint = req.body;
        const createappoinment = await AppoinmentModel.create(appoint)
        res.json(createappoinment)
    } catch (error) {
        res.status(500).send(error?.message)
    }
})

router.get('/appoint/:doctor_id', async (req, res) => {
    const doctor = req.params.doctor_id;
    const get = await AppoinmentModel.find({ doctor_id: doctor }).populate('doctor_id')
    res.json(get)
})
router.get('/appoint/:patient_id', async (req, res) => {
    const patient = req.params.patient_id;
    const get = await AppoinmentModel.find({ patient_id: patient }).populate('patient_id')
    res.json(get)
})


router.get('/appoint_get', async (req, res) => {
    let appoinment = await AppoinmentModel.find();
    res.json(appoinment)
})

router.put('/appoint/:id', async (req, res) => {
    let id = req.params.id
    let appoinment = req.body
    let update = await AppoinmentModel.findByIdAndUpdate(id, appoinment, { new: true });
    res.json(update)

})

router.delete('/appoint_delete/:id', async (req, res) => {
    let id = req.params.id
    await AppoinmentModel.findByIdAndDelete(id)
    res.json("deleted")
})
module.exports = router;