var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var watsonHelpers = require('./watson/watson-helpers');
var tradeoffHelpers = require('./watson/watson-tradeoff-helpers');
var passport = require('passport');
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn();
var tw = require('./social/twitter.js');
var db = require('../database/config');
var dbHelpers = require('../database/helpers/request_helpers');
var path = require('path');
var secret = require('./secrets');
var Auth0Strategy = require('./social/auth0');
var tradeoffAnalyticsConfig = require('./tradeoff-analytics-config');

//-------------------------------------------------------------//

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieParser(secret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({secret: secret, resave: true, saveUnitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

/**********************/
/**** SOCIAL MEDIA ****/
/**********************/

app.get('/twitter', tw.toAuth);
app.get('/twitter/return', tw.fromAuth, tw.toAnalysis, 
  watsonHelpers.analyzeProfile);
app.get('/twitterProfile/*', tw.testAnalysis);

/****************/
/**** WATSON ****/
/****************/

app.post('/analysis', watsonHelpers.analyzeProfile);
app.post('/tradeoff', tradeoffHelpers.analyzeTradeoffs);

/****************/
/**** Auth0 ****/
/****************/

app.get('/AuthLogin', (req, res) => {
  res.render('login', { env: process.env });
});

app.get('/AuthLogout', function(req, res){
  req.logout();
  res.redirect('/Home');
});

app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/failed-login' }),
  function(req, res) {
    console.log(req.user);  
    res.redirect(req.session.returnTo || '/');
  });

app.get('/LoggedIn', (req, res) => {
  req.user ? res.send('logged in') : res.send('not logged in');
})

/****************/
/**** NATIVE ****/
/****************/

app.get('/hasSession', dbHelpers.hasSession);
app.post('/signup', dbHelpers.signup);
app.post('/login', dbHelpers.loginUser);     
app.get('/logout', dbHelpers.logoutUser);  
app.get('/analyze/*', dbHelpers.findAllDataFromAnAnalysis); 
app.get('/publicanalyses', dbHelpers.getPublicAnalyses);
app.get('/useranalyses', dbHelpers.getUserAnalyses);

app.get('/tradeoffPage', (req, res) => {
  console.log('serving tradeoff page');
  res.sendFile(path.join(__dirname, '../client/dist/tradeoff.html'));
});

app.get('*', (req, res) => {
  console.log('wildcard routing');
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});



// For local development, copy your service instance credentials here, otherwise you may ommit this parameter
var serviceCredentials = {
  username: process.env.T_A_USERNAME,
  password: process.env.T_A_PASSWORD
}
// When running on Bluemix, serviceCredentials will be overriden by the credentials obtained from VCAP_SERVICES
tradeoffAnalyticsConfig.setupToken(app, serviceCredentials); 

// to communicate with the service using a proxy rather then a token, add a dependency on "body-parser": "^1.15.0" 
// to package.json, and use:
// tradeoffAnalyticsConfig.setupProxy(app, serviceCredentials);



app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port 3000.');
});
