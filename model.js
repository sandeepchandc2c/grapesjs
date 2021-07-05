const mongoose = require('mongoose')

const Editor = new  mongoose.Schema({
  data: String

}, {timestamps: true})
module.exports =  mongoose.model('form', Editor);