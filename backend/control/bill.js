const express = require('express')
const BillModel = require('../model/bill');
const router = express.Router();


router.post('/bill', async (req, res) => {
    try {
        let bill = req.body;
        const createdbill = await BillModel.create(bill)
        res.json(createdbill)
    } catch (error) {
        res.status(500).send(error?.message)
    }
})

router.get('/bill_get', async (req, res) => {
    let bill = await BillModel.find();
    res.json(bill)
})




router.put('/bill/:id', async (req, res) => {
    let id = req.params.id
    let bill = req.body
    let update = await BillModel.findByIdAndUpdate(id, bill, { new: true });
    res.json(update)

})

router.delete('/bill_delete/:id', async (req, res) => {
    let id = req.params.id
    await BillModel.findByIdAndDelete(id)
    res.json("deleted")
})
module.exports = router;