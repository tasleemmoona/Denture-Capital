var express = require("express");
var app     = express();
var path    = require("path");
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin@root",
  database: "nodejs_db"
});
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/home.html'));
});
app.post('/submit',function(req,res){
  console.log('body: ' + JSON.stringify(req.body.out) + '.');
  var str = req.body.out;
  var arr = str.split(':');
  console.log(arr);
  console.log(arr[1] + " " + arr[0] + " " + arr.slice(2,));
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO feedback (rating, feed, reason) VALUES ?";
    var a1 = arr.slice(2,);
    var s = a1.join(',')
    var values =[
      [arr[1], arr[0], s]
    ];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
  res.sendFile(path.join(__dirname+'/thank.html'));
})
app.listen(8080);
console.log("Running at Port 8080");