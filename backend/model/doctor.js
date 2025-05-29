const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    Doctorname: {
        type: String,
        required: [true, 'Doctorname is required.'],
        validate: {
            validator: function (val) {
                return /^[a-zA-Z\s]+$/.test(val);
            },
            message: ' Enter valid Doctor name .'
        }
    },
    Doctorid: {
        type: String,
        required: [true, 'Doctor ID is required.'],
        validate: {
            validator: function (val) {
                return /^DR\d{3}$/.test(val);
            },
            message: 'Enter  valid Doctor ID .'
        }
    }
});

const DoctorModel = mongoose.model('Doctor', DoctorSchema);

module.exports = DoctorModel;
