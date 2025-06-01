const mongoose = require('mongoose')
const BookappointSchema = new mongoose.Schema({
    Nextappointment: {
        type: Date,
    },
    Time: {
        type: String,
        validate: {
            validator: function (val) {
                return /^(1[0-2]|0?[1-9])(\.[0-5][0-9])?\s?(am|pm)$/i.test(val);
            },
            message: props => `${props.value} is not Time!`
        },
        required: [true, 'Time is required.']
    },
    Patientname: {
        type: String,
        validate: {
            validator: function (val) {
                return /^[a-zA-Z\s]+$/.test(val);
            },
            message: props => `${props.value} is not a Patientname!`
        },
        required: [true, 'Patientname is required.']
    },
    doctor_id: {
        ref: "doctor",
        type: mongoose.Schema.Types.ObjectId
    },


})
const BookappointModel = mongoose.model('bookappoint', BookappointSchema)

module.exports = BookappointModel;