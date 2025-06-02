const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    Adminname: {
        type: String,
        match: /^[a-zA-Z\s]+$/,
        required: true

    },
    Adminid: {
        type: String,
        match: /^AN\d{3}$/,
        required: true
    }

})
const AdminModel = mongoose.model('admin', AdminSchema)

module.exports = AdminModel;