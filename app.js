var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');

//Creates a function for generating random numbers that are in between 2 types of numbers.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

app.set('view engine', 'ejs');
app.get('/', function(req,res){

  //Getting 6 random numbers.
  var num1 = getRandomInt(1,10);
  var num2 = getRandomInt(1,10);
  var num3 = getRandomInt(1,10);
  var num4 = getRandomInt(1,10);
  var num5 = getRandomInt(1,10);
  var num6 = getRandomInt(1,10);

  //Making one large string with the 6 random numbers.
  var fullNumber = String(num1) + String(num2) + String(num3) + String(num4) + String(num5) + String(num6);

  //Create a tracking code for the 6 random numbers.
  var trackingCode = 'LW16' + fullNumber;

  var fullUrl = "http://www.lasership.com/track/" + trackingCode;

  console.log(fullUrl);



  request(fullUrl, function(err,resp,body){

    if(!err && resp.statusCode == 200){

      var $ = cheerio.load(body);

  var detail = $('#extra_information', '.art-postcontent').text();


  var detail2 = $('p', '#extra_information').text();


//===============================================================

//Me trying to find some logic to get better strings for a better UI.

var bc = detail2.trim();

  var splitter = bc.split('                                                      ');

// var splitter = detail.split('                                       ');

// var splitter = detail2.split(/\\n/);
//
//  console.log(splitter);

//===============================================================

  var shipProgress = $('#shipment_events').text();

  console.log(shipProgress);

          res.render('index', {detail : detail, shipProgress : shipProgress, url : fullUrl});
    }

  });

});

app.listen('3000', function(){
  console.log('Listening on PORT 3000');
});
