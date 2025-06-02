const mongoose = require('mongoose')
const PrescriptionSchema = new mongoose.Schema({
    Medicine: {
        type: String,
        match: /^[a-zA-Z\s]+$/,
        required: true
    },
    Dosage: {
        type: String,
        match: /^\d+[a-zA-Z\s]+$/,
        required: true
    },
    patient_id: {
        ref: 'patient',
        type: mongoose.Schema.Types.ObjectId
    }

})
const PrescriptionModel = mongoose.model('prescription', PrescriptionSchema)

module.exports = PrescriptionModel;