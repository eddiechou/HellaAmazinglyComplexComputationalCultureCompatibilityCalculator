var mongoose = require('mongoose');

var DilemmaSchema = mongoose.Schema({
  dilemma: Object
});

var Dilemma = mongoose.model('Dilemma', DilemmaSchema);

Dilemma.populateTestData = function(sampledata) {
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

module.exports = Dilemma;