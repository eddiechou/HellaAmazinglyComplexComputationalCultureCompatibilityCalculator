var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var Twitter = require('twitter');

var API = {
  twitterKey: process.env.S1_KEY,
  twitterSecret: process.env.S1_SECRET
}

var client = new Twitter({
  consumer_key: API.twitterKey,
  consumer_secret: API.twitterSecret,
  access_token_key: '863873174-v8I7154WwDnRDw3fUBdvdy9URSXbCUWy2VUMDZOU',
  access_token_secret: '3TIVojSiL82bkeFJBzGxzS8xtqSWy7XTBvAAhJ5Sg2ZXV'
});

passport.use(new Strategy({
    consumerKey: API.twitterKey,
    consumerSecret: API.twitterSecret,
    callbackURL: '/twitter/returnTradeoff'
  },
  function(token, tokenSecret, profile, cb) {
    console.log(token, ' ', tokenSecret);
    client = populateClient(token, tokenSecret, profile.username);
    analyzeProfile(console.log);

    return cb(null, profile);
  })
);

var populateClient = (token, tokenSecret, username) => {
  var client = new Twitter({
    consumer_key: API.twitterKey,
    consumer_secret: API.twitterSecret,
    access_token_key: token,
    access_token_secret: tokenSecret
  });

  client.username = username;

  return client;
};

var analyzeProfile = (username) => {
  return new Promise(function(resolve, reject) {
    username = username || client.username;
    var params = {
      screen_name: username,
      count: 200,
      exclude_replies: true
    };

    var tweetStrings = [];
    client.get('/statuses/user_timeline.json', 
      params, function(err, tweets, res) {
        if (err) reject(err);
        else {
          tweets.forEach(function(tweet) {
            tweetStrings.push(tweet.text);
          });
          tweetStrings = tweetStrings.join(' ');
          resolve(JSON.stringify(tweetStrings));
        }
    });
  })
}

var testAnalysis = (req, res) => {
  var length = '/twitterProfile/'.length;
  var user = req.url.slice(length);
  analyzeProfile(function(tweets) {
    res.send(JSON.stringify(tweets));
  }, user);
}

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports.toAuth = passport.authenticate('twitter');
module.exports.fromAuth = passport.authenticate('twitter', { failureRedirect: '/'});
module.exports.analyzeProfile = analyzeProfile;
module.exports.testAnalysis = testAnalysis;
module.exports.toAnalysis = function(req, res, next) {
  console.log('toAnalysis...');
  console.log(req.user);
  req.body = {
    name: '@' + req.user.username,
    context: 'twitter',
    private: true
  };
  next();
};

module.exports.renderTest = function(req, res) {
  res.render('testProfile', { user: req.user });
};

module.exports.follow = function(req, res, next) {
  console.log('following');
  var params = {
    screen_name: req.params.username
  };

  client.post('https://api.twitter.com/1.1/friendships/create.json', 
    params, function(err) {
      if (err) {
        res.send('there was an error', err);
      }
      else {
        next();
      }
  });
};

module.exports.tweet = function(req, res, par) {
  console.log('tweeting');
  var params = {
    status: `I <3 ${req.params.username}!`
  };

  client.post('https://api.twitter.com/1.1/statuses/update.json', 
    params, function(err) {
      if (err) {
        res.send('there was an error', err);
      }
      else {
        res.redirect('/Home');
      }
  });
};
