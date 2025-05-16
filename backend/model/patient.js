const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
    Patientname: {
        type: String,

    },
    Patientid: {
        type: String,

    }

})
const PatientModel = mongoose.model('patient', PatientSchema)

module.exports = PatientModel;