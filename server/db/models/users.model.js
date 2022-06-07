const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true
  }
})

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
