var Analysis = require('../../database/models/analyses');
var AnalysesTrait = require('../../database/models/analyses_traits');
var tradeoff = require('./tradeoff');
var fs = require('fs');

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
        'is_objective': false,
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

// Problem object contains: subject, columns, and options
var createProblemObject = function() {

  return new Promise((resolve, reject) => {
    var problemObj = {
      subject: 'personalities', 
      columns: null, 
      options: null
    };

    var traitParams = defaultTraitParams;

    // Populate the Problem Object with columns and options properties
    createColumns(traitParams)
    .then(function(columns) {
      problemObj.columns = columns;
      return createOptions();
    })
    .then(function(options) {
      problemObj.options = options;

      // Send problem object to the Watson Tradeoff API
      // Note: Since we're using the widget, we don't need to make an API call from our server
      // tradeoff.getDilemma(problemObj);

      resolve(problemObj);
    });

  });
};

// TODO (Eddie): should differentiate based on twitter vs. resume analyses
// For now: only twitter
var writeProblemJSON = function() {
  console.log('in writeProblemJSON');
  
  return new Promise((resolve, reject) => {
    createProblemObject()
    .then(function(problemObj) {
      console.log('before writefile');
      var filename = './client/dist/twitterProblem.json';
      fs.writeFile(filename, JSON.stringify(problemObj), (err) => {
        if (err) {
          reject();
          throw err;
        }
        console.log('The file ' + filename + ' has been saved!');
        resolve();
      });
    });
  });
};

module.exports.writeProblemJSON = writeProblemJSON;