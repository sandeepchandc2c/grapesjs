const mongoose = require('mongoose')

const Sheets = new  mongoose.Schema({
  name: String

}, {timestamps: true})
module.exports =  mongoose.model('sheets', Sheets);