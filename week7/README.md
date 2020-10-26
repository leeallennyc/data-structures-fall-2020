# Weekly Assignment 7 
---

Assignment 7 Details: [Week 7](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week7/week7_assignment.md) 

## Summary:
The purpose of this assignment was to finish parsing and cleaning the rest of the AA data in all ten Manhattan "zones", and update/replace the data in our Postgres table(s).

--- 

### Process
* We worked in a group of three people to think about the most efficient way to parse and clean the information for all zones. 
* Important factors that we considered where `meeting_address`, `meeting_times`, `meeting_name`, `wheelchair_accessiblity`, `interest_group`, addition to others.

#### Step One 
* Looking back at the code from [week 2](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week2/data/wa02.js), my first attempt was to bring in all the files from all weeks.
* This approach produced a number of problems, so I decided to manually check for the exceptions of each week to better understand where the address errors were happening. 
* My regular expression knowledge was limited after replacing all the white space, so decided to go through each of the errors and use the `.replace()` and `.split()` methods.
* Upon completing this I made a note to move onto the next step, and also come back to this later and refactor the code for more efficiency using an async loop.
* This was the outcome for getting the address data for all ten zones. The problem here currently is that each file is loaded in manually, and it's a mess. 

```js
  value = value.replace(/\s\s+/g, "" )// --> Here we are replacing anything with more than one white space character with a single space using Regex
        .replace('W.', 'West').replace(' W ', 'West').replace('astr', 'ast').replace('west', 'West').replace('EAST', 'East').replace(' E. ', 'East').replace(' E ', 'East').replace('West165th', 'West 165th')
        .replace('rert', 'reet').replace('St.', 'Street').replace('STREET', 'Street').replace('street', 'Street').replace('St Rm 306', 'Street')
        .replace('208West13th', '208 West 13th').replace(' East Union Square', 'Union Square East').replace('10U', '10 U')
        .replace('80 Street', '80 Saint').replace('206-208', '206').replace('122East37TH', '122 East 37th').replace('Church of the Good Shepard', '543 Main Street')
        .replace('337East74th', '337 East 74th').replace('331East70th St', '331 East 70th Street').replace('521West126th St', '521 West 126th Street').replace('58-66', '58')
        .split(' @ ').join(',').split(' - ').join(',').split('- ').join(',').split('-').join(',').split('. ').join(',').split(' (').join(',').split('(').join(',')
        .split(')').join(',').split(' ,').join(',').split(',');
```
#### Step Two
* After getting all the `address` information from all ten zones, the next step was to retrieve all the other important data that we will end up querying on for the final assignment. 
* Our group each came back with some insights related to this next step. [Zhibang Jiang](https://github.com/gitacoco/data-structures/blob/master/Weekly_assign_07/wa07_Parse.js) contributed the base code of `wa07_Parse.js` [File](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week7/wa07_parsing.js) and we adapted it with the exceptions. The code is still difficult to read so we are considering creating a separate JSON file for all exceptions.
* Also the challenge is here is that each file is still created manually. We will need to fix the exceptions and also create a directory to read the files from and into. 
```js

////////////////////////////////////////////
//  Assignment 7 Week 7
///////////////////////////////////////////

// Found Here: https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week7/week7_assignment.md
// npm install cheerio

const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv'),
      path = require('path'),
      cheerio = require('cheerio')

//  load the m06.txt file into a variable, 'content'
var content = fs.readFileSync('data/html/m01.html', 'utf8');

//  load `content` into a cheerio object
var $ = cheerio.load(content);
   
let latLongJSON;
let newLocationData = [];
var locationList = [];

// Read in street address and lat long data in synchronously
let latLongData = fs.readFileSync("data/Addresses_Lat_Long_json/streetAddresses_zone1.json", "utf8") 
        latLongJSON = JSON.parse(latLongData);
        // console.log(output);
        
            // for Each loop over the latLong JSON data
            latLongJSON.forEach((address, i,  arr) =>{
                // Put the address, lat and long into an object
                let transformedObj = {
                    address: address.address,
                    lat: address.latLong.lat,
                    lng: address.latLong.lng
                }
                // Declare new variables to store the object location and values in
                let streetAddress = transformedObj.address.split(',')[0]
                let city = transformedObj.address.split(',')[1]
                let state = transformedObj.address.split(',')[2]
                let lat = transformedObj.lat
                let lng = transformedObj.lng
                // Push the values as an array into the emptyArray
                newLocationData.push([streetAddress, city, state, lat, lng])
            });
            // console.log(newLocationData);
            
//////////////////////////////////////////////
// Establishing the Location List Object
/////////////////////////////////////////////
    // Here we are looping through each element in the html files and setting the variables to hold the contents
    $('tbody tbody tbody tr').each(function(i, elem){
        // MeetingID
        var meetingID = $(elem).find('a').eq(0).attr('href').split('=')[1]
        // Building Name
        var buildingName = $(elem).find('h4').eq(0).text()
                    .split('\'').join('')
                    .replace('Cernter', 'Center')
        // Meeting Name'
        var meetingName = $(elem).find('b').eq(0).text();
        // Street, Room and Floor
        var _address = $(elem).find('b')[0].nextSibling.nextSibling
        // Address with exceptions
        var address = $(_address).text().split(',')[0].split(/- |Rm/)[0].replace(/\s\s+/g, "" )
                    .replace('W.', 'West').replace(' W ', 'West').replace('astr', 'ast').replace('west', 'West').replace('EAST', 'East').replace(' E. ', 'East').replace(' E ', 'East').replace('West165th', 'West 165th')
                    .replace('rert', 'reet').replace('St.', 'Street').replace('STREET', 'Street').replace('street', 'Street').replace('St Rm 306', 'Street').replace('Street,Red Door', 'Street')
                    .replace('208West13th', '208 West 13th').replace(' East Union Square', 'Union Square East').replace('10U', '10 U')
                    .replace('80 Street', '80 Saint').replace('206-208', '206').replace('122East37TH', '122 East 37th').replace('Church of the Good Shepard', '543 Main Street').replace('Street,Fort Washington Avenue', 'Street')
                    .replace('337East74th', '337 East 74th').replace('331East70th St', '331 East 70th Street').replace('521West126th St', '521 West 126th Street').replace('58-66', '58')
                    .split(' @ ').join(',').split(' - ').join(',').split('- ').join(',').split('-').join(',').split('. ').join(',').split(' (').join(',').split('(').join(',')
                    .split(')').join(',').split(' ,').join(',').split(',').toString();
        // roomFloor with exceptions
        var roomFloor = $(_address).text().split(/,| - /).slice(1).toString()
                        .replace(/\b\d{5}\b/g,'').replace(/FL.|Floor/,'Fl').replace('Fl','Floor')
                        .replace(/,/g,'').replace('.','').replace('(Room','Room').trim();
         
        //Zipcode
        let zipCode = $(elem).html().trim().match(/\b\d{5}\b/g);
    
        // DetailsBox
        var detailsBox = $(elem).find('div').eq(0).text().trim()
                        .replace('*', '')
                        .split('\'').join('')
        
        // Accessible Facility
        var wheelChair;
        
        if ($(elem).html().includes('span')){
            wheelChair = true;
        } else {
            wheelChair = false;
        };
        // console.log(locationList);
        
        // Writing the objects to a new file. 
        fs.writeFileSync('data/locationLists/locationList_zone01.json', JSON.stringify(locationList));
        // Creating the meetingLocation object and adding Lat and Long
          var meetingLocation = {
            meetingID: meetingID,
            streetAddress: address,
            city: "New York",
            state: "NY",
            zipCode: `${zipCode}`,
            lat: newLocationData[i][3], 
            lng: newLocationData[i][4],
            buildingName: buildingName,
            wheelChairAccess: wheelChair,
            roomFloor: roomFloor,
            detailsBox: detailsBox,
        };
        locationList.push(meetingLocation);
    });
    // console.log(locationList);
    
//////////////////////////////////////////////
// Establishing the Timelist object
/////////////////////////////////////////////
var timeList = [];

    $('tbody tbody tbody tr').each(function(i, elem){
        
        // MeetingID
        var meetingID = $(elem).find('a').eq(0).attr('href').split('=')[1]
        
        // Transfer the html content in the second <td> in each tr to an array
        var allString = $(elem).find('td').eq(1).html().trim();
        var _timeArray = allString.split(/<br>\s*<br>/).toString().trim().replace(/Gay,/g,'Gay').split(',');
        // Remove the last empty entry in array
        var timeArray = _timeArray.filter(function(val){return val!==''});
        
        $(timeArray).each(function(i, eachInfo){
            
            var eachInfo_htmltags = $(eachInfo).toString().trim();
            var eachInfo_notags = $(eachInfo).text().trim();
            
                // Day of the week
                var day = eachInfo_notags.split('From')[0].trim();
                    // !!I have no idea that how to skip the outlier entry in each function
    
                // Start Time
                var startTime = eachInfo_notags.split('From')[1].split('to')[0].trim();
        
                // End Time
                var endTime = eachInfo_htmltags.split('<b>to</b>')[1].split('<br><b>')[0].trim();
                
                // Meeting Type
                if (eachInfo_notags.includes('=')) {
                    var _type = eachInfo_notags.split('=')[1].trim();
                        
                        if (_type.includes('Special Interest')) {
                            var type = _type.split('Special Interest')[0].trim();
                        } else {
                            var type = _type
                        }
                    
                } else {
                    var type = 'N/A'
                }
                
                // Special Interest
                if (eachInfo_notags.includes('Special Interest')){
                    var _interest = eachInfo_notags.split('Special Interest')[1].trim();
                    var interest = _interest.replace(/Gay/g,'Gay,');
                } else {
                    var interest = 'N/A'
                }
                
            var eachTime = {
                meetingID: meetingID,
                day: day,
                startTime: startTime,
                endTime: endTime,
                meetingType: type,
                specialInterest: interest,
            };
            timeList.push(eachTime);
        });
    });
// console.log(timeList);
fs.writeFileSync('data/timeList/timeList_zone01.json', JSON.stringify(timeList));

```
#### Step Three
* We still had a few parsing errors at this stage, mostly in the locationList files for each Zone. Will need to go back and finish all the cleaning.  
* Two JSON files were created for different tables: `Location List` and `Time List`. They were put in these folders: [Location List](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week7/data/locationLists), [Time List](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week7/data/timeList)


#### Step Four (Stitching the Files together)
* Here we created two files called `wa07_concat.js` and `wa07_concat_cleanup.js`, which concatenate all the files together and clean the files and export at two different JSON files: [Here]()

```js

`wa07_concat.js`

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

```
* And the cleaning of the files

```js

`wa07_concat_cleanup.js`

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

```
* The output was generated as and saved to [concat_clean_final](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week7/data/concat_clean_final) folder.

#### Step Five -- Postgres and SQL
* Preparing and Loading the JSON files into our Postgres DB using SQL.
* Encountered Errors in the JSON files and cleaned up with Regex in `wa07_concat_cleanup.js` file: `let cleanedTimeZonesAll = (timeListAllZones_uncleaned.toString().split('][').join(',').replace(/}\n/g,'}').replace(/\}]\s\s{/,'},\n\t{'));``
* Despite a syntax problem when inserting the `locationList_all_zones_cleaned`file, the data seemed to be inserted fine into the DB.

Adapting `wa04_a.js`, `wa04_b.js`, `wa04c.js`: I used a combination of console.log and commenting to achieve the end goal. The idea is to come back to the files  to clean then up and automate down the line. 


* Part A - Creating or Dropping the Tables [Full File Here](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week4/wa04_a.js)

```js
const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();


// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user =  'lee';
db_credentials.host = 'data-structures-2020.ca5ggconoz0d.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port =  5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();
/////////////////////////
// Creating the tables:
////////////////////////
var thisLocationsQuery = "CREATE TABLE aalocations (meetingID integer, address varchar(120), city varchar(120), state varchar(2), zipCode varchar(20), lat double precision, lng double precision, buildingName varchar(200), wheelChairAccess boolean, roomFloor varchar(120), detailsBox varchar(250));";
var thisTimeListQuery = "CREATE TABLE aatimeLists (meetingID integer, day varchar(120), startTime time, endTime time, meetingType varchar(120), specialInterest varchar(255));";

client.query(thisLocationsQuery, (err, res) => {
    console.log(err, res);
    // client.end();
});

client.query(thisTimeListQuery, (err, res) => {
    console.log(err, res);
    client.end();
});

//////////////////////////
//Dropping the tables
//////////////////////////
var dropThisLocationsQuery = "DROP TABLE aalocations;";
var dropThisTimeListTable =  "DROP TABLE aatimeLists;";

client.query(dropThisLocationsQuery, (err, res) => {
    console.log(err, res);
    client.end();
});

client.query(dropThisTimeListTable, (err, res) => {
    console.log(err, res);
    client.end();
});

```

* Part B: Inserting in to Tables [Full File Here](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week4/wa04_b.js)
```js
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

// Setup timeList Files for inserting into DB
var timeListsForDb = JSON.parse(fs.readFileSync('../week7/data/concat_clean_final/timeList_all_zones_cleaned.json'));
// '../week7/data/timeList/timeList_zone09.json' --> test file with less data
async.eachSeries(timeListsForDb, function(value, callback) {
    const client2 = new Client(db_credentials);
    client2.connect();
    var thisTimeListQuery = "INSERT INTO aatimeLists VALUES (E'" + value.meetingID + "', E'" + value.day + "', E'" + value.startTime + "', E'" + value.endTime + "', E'" + value.meetingType + "', E'" + value.specialInterest + "');";
    client2.query(thisTimeListQuery, (err, res) => {
        console.log(err, res);
        client2.end();
    });
    setTimeout(callback, 1000); 
}); 

```
* Part C: See if it was successful and returning [Full File Here](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week4/wa04_c.js)

```js
// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to query the entire contents of a table: 
var locationListQuery = "SELECT * FROM aalocations;";
var timeListQuery = "SELECT * FROM aatimeLists;";


client.query(locationListQuery, (err, res) => {
    console.log(err, res.rows);
    client.end();
});

client.query(timeListQuery, (err, res) => {
    console.log(err, res.rows);
    client.end();
});
```

* Output from call:

![](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week7/images/RDS_output_wa06_SQL.png?raw=true)

### Observations & Learnings
* This was by far the greatest challenge we undertook to date. The collaborative nature of the assignment was benefical for all of us, and I hope we get to do this again on other assignments.
* Cleaning and Preparing is really 90% of the work.
* If you get stuck with one solution approach, stop and try a different approach.
* Time is always a factor, and the extra time to complete this assignment was appreciated greatly.

---
### Challenges / Opportunities
* When collaborating, there are many different styles and differences in how people approach a problem. The opportunity is in how we bring everyone's unique abilities together.
* Keeping track of all the changes and documenting the process.

### Additional / Readings for the week
* Gitelman, Chapter 7