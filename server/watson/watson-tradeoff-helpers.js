var Analysis = require('../../database/models/analyses');
var AnalysesTrait = require('../../database/models/analyses_traits');

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
                for (var j = 0; j < analysisTraits.length; j++) {
                  values[analysisTraits[j].trait_id] = analysisTraits[j].percentile.valueOf();
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

var createColumns = function(callback) {
  return new Promise((resolve, reject) => {

    // Test columns
    var columns = [
      {
        "key": "facet_adventurousness",
        "type": "numeric",
        "goal": "max",
        "is_objective": true,
        "full_name": "Adventuresness",
        "range": {
          "low": 0,
          "high": 100
        },
        "format": "number:0"
      },
      {
        "key": "facet_emotionality",
        "type": "numeric",
        "goal": "min",
        "is_objective": true,
        "full_name": "Emotionality",
        "format": "number:0",
        "range": {
          "low": 0,
          "high": 100
        }
      },
      {
        "key": "facet_intellect",
        "type": "numeric",
        "goal": "max",
        "is_objective": true,
        "full_name": "Intellect",
        "format": "number:0",
        "range": {
          "low": 0,
          "high": 100
        }
      },
    ];

    resolve(columns);

  });
};

// TODO (Eddie): Right now, it only sends back the options array as a response,
// still need to:
// 1) create the whole Problem object 
// 2) send whole Problem object to Watson Tradeoff API
// 3) deal with result

// Sends a POST request with a Problem object to the Watson Tradeoff API
// Problem object contains: subject, columns, and options
var analyzeTradeoffs = function(req, res) {
  var problemObj = {
    subject: 'personalities', 
    columns: null, 
    options: null
  };
  // Populate with columns and options
  createColumns()
  .then(function(columns) {
    problemObj.columns = columns;
    return createOptions();
  })
  .then(function(options) {
    problemObj.options = options;
    res.send(JSON.stringify(problemObj));
  });
};

module.exports.analyzeTradeoffs = analyzeTradeoffs;
module.exports.createOptions = createOptions;
module.exports.createColumns = createColumns;