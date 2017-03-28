var mongoose = require('mongoose');

var AnalysesSchema = mongoose.Schema({
  person: String,
  context: String,
  word_count: Number,
  private: Boolean,
  user_id: String
});

var Analysis = mongoose.model('Analysis', AnalysesSchema);

Analysis.populateTestData = function(sampledata) {
  Analysis.findOne({person: sampledata.name}, function(err, found) {
    if (err) { console.log(err); }
    if (!found) {
      var testAnalysis = new Analysis({
        person: sampledata.name,
        context: sampledata.context,
        word_count: sampledata.word_count,
        private: false,
        user_id: sampledata.user_id // to be changed to 
        // a query to get the user_id in the future
      });
      testAnalysis.save(function(err, testAnalysis) {
        if (err) { console.error(err); }
      });
    }
  });
};

module.exports = Analysis;