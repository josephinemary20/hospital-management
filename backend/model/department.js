const mongoose = require('mongoose')
const DepartmentSchema = new mongoose.Schema({
    Department: {
        type: String,
        validate: {
            validator: function (val) {
                return /^[a-zA-Z\s]+$/.test(val);
            },
            message: props => `${props.value} is not a Department!`
        },
        required: [true, 'Department is required.']
    }
})
const DepartmentModel = mongoose.model('department', DepartmentSchema)

module.exports = DepartmentModel;