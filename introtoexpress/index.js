const express = require("express");
const app = express();

app.get("/", function (req, res) {
    res.send("<h1> hello world </h1>");
} )


app.get("/contact", function (req, res) {
    res.send("contact me at abhinav@gmail.com feel free to contact")
})

app.get("/about", function (req, res) {
    res.send("I am abhinav a psudo web dev whatsup ")
})

app.get("/hobbies", function (req, res) {
    res.send("I play badminton ")
})

app.listen(3000, function () {
    console.log("server started on port 3000")
});






