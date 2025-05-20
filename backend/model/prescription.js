const mongoose = require('mongoose')
const PrescriptionSchema = new mongoose.Schema({
    Medicine: {
        type: String
    },
    Dosage: {
        type: String
    },
    patient_id: {
        ref: 'patient',
        type: mongoose.Schema.Types.ObjectId
    }

})
const PrescriptionModel = mongoose.model('prescription', PrescriptionSchema)

module.exports = PrescriptionModel;