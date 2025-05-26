const mongoose = require('mongoose')
const BillSchema = new mongoose.Schema({
    Amount: {
        type: String,
    },
    Paymentstatus: {
        type: String,
    },
    Patientname: {
        type: String,
    }


})
const BillModel = mongoose.model('bill', BillSchema)

module.exports = BillModel;