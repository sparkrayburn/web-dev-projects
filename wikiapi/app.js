const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
 
mongoose.connect('mongodb://127.0.0.1:27017/wikiDB', { useNewUrlParser: true, useUnifiedTopology: true })
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

const articleSchema = new mongoose.Schema( {
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

////////////////////////////////////Requests targetting all articles//////////////////////////////

app.route("/articles").get(function (req, res) {
    Article.find()
    .then(function (foundArticles) {
        res.send(foundArticles);
      })
      .catch(function (err) {
        res.send(err);
        });
  })


  .post(function (req, res) {
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save()
    .then(function () {
        res.send("sucessfully added a new article");
      })
      .catch(function (err) {
        res.send(err);
        })


}).delete( function (req, res) {
    Article.deleteMany()
    .then(function () {
        console.log("SUccessfully deleted everything");
      })
      .catch(function (err) {
        console.log(err);
        })
  });

////////////////////////////////////Requests targetting a specific article//////////////////////////////


app.route("/articles/:articleTitle")



.get(function (req, res) {

  
      Article.findOne({title:req.params.articleTitle})
      .then(function (foundArticle) {
        res.send(foundArticle);
        })
        .catch(function (err) {
          console.log("no articles matching that title was found");
          })
  })

.put(function (req, res) {
  Article.replaceOne(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true})
    .then(function () {
      res.send("Succesfully updated article");
      })
      .catch(function (err) {
        res.send(err);
        })
  
  })

  .patch(function (req, res) {
    Article.findOneAndUpdate(
      {title: req.params.articleTitle},
      {$set: req.body})
      .then(function () {
        res.send("success bro");
        })
        .catch(function (err) {
          res.send(err);
          })
    })


.delete(function (req, res) {
  Article.deleteOne(
    {title: req.params.articleTitle}
  )
    .then(function () {
    res.send("deleted");
    })
    .catch(function (err) {
      res.send(err);
      })

  })































app.listen(3000, function() {
  console.log("Server started on port 3000");
});