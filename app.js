//jshint esversion:6
const express = require('express')
const ejs = require('ejs')
const htpps = require('https');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();


const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


app.get('/', function(req, res){

  res.sendFile(__dirname + "/views/index.html");
})

app.post("/", function(req, res){
  

  const query = req.body.cityName;

  const api = process.env.Api_Key;

  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + api + "&units=" + unit + "";

  htpps.get(url, function(response){

    console.log(response.statusCode);

    response.on("data", function(data){

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherdescription = weatherData.weather[0].description;
     
      const icon = weatherData.weather[0].icon;
      const image = "http://opernweathermap.org/img/wn" + icon + "@2x.png";
      res.write("<p> The Weather is Currently " + weatherdescription + "<p>");
      res.write("<h1>The Temprature in " + query + " is " + temp + " degress celcious.<h1> ");
      res.write("<img src =" + image +">");
      res.send()
    })

  })
})

const PORT = process.env.PORT 


app.listen(PORT, console.log("Port start running "))


