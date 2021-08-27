const mongoose = require('mongoose')

const AssignedUser = new  mongoose.Schema({
    name: String,
    email: String,
    recpient: Number,
    form : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sheets"
       }

}, {timestamps: true})
module.exports =  mongoose.model('assigneduser', AssignedUser);