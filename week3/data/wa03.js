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

// ** IMPORTANT ** 
// This forloop goes through each filename in the files directory and reads each file and puts the new GEO coordinates file in the Complete_Addresses Folder.
// ** IMPORTANT -- There is Manual Work Here!!!! ONLY ONE FILE is FED into The "FILES" folder at a time from the UNTRANSFORMED_ADDRESSES Folder. After the JSON file is created with the GEO Coordinate it will automatically appear in the "COMPLETE ADDRESSES" Folder.
// It's currently necessary to MANUALLY MOVE THE FILE after this is complete from the Files directory back into the UNTRANSFORMED_ADDRESSES directory after it is parsed. streetAddresses_zone10.txt is currently in that folder as a test. 
// All the files in the UNTRANSFORMED_ADDRESSES folder are those from the previous week 2.
// Make sure there is only ONE FILE in the 'FILES' folder at any given time, otherwise it will concatenate ALL the files in the Files directory when you run it. Need to come back to this to fix it later. 
for (let i = 0; i<filenames.length; i++){
    var addresses = JSON.parse(fs.readFileSync(`${__dirname}/files/${filenames[i]}`));
    console.log(addresses)
    
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
//         // Creating object of finalOuput from body and grabbing Lat and Long data.
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
    var templateString = `${__dirname}/complete_addresses/${filenames[i]}`
    // console.log(templateString);
    var splitTxt = templateString.split(".");
    // console.log(splitTxt);
    var removeTxt = splitTxt.pop();
    // console.log(splitTxt);
    var pushJson = splitTxt.push('.json');
    // console.log(splitTxt);
    var joinJson = splitTxt.join('');
    // console.log(joinJson);
    
//     // writes the new filename and stringifies meetingData.
    fs.writeFileSync(`${joinJson}`, JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in this zone: ${meetingsData.length}`);
});
};