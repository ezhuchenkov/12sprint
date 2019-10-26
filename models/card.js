const mongoose = require('mongoose')

// eslint-disable-next-line no-useless-escape
const urlRegExp = [/^((http|https)):\/\/(www\.)?((\d{3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?)|([A-z]+(\.[\w-]+)?\.[A-z]{2,4}))(\/[\w-\/]+)?#?/]

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    match: urlRegExp,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('card', cardSchema)
module.exports = urlRegExp
