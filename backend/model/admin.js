const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    Adminname: {
        type: String,
        required: true
    },
    Adminid: {
        type: String,
        required: true
    }

})
const AdminModel = mongoose.model('admin', AdminSchema)

module.exports = AdminModel;