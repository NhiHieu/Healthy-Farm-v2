var express = require('express');
var router = express.Router();



// home page 
router.get('/', (req, res, next)=> {
  res.render('pages/home');
})

module.exports = router;
