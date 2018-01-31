var express = require("express");
var mail = require("nodemailer");
var moment = require("moment");

var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "views"))
app.listen(process.env.PORT,process.env.IP, function(){
  console.log("server started")
})
// app.listen(3000, function(){
//   console.log("server started")
// })


var startedTime = Date.now();
var wait;
var startTime;
console.log(startedTime)
getRandomTime();
function getRandomTime() {
  wait = Math.round(Math.random()*86400*1000);
  startTime = Date.now();

  while (moment(Date.now() + wait).toObject().hours > 21 || moment(Date.now() + wait).toObject().hours < 6){
    wait = Math.round(Math.random()*86400*1000);
  }


  console.log(moment(startTime + wait).format('LT'));

  setInterval(function(){
    if (Date.now() > startTime + wait) {
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      getRandomTime();
    }
    else {
      console.log("it isn't time")
    }
  }, 5000)
}
var transporter = mail.createTransport({
  service: 'gmail',
  auth: {
    user: 'dailyphoto8000@gmail.com',
    pass: 'waper143'
  }
});

var mailOptions = {
  from: 'dailyphoto8000@gmail.com',
  to: 'sharynsmith143@gmail.com',
  subject: 'Take a picture',
  text: ':)'
};

app.get("/", function(req,res){

  res.render("index", {time:moment(startTime + wait).format('LT')});
})
