const express = require('express')
const DepartmentModel = require('../model/department');
const router = express.Router();


router.post('/department', async (req, res) => {
    try {
        let department = req.body;
        const createdepartment = await DepartmentModel.create(department)
        res.json(createdepartment)
    } catch (error) {
        res.status(500).send(error?.message)
    }
})

router.get('/department_get', async (req, res) => {
    let department = await DepartmentModel.find();
    res.json(department)
})




router.put('/department/:id', async (req, res) => {
    let id = req.params.id
    let department = req.body
    let update = await DepartmentModel.findByIdAndUpdate(id, department, { new: true });
    res.json(update)

})

router.delete('/department_delete/:id', async (req, res) => {
    let id = req.params.id
    await DepartmentModel.findByIdAndDelete(id)
    res.json("deleted")
})
module.exports = router;