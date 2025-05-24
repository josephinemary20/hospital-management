const mongoose = require('mongoose')
const BookappointSchema = new mongoose.Schema({
    Date: {
        type: Date,
    },
    Time: {
        type: String,
    },

    doctor_id: {
        ref: "doctor",
        type: mongoose.Schema.Types.ObjectId
    }

})
const BookappointModel = mongoose.model('bookappoint', BookappointSchema)

module.exports = BookappointModel;