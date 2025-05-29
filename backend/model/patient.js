const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
    Patientname: {
        type: String,
        validate: {
            validator: function (val) {
                return /^[a-zA-Z\s]+$/.test(val);
            },
            message: props => `${props.value} is not a Patient name!`
        },
        required: [true, 'Patientname is required.']


    },
    Patientid: {
        type: String,
        validate: {
            validator: function (val) {
                return /^PT\d{3}$/.test(val);
            },
            message: props => `${props.value} is not a Patient id!`
        },
        required: [true, 'Patient ID is required.']

    }

})
const PatientModel = mongoose.model('patient', PatientSchema)

module.exports = PatientModel;