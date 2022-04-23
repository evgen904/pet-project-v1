const { Schema, model } = require('mongoose')

const PostSchema = new Schema({
  name: {type: String, unique: true, required: true},
  title: {type: String, unique: true, required: true}
})

module.exports = model('Posts', PostSchema)
