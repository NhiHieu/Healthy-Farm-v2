const express = require('express');
const userController = require('../controllers/user.controller');
const middleware = require('../middleware');

const router = express.Router();

router.get('/log-out', middleware.isLoggedIn, userController.logout);

router.get('/profile', middleware.isLoggedIn, userController.getProfile);

router.use('/', middleware.notLoggedIn);

// rewrite login and signup using ajax jquery
router.post('/api/login', userController.apiLogin)

router.post('/api/signup', userController.apiSignup);

module.exports = router;

// router.get('/sign-up', (req, res, next)=> {
//   const message = req.flash('error');
//   console.log(message);
//   res.render('user/signup', {
//     message,
//     hasError: message.length>0
//   });
// })

// router.post('/sign-up', passport.authenticate('local.signup', {
//   failureRedirect: '/user/sign-up',
//   failureFlash: true
// }), (req, res, next)=> {
//   if (req.session.oldUrl) {
//     const oldUrl = req.session.oldUrl;
//     req.session.oldUrl = null;
//     res.redirect(oldUrl);
//   }
//   res.redirect('/user/profile');
// })

// router.get('/log-in', (req, res, next)=> {
//   const message = req.flash('error');
//   console.log(message);
//   res.render('user/login', {
//     csrf: req.csrfToken(),
//     message,
//     hasError: message.length>0
//   });
// })
// router.post('/log-in', passport.authenticate('local.login', {
//   failureRedirect: '/user/log-in',
//   failureFlash: true
// }), (req, res, next)=> {
//   console.log(req.session.oldUrl);
//   if (req.session.oldUrl) {
//     const oldUrl = req.session.oldUrl;
//     req.session.oldUrl = null;
//     res.redirect(oldUrl);
//   } else {
//     res.redirect('/user/profile');
//   }
// })