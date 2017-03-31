import passport from 'passport';
import dbHelpers from '../../database/helpers/request_helpers';

const formatUserData = {
  auth0: dbHelpers.auth0UserData,
  github: dbHelpers.githubUserData,
  facebook: dbHelpers.facebookUserData
}

exports.isLoggedIn = (req, res) => {
  if (req.user) {
    let email, provider = req.user.provider;
    if (provider === 'github') {
      email = req.user.emails[0].value.email;
    } else if (req.user.emails && provider === 'facebook' || provider === 'auth0') {
      email = req.user.emails[0].value;
    } else if (provider === 'facebook') {
      email = req.user.id;
    }
    req.user.userEmail = email;
    res.send('logged in');
  } else {
    res.send('not logged in');
  }
}

exports.renderLoginWidget = (req, res) => {
  res.render('login', { env: process.env });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/Home');
};

exports.pAuth = passport.authenticate('auth0', { failureRedirect: '/failed-login' });

exports.successRedirect = (req, res) => {
  res.redirect('/Home');
};

exports.getUserData = (req, res) => {
  let userData = formatUserData[req.user.provider](req.user);
  res.send(userData);
}