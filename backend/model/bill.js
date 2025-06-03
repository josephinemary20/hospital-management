const mongoose = require('mongoose')
const BillSchema = new mongoose.Schema({
    Consultationfees: {
        type: String,
    },
    Paymentstatus: {
        type: String,
        match: /^[a-zA-Z\s]+$/,
        required: true
    },
    Patientname: {
        type: String,
        match: /^[a-zA-Z\s]+$/,
        required: true
    }

})
const BillModel = mongoose.model('bill', BillSchema)

module.exports = BillModel;