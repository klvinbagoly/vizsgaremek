const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  name: String,
  role: Number
})

UserSchema.plugin(require('mongoose-bcrypt'))

module.exports = mongoose.model('User', UserSchema)