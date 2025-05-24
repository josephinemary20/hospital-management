const express = require('express')
const AppointmentModel = require('../model/appointment');
const router = express.Router();


router.post('/appoint', async (req, res) => {
    try {
        let appoint = req.body;
        const createappoinment = await AppointmentModel.create(appoint)
        res.json(createappoinment)
    } catch (error) {
        res.status(500).send(error?.message)
    }
})

router.get('/appoint_get', async (req, res) => {
    let appoinment = await AppointmentModel.find();
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