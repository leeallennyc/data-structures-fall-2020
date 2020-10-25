// npm install

const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      dotenv = require('dotenv');
      
var cheerio = require('cheerio');

var content = fs.readFileSync('data/4.txt');
var $ = cheerio.load(content); 

// TAMU api key
dotenv.config();
const API_KEY = process.env.TAMU_KEY;
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'


var locationList = [];

    $('tbody tbody tbody tr').each(function(i, elem){
        var t = setTimeout(function(){
        // Street Address
        const rule = require("./replace_rules.json");   // to introduce the configuration file
        
        var _address = $(elem).find('b')[0].nextSibling.nextSibling // to navigate our target parsing location. the same way as before
        var address_string = $(_address).text().split(',')[0].split(/-|Rm/)[0].trim() //to roughly get the address with some inconsistent spelled words
        var address_stringlist = address_string.split(" ") //to break down the address into single words and store them in array
        
        rule.forEach(function(eachRule){                   //to select each rule in the configuration file. forEach function here will iterater each rule 
            eachRule.from.forEach(function(eachFrom){      //to select each inconsistent spelled word. forEach function here will iterater each word in the "from" array 
                for (let i = 0; i < address_stringlist.length; i ++) //to use for loops comparing the word in address_stringlist with the word from "from" array in the configuration file one by one
                if(eachFrom.indexOf(address_stringlist[i]) >= 0) //if not matched, the value would be -1, this word would be skipped. if matched, the value would large than 0, then
                    address_stringlist[i] = eachRule.to //assign the value in "to" attribute to the word
            })
        })
        var address = address_stringlist.join(" ").trim(); //to joins all elements of an array into a string. the separator here is a space
        
            let query = {
                streetAddress: address,
                city: "New York",
                state: "NY",
                apiKey: API_KEY,
                format: "json",
                version: "4.01"
            };
            
            // construct a querystring from the `query` object's values and append it to the api URL
            let apiRequest = API_URL + '?' + querystring.stringify(query);
        
            request(apiRequest, function(error, response, body) {
                
                let tamuGeo = JSON.parse(body);
                
                let latitude = tamuGeo['OutputGeocodes'][0].OutputGeocode.Latitude;
                let longitude = tamuGeo['OutputGeocodes'][0].OutputGeocode.Longitude;
    
                var meetingLocation = {
                streetAddress: address,
                city: "New York",
                state: "NY",
                latLong: {lat: latitude, lng: longitude}
                };
                
                locationList.push(meetingLocation);
            });
            
        console.log(locationList)
        }, 500 * i) //setTimeout
    });

