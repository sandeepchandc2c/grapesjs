const mongoose = require('mongoose')

const Signature = new  mongoose.Schema({
  signature: String

}, {timestamps: true})
module.exports =  mongoose.model('Signature', Signature);