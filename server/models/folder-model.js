const { Schema, model } = require('mongoose')

const FolderSchema = new Schema({
  name: {type: String, unique: true, required: true},
  title: {type: String, unique: true, required: true}
})

module.exports = model('Folders', FolderSchema)
