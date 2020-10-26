"use strict"

// dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv'),
      path = require('path');
      
    
function readAppend(file, appendFile) {
    fs.readFile(appendFile, function (err, data){
        if (err) throw err;
        console.log('File was read');
        
    fs.appendFile(file, data, function (err) {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });
    });
}

//////////////////////
// Location Lists
/////////////////////

let file = './data/concat_clean_final/locationList_all_zones.json'

let appendFile = './data/locationLists/locationList_zone01.json'
readAppend(file, appendFile);

appendFile = './data/locationLists/locationList_zone02.json'
readAppend(file, appendFile);

appendFile = './data/locationLists/locationList_zone03.json'
readAppend(file, appendFile);

appendFile = './data/locationLists/locationList_zone04.json'
readAppend(file, appendFile);

appendFile = './data/locationLists/locationList_zone05.json'
readAppend(file, appendFile);

appendFile = './data/locationLists/locationList_zone06.json'
readAppend(file, appendFile);

appendFile = './data/locationLists/locationList_zone07.json'
readAppend(file, appendFile);

appendFile = './data/locationLists/locationList_zone08.json'
readAppend(file, appendFile);

appendFile = './data/locationLists/locationList_zone09.json'
readAppend(file, appendFile);

appendFile = './data/locationLists/locationList_zone10.json'
readAppend(file, appendFile);

////////////////////////////
// Time Lists
///////////////////////////
let file2 = './data/concat_clean_final/timeList_all_zones.json'

let appendFile2 = './data/timeList/timeList_zone01.json'
readAppend(file2, appendFile2);

appendFile2 = './data/timeList/timeList_zone02.json'
readAppend(file2, appendFile2);

appendFile2 = './data/timeList/timeList_zone03.json'
readAppend(file2, appendFile2);

appendFile2 = './data/timeList/timeList_zone04.json'
readAppend(file2, appendFile2);

appendFile2 = './data/timeList/timeList_zone05.json'
readAppend(file2, appendFile2);

appendFile2 = './data/timeList/timeList_zone06.json'
readAppend(file2, appendFile2);

appendFile2 = './data/timeList/timeList_zone07.json'
readAppend(file2, appendFile2);

appendFile2 = './data/timeList/timeList_zone08.json'
readAppend(file2, appendFile2);

appendFile2 = './data/timeList/timeList_zone09.json'
readAppend(file2, appendFile2);

appendFile2 = './data/timeList/timeList_zone10.json'
readAppend(file2, appendFile2);





////////////////////////////////////////////////////////////////////////////////////////
//  TESTS
////////////////////////////////////////////////////////////////////////////////////////
      
// Combining Location Lists
// var filenamesLocation = fs.readdirSync(`${__dirname}/data/locationLists`);
// var filenamesLocation = fs.readdirSync(`${__dirname}/data/concat_test`);
// let emptyArray = [];
// // let emptyArray2 = [];

// for (let i = 0; i<filenamesLocation.length; i++){
   
//     // var mergedLocations = JSON.parse(fs.readFileSync(`${__dirname}/data/locationLists/${filenamesLocation[i]}`));
//     let mergedLocations = JSON.parse(fs.readFileSync(`${__dirname}/data/concat_test/${filenamesLocation[i]}`));
//     // console.log(mergedLocations);
//     let filledArray = emptyArray.concat(mergedLocations);
//     // console.log(filledArray.length);
//     let filledArrayString = JSON.stringify(filledArray);
//     // console.log(filledArrayString)
//     let splitFiles = filledArrayString.replace('[{', '{').replace(']}', '}').replace('"}]', '"},')
//     console.log(splitFiles);
//     };
    
    
    // Combining Location Lists
// // var filenamesLocation = fs.readdirSync(`${__dirname}/data/locationLists`);
// var allZones_uncleaned = './data/concat_test/locationList_all_zones.json'
// let emptyArray = [];

// for (let i = 0; i<allZones_uncleaned.length; i++){
   
//     // var mergedLocations = JSON.parse(fs.readFileSync(`${__dirname}/data/locationLists/${filenamesLocation[i]}`));
//     let mergedLocations = JSON.parse(fs.readFileSync('./data/concat_test/locationList_all_zones.json'));
//     // console.log(mergedLocations);
//     let filledArray = emptyArray.concat(mergedLocations);
//     // console.log(filledArray.length);
//     let filledArrayString = JSON.stringify(filledArray);
//     // console.log(filledArrayString)
//     let splitFiles = filledArrayString.replace('][',',')
//     console.log(splitFiles);
//     };
    
    //     for (let j=0; j<splitFiles.length - 1; j++){
    //         // let lastIndexOfSplitFiles = splitFiles.lastIndexOf('"},')
    //         // console.log(lastIndexOfSplitFiles);
    //         if (splitFiles.lastIndexOf('"},') === 562 ){
    //             console.log("true");
    //         let commaEliminator = 
    //         console.log(commaEliminator)
    //         }
         

    // let lastIndex = splitFiles.lastIndexOf('"},')
    // console.log(lastIndex);
    
    // let finalOutput = JSON.parse(splitFiles);
    // // console.log(finalOutput);
// };


// // Combining Time Lists
// var filenamesTimeList = fs.readdirSync(`${__dirname}/data/timeList`);

// for (let i = 0; i<filenamesTimeList.length; i++){
//     var mergedTimeLists = JSON.parse(fs.readFileSync(`${__dirname}/data/timeList/${filenamesTimeList[i]}`));
//     // console.log(mergedTimeLists)
// };
