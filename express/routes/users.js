var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  console.log('main 호출됨');
  res.render('main');
});

router.get('/login', function (req, res) {
  console.log('login 호출됨');
  res.render('login');
});
module.exports = router;
