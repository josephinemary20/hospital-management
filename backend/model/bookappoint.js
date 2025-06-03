const mongoose = require('mongoose')
const BookappointSchema = new mongoose.Schema({
    Nextappointment: {
        type: String,
        match: /^\d{4}-\d{2}-\d{2}$/,
        required: true
    },
    Time: {
        type: String,
        match: /^(1[0-2]|0?[1-9])(\.[0-5][0-9])?\s?(am|pm)$/i,
        required: true
    },
    Patientname: {
        type: String,
        match: /^[a-zA-Z\s]+$/,
        required: true
    },
    doctor_id: {
        ref: "doctor",
        type: mongoose.Schema.Types.ObjectId
    },


})
const BookappointModel = mongoose.model('bookappoint', BookappointSchema)

module.exports = BookappointModel;