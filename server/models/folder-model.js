const { Schema, model } = require('mongoose')

const FolderSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
})

module.exports = model('Folders', FolderSchema)
