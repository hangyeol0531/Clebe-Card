const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017'; // Connection URL
const dbName = 'project'; // Database Name
var db;

MongoClient.connect(url, {
  useNewUrlParser: true
}, (err, client) => {
  db = client.db(dbName);
  db.dbCol = db.collection('users');
  console.log("db연결")
});

exports.dramaList = (id, pw, callback) => {
  db.dbCol.find({id : id, password: pw}).toArray((err, docs) => {
    if (err) console.log(err.message);
    else callback(docs);
  });
};

exports.insertDrama = (options) => {
  db.dbCol.insertOne({
    name: options.name,
    id: options.id,
    password : options.password
  }, (err, res) => {
    if (err) console.log(err.message);
    else console.log('data inserted');
  });
};

exports.close = (options) => {
    db.dbCol.close;
  };