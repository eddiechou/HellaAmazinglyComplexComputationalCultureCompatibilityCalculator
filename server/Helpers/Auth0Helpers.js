exports.isLoggedIn = (req, res) => {
  if (req.user) {
    let email, provider = req.user.provider;
    if (provider === 'github') {
      email = req.user.emails[0].value.email;
    } else if (provider === 'facebook' || provider === 'auth0') {
      email = profile.emails[0].value;
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