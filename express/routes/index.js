var express = require('express');
var router = express.Router();
const model = require('../model/dramaDAO');
var session = require('express-session');
//const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser'); 
var cookie = require('cookie');
var bodyParser = require('body-parser');
var app = express();

function cookiecheck(req, res){
  if(!(req.headers.cookie)){
  console.log('no cookie')
  res.redirect('login');
  }
}

var app = express();
app.use(cookieParser());

/* GET home page. */
router.post('/login', function (req, res) {
  var paramname = req.body.name || req.query.name;
  var paramid = req.body.id || req.query.id;
  var parampassword = req.body.password || req.query.password;
  var parampassword = req.body.repassword || req.query.repassword;
  var userinformation = {name: paramname, id : paramid, password : parampassword };
  if(parampassword === parampassword){
    console.log("비밀번호 확인 오류");
    res.status(401).send("<script>alert('비밀번호가 다릅니다!');window.location = '/signup'</script>")
  }
  console.log('회원가입 완료');
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
  
      // req.session.id = paramid;
      // req.session.save(function(){
      //    console.log(req.session);
      // });
      console.log("쿠키 생성")
      res.cookie('user', paramid, {
   });
   console.log(req.headers.cookie);
      res.render('index'); 
    }
    model.close;
  });
});

router.post('/marryproduction', function (req, res) {
  var paramsinrang = req.body.sinrang || req.query.sinrang;
  var paramsinbu = req.body.sinbu || req.query.sinbu;
  var paramdate = req.body.date || req.query.date;
  var paramplace = req.body.place || req.query.place;
  var paramphonenumber = req.body.phonenumber || req.query.phonenumber;
  console.log(paramsinrang)
  console.log(paramsinbu)
  console.log(paramdate)
  console.log(paramplace)
  console.log(paramphonenumber)
  res.render('marryproduction',{
      sinrang : paramsinrang,
      sinbu : paramsinbu,
      date : paramdate,
      place : paramplace,
      phonenumber : paramphonenumber
   });
  });

router.post('/marry2production', function (req, res) {
  var paramsinrang = req.body.sinrang || req.query.sinrang;
  var paramsinbu = req.body.sinbu || req.query.sinbu;
  var paramdate = req.body.date || req.query.date;
  var paramplace = req.body.place || req.query.place;
  var paramphonenumber = req.body.phonenumber || req.query.phonenumber;
  console.log(paramsinrang)
  console.log(paramsinbu)
  console.log(paramdate)
  console.log(paramplace)
  console.log(paramphonenumber)

  res.render('marry2production',{
    sinrang : paramsinrang,
    sinbu : paramsinbu,
    date : paramdate,
    place : paramplace,
    phonenumber : paramphonenumber
    });
 });

router.post('/birthproduction', function (req, res) {
  var paramreceive = req.body.receive || req.query.receive;
  var paramsend = req.body.send || req.query.send;
  var paramdocu = req.body.docu || req.query.docu;
  var paramdate = req.body.date || req.query.date;
  console.log(paramreceive)
  console.log(paramsend)
  console.log(paramdocu)
  console.log(paramdate)

  res.render('birthproduction',{
    receive : paramreceive,
    send : paramsend,
    docu : paramdocu,
    date : paramdate,
    });
});

router.post('/birth2production', function (req, res) {
  var paramreceive = req.body.receive || req.query.receive;
  var paramsend = req.body.send || req.query.send;
  var paramdocu = req.body.docu || req.query.docu;
  var paramdate = req.body.date || req.query.date;
  console.log(paramreceive)
  console.log(paramsend)
  console.log(paramdocu)
  console.log(paramdate)

  res.render('birth2production',{
    receive : paramreceive,
    send : paramsend,
    docu : paramdocu,
    date : paramdate,
    });
});


router.get('/', function (req, res) {
  if(req.headers.cookie){
    console.log(req.headers.cookie);
    res.clearCookie(req.headers.cookie);
    console.log("쿠키 삭제")
  }
  console.log('login 호출됨');
  res.render('login');
});

router.get('/login', function (req, res) {
  console.log('log 호출됨');
  res.render('login');
});

router.get('/index', function (req, res) {
  cookiecheck(req, res)
  console.log('index 호출됨');
  res.render('index');
});

router.post('/index', function (req, res) {
  cookiecheck(req, res)
  console.log('index 호출됨');
  res.render('index');
});

router.get('/card', function (req, res) {
  cookiecheck(req, res)
  console.log('card 호출됨');
  res.render('card');
});

router.get('/Q&A', function (req, res) {
  cookiecheck(req, res)
  console.log('Q&A 호출됨');
  res.render('Q&A');
});

router.get('/marry', function (req, res) {
  cookiecheck(req, res)
  console.log('marry 호출됨');
  res.render('marry');
});

router.get('/marry2', function (req, res) {
  cookiecheck(req, res)
  console.log('marry2 호출됨');
  res.render('marry2');
});

router.get('/birth', function (req, res) {
  cookiecheck(req, res)
  console.log('birth 호출됨');
  res.render('birth');
});

router.get('/birth2', function (req, res) {
  cookiecheck(req, res)
  console.log('birth2 호출됨');
  res.render('birth2');
});

router.get('/signup', function (req, res) {
  console.log('birth2 호출됨');
  res.render('signup');
});



module.exports = router;

