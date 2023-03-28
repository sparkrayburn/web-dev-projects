const express = require('express'); 
const app = express(); 
const https = require("https");
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {

    res.sendFile(__dirname+ "/index.html");
    
    
    
    
})


app.post("/", function(req, res){


    const appid = "in&appid=48962777d28e398b54c3ecacf0fe7d05&units=metric";
    const query = req.body.City;
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "," + appid ;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const description = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            
            res.write("<h1> The description is </h1>" + description);
            res.write("<h1>the temperature is</h1> " +  temp);
            res.write("<img src =" + imgurl + ">");
            res.send();
            
        })


    });

})

































 app.listen(3000, function () {
    console.log("server is running on port 3000");
 })









