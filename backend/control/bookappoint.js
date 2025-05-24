const express = require('express')
const BookappointModel = require('../model/bookappoint');
const router = express.Router();


router.post('/book', async (req, res) => {
    try {
        let appoint = req.body;
        const createappoinment = await BookappointModel.create(appoint)
        res.json(createappoinment)
    } catch (error) {
        res.status(500).send(error?.message)
    }
})

router.get('/book_get', async (req, res) => {
    let appoinment = await BookappointModel.find();
    res.json(appoinment)
})




router.put('/book/:id', async (req, res) => {
    let id = req.params.id
    let appoinment = req.body
    let update = await BookappointModel.findByIdAndUpdate(id, appoinment, { new: true });
    res.json(update)

})

router.delete('/book_delete/:id', async (req, res) => {
    let id = req.params.id
    await BookappointModel.findByIdAndDelete(id)
    res.json("deleted")
})
module.exports = router;