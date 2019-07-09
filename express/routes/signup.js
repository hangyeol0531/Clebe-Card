var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
    res.render('signup');
  });

router.post('/', function (req, res) {
    console.log('login 호출됨');
    res.render('login');
  });

module.exports = router;
