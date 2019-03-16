const getOldUrl = (req, res, next)=> {
  req.session.oldUrl = req.url;
  next();
}

 const isLoggedIn = (req, res, next) =>{
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

const notLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = {
  getOldUrl,
  isLoggedIn,
  notLoggedIn,
}