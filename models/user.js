const mongoose = require('mongoose')
const validate = require('validator')
// eslint-disable-next-line no-useless-escape
const urlRegExp = [/^((http|https)):\/\/(www\.)?((\d{3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?)|([A-z]+(\.[\w-]+)?\.[A-z]{2,4}))(\/[\w-\/]+)?#?/]

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    match: urlRegExp,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validate.isEmail(v),
      message: 'Введенное значение не вляется email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
})

module.exports = mongoose.model('user', userSchema)
