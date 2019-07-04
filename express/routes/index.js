var express = require('express');
var router = express.Router();
const model = require('../model/dramaDAO');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: "mongodb://localhost/sessionssave",
    collection: "sessions"
  })
}));
var app = express();

/* GET home page. */
router.post('/login', function (req, res) {
  if(req.session.id){
    req.session.destroy(function(err){
      if(err){
          console.log(err);
      }
    })
    console.log('logout');
    res.redirect('login');
  }
  res.render('login');
  console.log('회원가입 완료');
  var paramname = req.body.name || req.query.name;
  var paramid = req.body.id || req.query.id;
  var parampassword = req.body.password || req.query.password;
  var userinformation = {name: paramname, id : paramid, password : parampassword };
  console.log(userinformation)
  model.insertDrama(userinformation)
  model.close();
  res.render('login');
});

router.post('/index', function (req, res) {
  var paramid = req.body.inid || req.query.inid;
  var parampassword = req.body.inpa || req.query.inpa;
  model.dramaList(req.body.inid, req.body.inpa, docs => {
    console.log(docs);
    if(docs.length < 1) {
      res.status(401).send("<script>alert('아이디 정보를 찾을 수 없습니다.');window.location = '/login'</script>")
    }
    else {
      req.session.id = paramid;
      req.session.save(function(){
         console.log(req.session);
      });
      res.render('index'); 
    }
    model.close;
  });
});

// router.post('/login', function (req, res) {
//   console.log('login 호출됨');
//   res.render('login');
// });

router.get('/', function (req, res) {
  console.log('login 호출됨');
  res.render('login');
});

router.get('/login', function (req, res) {
 
  console.log('login 호출됨');
  res.render('login');
});

router.get('/index', function (req, res) {
  console.log('index 호출됨');
  res.render('index');
});

router.post('/index', function (req, res) {
  console.log('index 호출됨');
  res.render('index');
});

router.get('/card', function (req, res) {
  console.log('card 호출됨');
  res.render('card');
});

router.get('/Q&A', function (req, res) {
  console.log('Q&A 호출됨');
  res.render('Q&A');
});

router.get('/marry', function (req, res) {
  console.log('marry 호출됨');
  res.render('marry');
});

router.get('/marry2', function (req, res) {
  console.log('marry2 호출됨');
  res.render('marry2');
});

router.get('/birth', function (req, res) {
  console.log('birth 호출됨');
  res.render('birth');
});

router.get('/birth2', function (req, res) {
  console.log('birth2 호출됨');
  res.render('birth2');
});

router.get('/signup', function (req, res) {
  console.log('birth2 호출됨');
  res.render('signup');
});


module.exports = router;

