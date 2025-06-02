const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
    Patientname: {
        type: String,
        match: /^[a-zA-Z\s]+$/,
        required: true
    },
    Patientid: {
        type: String,
        match: /^PT\d{3}$/,
        required: true

    }

})
const PatientModel = mongoose.model('patient', PatientSchema)

module.exports = PatientModel;