const express = require('express'); 
 const app = express(); 
 const bodyparser = require('body-parser'); 
 app.use(bodyparser.urlencoded({extended:true}));		


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/bmi.html");
})

app.post("/", function (req, res) {
    var height = Number(req.body.Height);
    var weight = Number(req.body.Weight);
    var bmi = (height+weight) * 2; 

    res.send("Your bmi is " + bmi)
})


app.listen(3000, function () {
    console.log("Server started on 3000");
})






