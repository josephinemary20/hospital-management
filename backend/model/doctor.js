const mongoose = require('mongoose')

const DoctorSchema = new mongoose.Schema({
    Doctorname: String,
    Doctorid: Number

})
const DoctorModel = mongoose.model('doctor', DoctorSchema)

module.exports = DoctorModel;