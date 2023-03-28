const express = require('express'); 
const bodyparser = require('body-parser');  
const app = express(); 
const date = require(__dirname + '/views/date.js');
console.log(date.getDate());
 let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

 app.set("view engine", "ejs");
 app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));



 app.get("/", function (req, res) {
  let day = date.getDate();
    
    res.render("list", {listTitle:day, newlistitems: items} );

    
  });



app.post("/", function (req, res) {

  let item = req.body.new_item;
if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
}
else{
  items.push(item);
  console.log(item);
  res.redirect("/");

}
  
    });



app.get("/work", function (req, res) {
  res.render("list", {listTitle: "Work List", newlistitems:workItems});

  });





app.get("/about", function (req, res) {
  res.render("about");
  });






  app.listen(3000, function(){
    console.log("Server started on port 3000");
  });



