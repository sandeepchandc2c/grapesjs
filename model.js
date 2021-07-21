const mongoose = require('mongoose')

const Editor = new  mongoose.Schema({
  data: String,
  sheet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sheets"
  }
}, {timestamps: true})
module.exports =  mongoose.model('forms', Editor);