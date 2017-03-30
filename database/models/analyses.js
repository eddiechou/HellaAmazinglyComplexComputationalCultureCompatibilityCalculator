var mongoose = require('mongoose');

var AnalysesSchema = mongoose.Schema({
  person: String,
  context: String,
  word_count: Number,
  private: Boolean,
  user_id: String
});

var Analysis = mongoose.model('Analysis', AnalysesSchema);

module.exports = Analysis;