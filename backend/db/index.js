const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://josephinemary200802:josephine@cluster0.9ae9sbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    dbName: "hospital"
}).then(() => console.log('database connection'))
    .catch(err => console.log(err));
