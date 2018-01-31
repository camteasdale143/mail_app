var express = require("express");
var mail = require("nodemailer");
var moment = require("moment");
var util = require('util');

var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "views"))
app.listen(3000, function(){
  console.log("server started")
})

var setTimeoutPromise = util.promisify(setTimeout);


var startedTime = Date.now();
var wait;
console.log(startedTime)
getRandomTime();
function getRandomTime() {

  wait = Math.round(Math.random()*86400*1000);
  while (moment(Date.now() + wait).toObject().hours > 21 || moment(Date.now() + wait).toObject().hours < 6){
    wait = Math.round(Math.random()*86400*1000);
  }
  console.log(moment(Date.now() + wait).format('LT'));
  setTimeoutPromise(wait).then((value) => {
    getRandomTime();
  });
}
var transporter = mail.createTransport({
  service: 'gmail',
  auth: {
    user: 'sharynsmith143@gmail.com',
    pass: 'waper143'
  }
});

var mailOptions = {
  from: 'sharynsmith143@gmail.com',
  to: 'sharynsmith143@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

app.get("/", function(req,res){

  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });
  res.render("index", {time:moment(Date.now() + wait).format('LT')});
})
