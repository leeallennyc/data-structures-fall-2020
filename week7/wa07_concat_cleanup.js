

// dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv'),
      path = require('path');
      

// let allZones_uncleaned = fs.readFileSync('./data/concat_clean_final/locationList_all_zones.json', 'utf8')
// // console.log(allZones_uncleaned);

// let cleanedZones = (allZones_uncleaned.toString().split('][').join(',').replace(/}\n/g,'}'));
// console.log(cleanedZones);

// fs.writeFileSync('./data/concat_clean_final/locationList_all_zones_cleaned.json', cleanedZones)

// let cleanedJSON = JSON.stringify(cleanedZones);
// console.log(cleanedJSON);

// let regexOperation = cleanedJSON.replace(/\s/g,' ')
// console.log(regexOperation);

let timeListAllZones_uncleaned = fs.readFileSync('./data/concat_clean_final/timeList_all_zones.json', 'utf8')
// console.log(allZones_uncleaned);

let cleanedTimeZones = (timeListAllZones_uncleaned.toString().split('][').join(',').replace(/}\n/g,'}'));
console.log(cleanedTimeZones);

fs.writeFileSync('./data/concat_clean_final/timeList_all_zones_cleaned.json', cleanedTimeZones)






// let emptyArray = [];

// for (let i = 0; i<allZones_uncleaned.length; i++){
   
    // var mergedLocations = JSON.parse(fs.readFileSync(`${__dirname}/data/locationLists/${filenamesLocation[i]}`));
    // let mergedLocations = JSON.parse(allZones_uncleaned);
    // console.log(mergedLocations);
    // let filledArray = emptyArray.concat(mergedLocations);
    // // console.log(filledArray.length);
    // let filledArrayString = JSON.stringify(filledArray);
    // // console.log(filledArrayString)
    // let splitFiles = filledArrayString.replace('][',',')
    // console.log(splitFiles);
    // };