////////////////////////////////////////////
//  Assignment 3 Week 3
///////////////////////////////////////////

// Found Here: https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_03.md

"use strict"

// dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv'),
      path = require('path');
      
// TAMU api key
dotenv.config();
const API_KEY = process.env.TAMU_KEY;
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'

// Empty array for geocode addresses
let meetingsData = [];

// Used if we have multiple files in the directory to read
var filenames = fs.readdirSync(`${__dirname}/files`); 
// console.log(filenames);

// This forloop goes through each filename in the files directory and reads each file and return its contents.
for (let i = 0; i<filenames.length; i++){
    var addresses = JSON.parse(fs.readFileSync(`${__dirname}/files/${filenames[i]}`));
    
// eachSeries in the async module iterates over an array and operates on each item in the array in series
    async.eachSeries(addresses, function(value, callback) {
    let query = {
        streetAddress: value,
        city: "New York",
        state: "NY",
        apikey: API_KEY,
        format: "json",
        version: "4.01"
    };

    // construct a querystring from the `query` object's values and append it to the api URL
    let apiRequest = API_URL + '?' + querystring.stringify(query);
    console.log(apiRequest);


    request(apiRequest, function(err, resp, body) {
        if (err){ throw err; }
        // Reading back from API call uses JSON.parse
        let tamuGeo = JSON.parse(body);
        console.log(tamuGeo['FeatureMatchingResultType'], apiRequest);
        // Creating object of finalOuput from body and grabbing Lat and Long data.
        var finalOutput =
        {
            address: value + ", New York, NY",
            latLong:{
                    lat: tamuGeo.OutputGeocodes[0].OutputGeocode.Latitude, 
                    lng: tamuGeo.OutputGeocodes[0].OutputGeocode.Longitude
                }
        };
        // console.log(finalOutput);
        meetingsData.push(finalOutput);
    });
    // sleep for a couple seconds before making the next request 
    setTimeout(callback, 2000);
}, function() {
    // The below code splits the file extension name on .txt and renames a new file with .json as extension. 
    var templateString =  `${__dirname}/files/${filenames[i]}`
    // console.log(templateString);
    var splitTxt = templateString.split(".");
    // console.log(splitTxt);
    var removeTxt = splitTxt.pop();
    // console.log(splitTxt);
    var pushJson = splitTxt.push('.json');
    // console.log(splitTxt);
    var joinJson = splitTxt.join('');
    // console.log(joinJson);
    
    // writes the new filename and stringifies meetingData.
    fs.writeFileSync(`${joinJson}`, JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in this zone: ${meetingsData.length}`);
});
};