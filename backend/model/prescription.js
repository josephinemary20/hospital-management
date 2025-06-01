const mongoose = require('mongoose')
const PrescriptionSchema = new mongoose.Schema({
    Medicine: {
        type: String,
        validate: {
            validator: function (val) {
                return /^[a-zA-Z\s]+$/.test(val);
            },
            message: props => `${props.value} is not a Medicine!`
        },
        required: [true, 'Medicine is required.']
    },
    Dosage: {
        type: String,
        validate: {
            validator: function (val) {
                return /^[a-zA-Z\s]+$/.test(val);
            },
            message: props => `${props.value} is not a Dosage!`
        },
        required: [true, 'Dosage is required.']
    },
    patient_id: {
        ref: 'patient',
        type: mongoose.Schema.Types.ObjectId
    }

})
const PrescriptionModel = mongoose.model('prescription', PrescriptionSchema)

module.exports = PrescriptionModel;