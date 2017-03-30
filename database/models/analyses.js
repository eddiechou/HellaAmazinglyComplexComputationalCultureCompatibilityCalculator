var mongoose = require('mongoose');

var AnalysesSchema = mongoose.Schema({
  person: String,
  context: String,
  word_count: Number,
  private: Boolean,
  userEmail: String
});

var Analysis = mongoose.model('Analysis', AnalysesSchema);

module.exports = Analysis;