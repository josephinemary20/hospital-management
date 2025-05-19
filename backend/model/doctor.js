const mongoose = require('mongoose')

const DoctorSchema = new mongoose.Schema({
    Doctorname: {
        type: String,
        required: true
    },
    Doctorid: {
        type: String,
        required: true
    }

})
const DoctorModel = mongoose.model('doctor', DoctorSchema)

module.exports = DoctorModel;