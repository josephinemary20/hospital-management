const express = require('express')
const SlotModel = require('../model/slot');
const router = express.Router();


router.post('/slot', async (req, res) => {
    try {
        let slot = req.body;
        const createslot = await SlotModel.create(slot)
        res.json(createslot)
    } catch (error) {
        res.status(500).send(error?.message)
    }
})

router.get('/slot_get', async (req, res) => {
    let slot = await SlotModel.find();
    res.json(slot)
})




router.put('/slot/:id', async (req, res) => {
    let id = req.params.id
    let slot = req.body
    let update = await SlotModel.findByIdAndUpdate(id, slot, { new: true });
    res.json(update)

})

router.delete('/slot_delete/:id', async (req, res) => {
    let id = req.params.id
    await SlotModel.findByIdAndDelete(id)
    res.json("deleted")
})
module.exports = router;