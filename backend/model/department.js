const mongoose = require('mongoose')
const DepartmentSchema = new mongoose.Schema({
    Department: {
        type: String,
        match: /^[a-zA-Z\s]+$/,
        required: true
    }
})
const DepartmentModel = mongoose.model('department', DepartmentSchema)

module.exports = DepartmentModel;