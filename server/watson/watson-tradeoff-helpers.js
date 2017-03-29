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
  var options = [];

  // Query for the analyses we want (all public profiles FOR NOW)
  Analysis.find({private: false})
  .exec(function(err, analysesArray) {
    if (err) { 
      res.status(500).send(JSON.stringify({error: 'Databases failed to query'})); 
    } else if (analysesArray) {
      console.log('analyses array is: ', analysesArray);

      // For each analysis returned
      for (var i = 0; i < analysesArray.length; i++) {
        // Set up key and name
        var obj = {
          key: analysesArray[i]._id,
          name: analysesArray[i].person
        };

        // Set up values
        var values = {};
        // Query analyses_traits for all traits with this analysis_id
        // return analyses_traits in callback

        // Using an IFFE (TODO: find another way to check when all the 
        // queries are done!)
        (function (i) {
          AnalysesTrait.find({analysis_id: analysesArray[i]._id})
          .exec(function(err, analysisTraits) {
            if (err) {
              console.log('AnalysesTrait.find() err', err);
            } else if (analysisTraits) {
              for (var j = 0; j < analysisTraits.length; j++) {
                // console.log('analysis trait: ', analysisTraits[j]);
                values[analysisTraits[j].trait_id] = analysisTraits[j].percentile;
              }
            }
            // console.log('>> options', options);
          })
          .then(function() {
            console.log('in then');
            obj.values = values;
            options.push(obj);
            console.log('i:', i);
            console.log('analysesArray.length -1 ', analysesArray.length - 1);
            if (i === analysesArray.length - 1) {
              console.log('in the if');
              callback(options);
            }
          });
        })(i);
      }
    }
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

  createOptions(function(options) {
    console.log(options);
    res.send(JSON.stringify(options));
  });
};

module.exports.analyzeTradeoffs = analyzeTradeoffs;
module.exports.createOptions = createOptions;