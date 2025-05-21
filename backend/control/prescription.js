const express = require('express')
const PrescriptionModel = require('../model/prescription')
const router = express.Router();


router.post('/pres', async (req, res) => {
    try {
        let prescription = req.body;
        const createpres = await PrescriptionModel.create(prescription)
        res.json(createpres)
    } catch (error) {
        res.status(500).send(error?.message)
    }
})

router.get('/pres_get', async (req, res) => {
    let prescription = await PrescriptionModel.find();
    res.json(prescription)
})

router.put('/pres/:id', async (req, res) => {
    let id = req.params.id
    let prescription = req.body
    let update = await PrescriptionModel.findByIdAndUpdate(id, prescription, { new: true });
    res.json(update)

})

router.delete('/pres_delete/:id', async (req, res) => {
    let id = req.params.id
    await PrescriptionModel.findByIdAndDelete(id)
    res.json("deleted")
})

module.exports = router;