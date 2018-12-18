const express = require('express');
const User = require('../models/user.model');

const router = express.Router();

router.get('/signup', (req, res, next)=> {
  res.render('user/signup');
})
module.exports = router;