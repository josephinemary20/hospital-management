const mongoose = require('mongoose')
const SlotSchema = new mongoose.Schema({
    Starttime: {
        type: String,
        match: /^(1[0-2]|0?[1-9])(\.[0-5][0-9])?\s?(am|pm)$/i,
        required: true
    },
    Endtime: {
        type: String,
        match: /^(1[0-2]|0?[1-9])(\.[0-5][0-9])?\s?(am|pm)$/i,
        required: true
    },
    Slotduration: {
        type: String,
        match: /^(30)\[a-zA-Z\s]+$/,
        required: true
    },
    Availabledate: {
        type: Date,
        match: /^\d{4}-\d{2}-\d{2}$/,
        required: true
    },
    department_id: {
        ref: "department",
        type: mongoose.Schema.Types.ObjectId
    },
    doctor_id: {
        ref: "doctor",
        type: mongoose.Schema.Types.ObjectId
    }

})
const SlotModel = mongoose.model('slot', SlotSchema)

module.exports = SlotModel;