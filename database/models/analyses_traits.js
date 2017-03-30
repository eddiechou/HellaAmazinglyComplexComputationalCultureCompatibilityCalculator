var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
var Analysis = require('./analyses.js');

var AnalysesTraitsSchema = mongoose.Schema({
	analysis_id: String,
  trait_id: String,
  name: String,
  category: String,
	percentile: SchemaTypes.Double,
  raw_score: SchemaTypes.Double
});

var AnalysisTrait = mongoose.model('AnalysisTrait', AnalysesTraitsSchema);

module.exports = AnalysisTrait;