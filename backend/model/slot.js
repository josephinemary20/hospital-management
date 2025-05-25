const mongoose = require('mongoose')
const SlotSchema = new mongoose.Schema({
    Starttime: {
        type: String,
    },
    Endtime: {
        type: String,
    },
    Slotduration: {
        type: String,
    },
    Availabledate: {
        type: Date,
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