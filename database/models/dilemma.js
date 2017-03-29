var mongoose = require('mongoose');

var DilemmaSchema = mongoose.Schema({
  dilemma: Object
});

var Dilemma = mongoose.model('Dilemma', DilemmaSchema);

module.exports = Dilemma;