module.exports.getOldUrl = (req, res, next)=> {
  req.session.oldUrl = req.url;
  next();
}

module.exports.isLoggedIn = (req, res, next) =>{
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports.notLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}