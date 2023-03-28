const express = require('express'); 
const bodyparser = require('body-parser');  
const mongoose = require("mongoose");
const app = express(); 
const _ = require("lodash");
mongoose.set('strictQuery', true);
 
mongoose.connect('mongodb+srv://abhinavnk:6TfIUHaAax4OR5oV@0.dypvsth.mongodb.net/todolistDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`CONNECTED TO MONGO!`);
    })
    .catch((err) => {
        console.log(`OH NO! MONGO CONNECTION ERROR!`);
        console.log(err);
    })
    




 app.set("view engine", "ejs");
 app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));


const itemsSchema = new mongoose.Schema( {
  name: String
});

const Item = mongoose.model("Item", itemsSchema);


const takebath = new Item({
  name: "Take Bath"
});

const goout = new Item({
  name: "Go Out"
});


const park = new Item({
  name: "Go To the park"
});

const defaultItems = [takebath, goout, park];


const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);




              

 app.get("/", function (req, res) {

  

Item.find()
  .then(function (items) {
    if (items.length === 0) {
        Item.insertMany(defaultItems)
          .then(function () {
            console.log("Inserted successfully");
            res.redirect("/");
  })
          .catch(function (err) {
            console.log(err);
  })
    }else{
        res.render("list", {listTitle:"Today", newlistitems: items} );
    }
    
            

    // setTimeout(function() { mongoose.connection.close();}, 1000);
    })

    .catch(function (err) {
      console.log(err);
      })
    


    
  });



app.post("/", function (req, res) {
   

  const itemName = req.body.new_item;
  const listName = req.body.list;
  const item = new Item ({
    name: itemName
  })
  
  if(listName === "Today"){
  item.save();
  res.redirect("/");   
  } else{
    List.findOne({name: listName})
    .then(function (foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
      })
  }
  
    });




app.post("/delete", function (req, res) { 
  const checkedItemId  = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
  Item.findByIdAndRemove(checkedItemId)
  .then(function () {
    console.log("Deleted successfully");
  
    res.redirect("/");
    })
    .catch(function (err) {
      console.log(err);
      })
    
  }else{
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}})
    .then(function (foundList) {
      res.redirect("/" + listName);
      })
  }

 });



app.get("/:customListName", function (req, res) {  
  const customListName = _.capitalize(req.params.customListName);
  
  List.findOne({name: customListName})
  .then(function (foundList) {
    if(!foundList){
        const list = new List({
    name: customListName,
    items: defaultItems
  })
  list.save();
  res.redirect("/" + customListName);
    }
    else{
      res.render("list", {listTitle: foundList.name, newlistitems: foundList.items})
    }
    })


});





app.get("/about", function (req, res) {
  res.render("about");
  });






  app.listen(3000, function(){
    console.log("Server started on port 3000");
  });



