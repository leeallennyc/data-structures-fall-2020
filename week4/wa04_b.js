// Part b
const { Client } = require('pg');
const fs = require('fs');
var async = require('async');  
const dotenv = require('dotenv');
dotenv.config();  

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user =  'lee';
db_credentials.host = 'data-structures-2020.ca5ggconoz0d.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port =  5432;

// [ { address: '63 Fifth Ave, New York, NY', latLong: { lat: 40.7353041, lng: -73.99413539999999 } }, { address: '16 E 16th St, New York, NY', latLong: { lat: 40.736765, lng: -73.9919024 } }, { address: '2 W 13th St, New York, NY', latLong: { lat: 40.7353297, lng: -73.99447889999999 } } ];

// Setup Address Files for inserting into DB
var addressesForDb = JSON.parse(fs.readFileSync('../week7/data/concat_clean_final/locationList_all_zones_cleaned.json'));
// '../week7/data/locationLists/locationList_zone09.json' --> test file with less data
async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisLocationsQuery = "INSERT INTO aalocations VALUES (E'" + value.meetingID + "', E'" + value.streetAddress + "', E'" + value.city + "', E'" + value.state + "', E'" + value.zipCode + "', E'" + value.lat + "', E'" + value.lng + "', E'" + value.buildingName + "', E'" + value.wheelChairAccess + "', E'" + value.roomFloor + "', E'" + value.detailsBox + "');";
    client.query(thisLocationsQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 500); 
}); 

// // Setup timeList Files for inserting into DB
// var timeListsForDb = JSON.parse(fs.readFileSync('../week7/data/concat_clean_final/timeList_all_zones_cleaned.json'));
// // '../week7/data/timeList/timeList_zone09.json' --> test file with less data
// async.eachSeries(timeListsForDb, function(value, callback) {
//     const client2 = new Client(db_credentials);
//     client2.connect();
//     var thisTimeListQuery = "INSERT INTO aatimeLists VALUES (E'" + value.meetingID + "', E'" + value.day + "', E'" + value.startTime + "', E'" + value.endTime + "', E'" + value.meetingType + "', E'" + value.specialInterest + "');";
//     client2.query(thisTimeListQuery, (err, res) => {
//         console.log(err, res);
//         client2.end();
//     });
//     setTimeout(callback, 1000); 
// }); 