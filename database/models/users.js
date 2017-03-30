var mongoose = require('mongoose');

var UsersSchema = mongoose.Schema({
  username: String,
  displayName: String,
  email: String,
  picture: String
});

var User = mongoose.model('User', UsersSchema);

module.exports = User;




