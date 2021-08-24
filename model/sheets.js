const mongoose = require('mongoose')

const Sheets = new  mongoose.Schema({
  name: String,
  edit: {
    type: Boolean,
    default: false
  }

}, {timestamps: true})
module.exports =  mongoose.model('sheets', Sheets);