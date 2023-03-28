require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const md5 = require("md5");
mongoose.set('strictQuery', true);
 //encryption using mongoose
mongoose.connect('mongodb://127.0.0.1:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`CONNECTED TO MONGO!`);
    })
    .catch((err) => {
        console.log(`OH NO! MONGO CONNECTION ERROR!`);
        console.log(err);
    })
const app = express();


app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const userSchema = new mongoose.Schema({
  email: String,
  password : String
});





const User = new mongoose.model("User", userSchema);






app.get("/register", function (req, res) {
  res.render("register");
  });

app.get("/login", function (req, res) {
  res.render("login");
  });


app.get("/", function (req, res) {
  res.render("home");
  });



app.post("/register", function (req, res) { 
  const newUser = new User({
    email : req.body.username,
    password: md5(req.body.password)
  });

  newUser.save()
  .then(function () {
    res.render("secrets");
    })
    .catch(function (err) {
      res.send(err);
      });
 });

app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = md5(req.body.password);
  
  User.findOne({email: username})
  .then(function (founduser) {
    if (founduser.password === password) {
    res.render("secrets");      
    }

    })
    .catch(function (err) {
      res.send(err);
      }); 


});






























app.listen(3000, function() {
  console.log("Server started on port 3000");
});
