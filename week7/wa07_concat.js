"use strict"

// dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv'),
      path = require('path');
      
// Combining Location Lists
var filenamesLocation = fs.readdirSync(`${__dirname}/data/locationLists`);

for (let i = 0; i<filenamesLocation.length; i++){
    var mergedLocations = JSON.parse(fs.readFileSync(`${__dirname}/data/locationLists/${filenamesLocation[i]}`));
    console.log(mergedLocations);
};

// // Combining Time Lists
// var filenamesTimeList = fs.readdirSync(`${__dirname}/data/timeList`);

// for (let i = 0; i<filenamesTimeList.length; i++){
//     var mergedTimeLists = JSON.parse(fs.readFileSync(`${__dirname}/data/timeList/${filenamesTimeList[i]}`));
//     // console.log(mergedTimeLists)
// };
