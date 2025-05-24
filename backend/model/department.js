const mongoose = require('mongoose')
const DepartmentSchema = new mongoose.Schema({
    Department: {
        type: String,
    }
})
const DepartmentModel = mongoose.model('department', DepartmentSchema)

module.exports = DepartmentModel;