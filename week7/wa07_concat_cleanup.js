// dependencies
const fs = require('fs'),
      async = require('async'),
      path = require('path');
      
      
// Read in the uncleaned LocationList File with all Zones and Clean All Location List Zones and Export as JSON file  
let locationList_all_zones_uncleaned = fs.readFileSync('./data/concat_clean_final/locationList_all_zones.json', 'utf8')
// console.log(locationList_all_zones_uncleaned);
let cleanedLocationsAll = (locationList_all_zones_uncleaned.toString().split('][').join(',').replace(/}\n/g,'}'));
// console.log(cleanedLocationsAll);
fs.writeFileSync('./data/concat_clean_final/locationList_all_zones_cleaned.json', cleanedLocationsAll)      
      
      

// Read in the uncleaned TimeList File with all Zones and Clean All Time Zones and Export as JSON file     
let timeListAllZones_uncleaned = fs.readFileSync('./data/concat_clean_final/timeList_all_zones.json', 'utf8')
// console.log(timeListAllZones_uncleaned);
let cleanedTimeZonesAll = (timeListAllZones_uncleaned.toString().split('][').join(',').replace(/}\n/g,'}'));
// console.log(cleanedTimeZonesAll);
fs.writeFileSync('./data/concat_clean_final/timeList_all_zones_cleaned.json', cleanedTimeZonesAll)








      
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TESTS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// let allZones_uncleaned = fs.readFileSync('./data/concat_clean_final/locationList_all_zones.json', 'utf8')
// // console.log(allZones_uncleaned);

// let cleanedZones = (allZones_uncleaned.toString().split('][').join(',').replace(/}\n/g,'}'));
// console.log(cleanedZones);

// fs.writeFileSync('./data/concat_clean_final/locationList_all_zones_cleaned.json', cleanedZones)

// let cleanedJSON = JSON.stringify(cleanedZones);
// console.log(cleanedJSON);

// let regexOperation = cleanedJSON.replace(/\s/g,' ')
// console.log(regexOperation);

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