const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    Adminname: {
        type: String,
        validate: {
            validator: function (val) {
                return /^[a-zA-Z\s]+$/.test(val);
            },
            message: props => `${props.value} is not a Admin name!`
        },
        required: [true, 'Adminname is required.']

    },
    Adminid: {
        type: String,
        validate: {
            validator: function (val) {
                return /^AN\d{3}$/.test(val);
            },
            message: props => `${props.value} is not a Admin id!`
        },
        required: [true, 'Admin ID is required.']
    }

})
const AdminModel = mongoose.model('admin', AdminSchema)

module.exports = AdminModel;