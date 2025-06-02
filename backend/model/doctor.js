const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({

    Doctorname: {
        type: String,
        match: /^[a-zA-Z\s]+$/,
        required: true

    },

    Doctorid: {
        type: String,
        match: /^DR\d{3}$/,
        required: true
    }
});

const DoctorModel = mongoose.model('Doctor', DoctorSchema);

module.exports = DoctorModel;
