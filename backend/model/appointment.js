
const mongoose = require('mongoose')
const AppointmentSchema = new mongoose.Schema({
    Date: {
        type: Date,
    },
    Time: {
        type: String,
    },
    Reason: {
        type: String
    },
    doctor_id: {
        ref: "doctor",
        type: mongoose.Schema.Types.ObjectId
    },
    patient_id: {
        ref: "patient",
        type: mongoose.Schema.Types.ObjectId
    }


})
const AppointmentModel = mongoose.model('appointment', AppointmentSchema)

module.exports = AppointmentModel;