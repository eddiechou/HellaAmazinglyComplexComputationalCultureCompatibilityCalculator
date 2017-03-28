var mongoose = require('mongoose');
var crypto = require('crypto');

var UsersSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  salt: String
  //date is created automatically as apart of mongodb, accessed by the _id object, should we implement our own date for this?
});

UsersSchema.pre('save', function(next) {
  crypto.randomBytes(40, function(err, salt) {
    if (err) {
      console.log('there as an error making a user\'s salt', err);
    } else {
      var hash = crypto.createHash('sha256');
      this.salt = salt.toString();
      hash.update(this.password + this.salt);
      this.password = hash.digest('hex');
      next();
    }
  }.bind(this));
});

var User = mongoose.model('User', UsersSchema);

User.populateTestData = function() {
  User.findOne({username: 'TestUser'}, function(err, found) {
    if (err) { console.error(err); }
    if (!found) {
      var testUser = new User({
        username: 'TestUser',
        email: 'tu@test.com'
      });
      testUser.save(function(err, testUser) {
        if (err) { console.error(err); }
      });
    }
  });
};

User.comparePassword = function(attemptedPassword, salt, actualPassword) {
  var hash = crypto.createHash('sha256');
  hash.update(attemptedPassword + salt);
  attemptedPasswordHash = hash.digest('hex');
  return (actualPassword === attemptedPasswordHash);  
};

module.exports = User;




