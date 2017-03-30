var Analysis = require('../../database/models/analyses');
var AnalysesTrait = require('../../database/models/analyses_traits');
var tradeoff = require('./tradeoff');

// Example options array
// [
//   {
//     "key": "1",
//     "name": "Samsung Galaxy S4",
//     "values": {
//       "price": 249,
//       "weight": 130,
//       "brand": "Samsung",
//       "rDate": "2013-04-29T00:00:00Z"
//     }
//   },
//   {
//     "key": "2",
//     "name": "Apple iPhone 5",
//     "values": {
//       "price": 349,
//       "weight": 112,
//       "brand": "Apple",
//       "rDate": "2012-09-21T00:00:00Z"
//     }
//   }
// ]
var createOptions = function(callback) {
  return new Promise((resolve, reject) => {

    var options = [];

    var promises;
    // Query for the analyses we want (all public profiles FOR NOW)
    Analysis.find({private: false})
    .exec(function(err, analysesArray) {
      if (err) { 
        res.status(500).send(JSON.stringify({error: 'Databases failed to query'})); 
      } else if (analysesArray) {

        promises = analysesArray.map(function(analysis) {
          // return a promise for each analysis
          return new Promise((resolve, reject) => {
            // Set up key and name
            var obj = {
              key: analysis._id,
              name: analysis.person
            };

            // Set up values object
            var values = {};
            // Query analyses_traits for all traits with this analysis_id
            AnalysesTrait.find({analysis_id: analysis._id})
            .exec(function(err, analysisTraits) {
              if (err) {
                console.log('AnalysesTrait.find() err', err);
                reject(err);
              } else if (analysisTraits) {
                // Add each analysisTrait to the values object
                for (var j = 0; j < analysisTraits.length; j++) {
                  // TEMPORARILY FILTER to minimize results:
                  // Will only get big5 traits
                  if (analysisTraits[j].trait_id.charAt(0) === 'b') {
                    values[analysisTraits[j].trait_id] = analysisTraits[j].percentile.valueOf() * 100;
                  }
                }
              }
              obj.values = values;
              options.push(obj);
              // resolve(options);
              resolve();
            });
          });
        });
        // Promise.all(promises).then(() => callback(options));
        Promise.all(promises).then(() => resolve(options));
      }
    });
  });
};

const defaultTraitParams = [ {key: 'big5_openness', goal: 'max', full_name: 'Openness' },
  {key: 'big5_conscientiousness', goal: 'max', full_name: 'Conscientiousness' },
  {key: 'big5_extraversion', goal: 'max', full_name: 'Extraversion' },
  {key: 'big5_agreeableness', goal: 'max', full_name: 'Adventurousness' },
  {key: 'big5_neuroticism', goal: 'max', full_name: 'Neuroticism' }
];

// traitParams looks like defaultTraitParams above
var createColumns = function(traitParams) {
  return new Promise((resolve, reject) => {
    
    var columns = [];
    traitParams.forEach(function(trait) {
      var column = {
        'key': trait.key,
        'type': 'numeric',
        'goal': trait.goal,
        'is_objective': true,
        'full_name': trait.full_name,
        'range': {
          'low': 0,
          'high': 100
        },
        'format': 'number:0'
      };
      columns.push(column);
    });

    resolve(columns);
  });
};

// TODO (Eddie): Right now, it only sends back the options array as a response,
// still need to:
// 1) create the whole Problem object (DONE)
// 2) send whole Problem object to Watson Tradeoff API (DONE)
// 3) deal with result

// Sends a POST request with a Problem object to the Watson Tradeoff API
// Problem object contains: subject, columns, and options
var analyzeTradeoffs = function(req, res) {

  var problemObj = {
    subject: 'personalities', 
    columns: null, 
    options: null
  };

  // TODO (Eddie): Set up middleware to parse data from client to create req.traitParams
  var traitParams = req.traitParams || defaultTraitParams;

  // Populate the Problem Object with columns and options properties
  createColumns(traitParams)
  .then(function(columns) {
    problemObj.columns = columns;
    return createOptions();
  })
  .then(function(options) {
    problemObj.options = options;

    // Send problem object to the Watson Tradeoff API
    tradeoff.getDilemma(problemObj);

    // TODO (Eddie): Send a proper response back to the client
    res.send(JSON.stringify(problemObj));
  });
};

module.exports.analyzeTradeoffs = analyzeTradeoffs;
module.exports.createOptions = createOptions;
module.exports.createColumns = createColumns;