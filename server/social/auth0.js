import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import dbHelpers from '../../database/helpers/request_helpers';

const formatUserData = {
  auth0: dbHelpers.auth0UserData,
  github: dbHelpers.githubUserData,
  facebook: dbHelpers.facebookUserData
}

// Configure Passport to use Auth0
var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  '/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {

    // route to specific helper func based on login provider
    let userData = formatUserData[profile.provider];

    dbHelpers.findOrCreateUser(userData)
    .then((response) => {
      console.log(response);
      return done(null, profile);
    })
    .catch((err) => {
      throw err;
    });
    
  });

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});