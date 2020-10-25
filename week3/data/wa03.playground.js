/////////////////////////////////////////////////////////
//  Assignment 3 Week 3 --Used for Tests and Experiments
/////////////////////////////////////////////////////////

// Found Here: https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_03.md

// "use strict"

// // dependencies
// const fs = require('fs'),
//       querystring = require('querystring'),
//       request = require('request'),
//       async = require('async'),
//       dotenv = require('dotenv');
      
      
      // Creating Buffer from 'files/streetAddressesTest.txt'
// const buf = Buffer.from('files/streetAddressesTest.txt')
// for (const item of buf) {
//     console.log(item);
// }
// console.log(buf.toString())

      
      
// Creating Readable and writable Streams      
// const Stream = require('stream');

// const readableStream = new Stream.Readable({
//     read() {}
// })
// const writableStream = new Stream.Writable()

// writableStream._write = (chunk, encoding, next) => {
//     console.log(chunk.toString())
//     next()
// }

// readableStream.pipe(writableStream);

// var hello1 = readableStream.push('hello1')
// var hello2 = readableStream.push('hello2')

// writableStream.end();
      

      
// var addresses = JSON.parse(fs.readFileSync('files/streetAddressesTest.txt'));
// console.log(addresses);
      

// TAMU api key
// dotenv.config();
// const API_KEY = process.env.TAMU_KEY;
// const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'

// const filePath = 'files/streetAddressesTest.txt'
// const newFile = 'files/streetAddressesNew.json'

// // Writing a new file asynchromously
// fs.readFile(filePath, (err,data) => {
//     if (err) throw err
//     fs.writeFile(newFile, data, (err) => {
//         if (err) throw err
//         console.log(newFile + ' saved')
//     })
// })


// // Appending some text to a previous file to track a record
// fs.readFile(filePath, (err, data) =>{
//     if (err) throw err
//     fs.writeFile(newFile, data, (err)=>{
//         if (err) throw err
//         let appendTxt = (new Date) + "Text copied to " + newFile;
//         fs.appendFile(filePath, appendTxt, (err) => {
//             if (err) throw err;
//             console.log(filePath + "some data appended");
//         })
//     })
// })



// // Directory of files
// let directory = "files";
// let dirBuf = Buffer.from(directory);

// // Async read of directory files
// fs.readdir(dirBuf, (err, files)=>{
//     if (err) {
//         console.log(err.message);
//     } else {
//         console.log(files);
//     }
// });


// // geocode addresses
// let meetingsData = [];
// fs.readFileSync('files/streetAddressesTest.txt', 'utf8', (err, data) => {
//     var value = {};
//     if (err) {
//         console.log(err)
//         value += value + JSON.parse(data);
//     }
//     console.log(value)
// });

// let addresses = ["207 West 96th Street","120 West 69th Street","422 West 57th Street","164 West 74th Street","207 West 96th Street"];



// var  __dirname = 'files';   

// var readableStream = fs.createReadStream(__dirname + '/streetAddressesTest.txt', {encoding: 'utf8'}, );
// // console.log(readableStream);
// var writableStream = fs.createWriteStream(__dirname + '/streetAddressesTest_Copy.txt');
// readableStream.pipe(writableStream);




// eachSeries in the async module iterates over an array and operates on each item in the array in series
// async.eachSeries(addresses, function(value, callback) {
//     let query = {
//         streetAddress: value,
//         city: "New York",
//         state: "NY",
//         apikey: API_KEY,
//         format: "json",
//         version: "4.01"
//     };

    // construct a querystring from the `query` object's values and append it to the api URL
//     let apiRequest = API_URL + '?' + querystring.stringify(query);
//     console.log(apiRequest);

//     request(apiRequest, function(err, resp, body) {
//         if (err){ throw err; }
//         // Reading back from API call uses JSON.parse
//         let tamuGeo = JSON.parse(body);
//         console.log(tamuGeo['FeatureMatchingResultType'], apiRequest);
//         meetingsData.push(tamuGeo);
//     });

//     // sleep for a couple seconds before making the next request
//     setTimeout(callback, 2000);
// }, function() {
//     fs.writeFileSync('third.json', JSON.stringify(meetingsData));
//     console.log('*** *** *** *** ***');
//     console.log(`Number of meetings in this zone: ${meetingsData.length}`);
// });



// // Async Example from node
// const getFirstUserData = async () => {
//   const response = await fetch('/users.json') // get users list
//   const users = await response.json() // parse JSON
//   const user = users[0] // pick first user
//   const userResponse = await fetch(`/users/${user.name}`) // get user data
//   const userData = await userResponse.json() // parse JSON
//   return userData
// }

// getFirstUserData()

// Testing of Async Functions.
// var address = ["203 this street", "234 on this other stree", "2432 Broadway"]

// // Async Functions Pattern from YouTube: https://www.youtube.com/watch?v=_8gHHBlbziw

// function testAddressesFunction(address){
//     return new Promise((resolve, reject) =>{
//         setTimeout(()=>{
//             console.log("Now we have the data");
//             resolve({address: "address1Here"});
//         }, 3000);
//     })
// }

// function transformTheAddressesFunction(address){
//     return new Promise((resolve, reject) =>{
//         setTimeout(()=>{
//             console.log("Data is now transformed");
//             resolve({transformedaddress1: address});
//         }, 3000);
//     })
// }

// function longandLatFunction(long1){
//     return new Promise((resolve, reject) =>{
//         setTimeout(()=>{
//             resolve(["long1", "lat1", "long2", "lat2"]);
//         }, 3000);
//     });
// }


// // Async Sytax
// async function getAddresses() {
//     try {
//     const testAddresses = await testAddressesFunction("address 1: 12323 Here is the street");
//     const transformedAddresses = await transformTheAddressesFunction(testAddresses.address);
//     const longandlat = await longandLatFunction(address[0]);
//     console.log(longandlat);
//     } catch (err) {
//         console.log("We could not get the addresses");
//     }
// }
// getAddresses();


//  Final output needs to follow this Array/Object structure
// const zone6Meetings = 
// [
//   {
//       "address":"63 Fifth Ave, New York, NY",
//       "latLong":{
//          "lat":40.7353041,
//          "lng":-73.99413539999999
//       }
//   },
//   {
//       "address":"16 E 16th St, New York, NY",
//       "latLong":{
//          "lat":40.736765,
//          "lng":-73.9919024
//       }
//   },
//   {
//       "address":"2 W 13th St, New York, NY",
//       "latLong":{
//          "lat":40.7353297,
//          "lng":-73.99447889999999
//       }
//   }
// ]

// let addresses = ["207 West 96th Street", "16 East 16th St"]
// let queryObj = querystring.parse('lat=40.7353041&lng=-73.99413539999999')
// console.log(queryObj);
// let finalOuput =  [{"address":"63 Fifth Ave, New York, NY","latLong":{"lat":40.7353041,"lng":-73.99413539999999}},{"address":"16 E 16th St, New York, NY","latLong":{"lat":40.736765,"lng":-73.9919024}}]