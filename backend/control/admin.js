const express = require('express')
const AdminModel = require('../model/admin')
const router = express.Router();


router.post('/admin_signup', async (req, res) => {

    try {
        let admin = req.body;
        const isAlreadyExist = await AdminModel.findOne({ Adminname: admin?.Adminname })
        if (isAlreadyExist) return res.status(401).send("admin already exist")
        const createadmin = await AdminModel.create(admin)
        res.json(createadmin)
    } catch (error) {
        res.status(500).send(error?.message)
    }
})

router.post('/adminlogin', async (req, res) => {

    try {
        let admin = req.body;
        const adminExist = await AdminModel.findOne({ Adminname: admin?.Adminname })
        if (!adminExist) return res.status(401).send("admin not exist")
        if (adminExist?.Adminid !== admin?.Adminid) res.status(401).send("Invalid id")

        const token = await jwt.sign({ admin: adminExist }, 'adminauth');
        res.json({
            user: adminExist,
            token
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
})



module.exports = router
