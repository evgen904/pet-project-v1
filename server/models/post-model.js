const { Schema, model } = require('mongoose')

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now // по дефолту текущее время
  },
  views: {
    type: Number,
    default: 0
  },
  imageUrl: String,
  folders: [{
    type: Schema.Types.ObjectId,
    ref: 'folders'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comments'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Posts', PostSchema)
