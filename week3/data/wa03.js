"use strict"

// dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv');

// TAMU api key
dotenv.config();
const API_KEY = process.env.TAMU_KEY;
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'

// geocode addresses
let meetingsData = [];
let addresses = ["63 Fifth Ave", "16 E 16th St", "2 W 13th St"];

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

    request(apiRequest, function(err, resp, body) {
        if (err){ throw err; }

        let tamuGeo = JSON.parse(body);
        console.log(tamuGeo['FeatureMatchingResultType'], apiRequest);
        meetingsData.push(tamuGeo);
    });

    // sleep for a couple seconds before making the next request
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync('data/first.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in this zone: ${meetingsData.length}`);
});
Documentation
Texas A&M Geoservices Geocoding APIs
Node querystring module
npm async module
npm dotenv module
Sample API Response
{
  "version" : "4.01",
  "TransactionId" : "d119d15f-5221-446e-9d6d-fa779a5be9c3",
  "Version" : "4.01",
  "QueryStatusCodeValue" : "200",
  "FeatureMatchingResultType" : "Success",
  "FeatureMatchingResultCount" : "7",
  "TimeTaken" : "0.203184",
  "ExceptionOccured" : "False",
  "Exception" : "",
  "InputAddress": {
    "StreetAddress" : "45 CHRISTOPHER ST New York NY ",
    "City" : "New York",
    "State" : "NY",
    "Zip" : ""
  },
  "OutputGeocodes": [
    {
      "OutputGeocode": {
        "Latitude" : "40.7338458",
        "Longitude" : "-74.0018119",
        "NAACCRGISCoordinateQualityCode" : "00",
        "NAACCRGISCoordinateQualityType" : "AddressPoint",
        "MatchScore" : "97.3372781065089",
        "MatchType" : "Relaxed",
        "FeatureMatchingResultType" : "Success",
        "FeatureMatchingResultCount" : "1",
        "FeatureMatchingGeographyType" : "Parcel",
        "RegionSize" : "0",
        "RegionSizeUnits" : "Meters",
        "MatchedLocationType" : "LOCATION_TYPE_STREET_ADDRESS",
        "ExceptionOccured" : "False",
        "Exception" : "",
        "ErrorMessage" : ""
      }
    }
  ]
}