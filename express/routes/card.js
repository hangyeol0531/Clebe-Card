var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/card', function (req, res) {
  console.log('card 호출됨');
  res.render('card');
});

router.get('/index', function (req, res) {
  console.log('index 호출됨');
  res.render('index');
});

router.get('/청첩장', function (req, res) {
  console.log('청첩장 호출됨');
  res.render('청첩장');
});



module.exports = router;
