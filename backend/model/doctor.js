const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({

    Doctorname: {
        type: String,
        validate: {
            validator: function (val) {
                return /^[a-zA-Z\s]+$/.test(val);
            },
            message: props => `${props.value} is not a Doctor name!`
        },
        required: [true, 'Doctorname is required.']

    },

    Doctorid: {
        type: String,
        validate: {
            validator: function (val) {
                return /^DR\d{3}$/.test(val);
            },
            message: props => `${props.value} is not a Doctor id!`
        },
        required: [true, 'Doctor ID is required.']
    }
});

const DoctorModel = mongoose.model('Doctor', DoctorSchema);

module.exports = DoctorModel;
