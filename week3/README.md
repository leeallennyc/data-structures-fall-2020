# Weekly Assignment 3

In preparation for this assignment, [create a free account with Texas A&M GeoServices](https://geoservices.tamu.edu/Signup/). 

Continue work on the file you parsed in Weekly Assignment 2. If you haven't already, organize your data into a mixture of Objects and Arrays that can be [‘parsed’ and ‘stringified’](https://nodejs.org/en/knowledge/javascript-conventions/what-is-json/) as [JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) so that it will be easier to access the data for your work on this assignment. Since you’ll be assembling a list of many results, your best bet is to first create an (empty) array and then add items to it one at a time. You can use the Array object’s [push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) method for this.

Write a script that makes a request to the [Texas A&M Geoservices Geocoding APIs](http://geoservices.tamu.edu/Services/Geocode/WebService/) for each address, using the address data you parsed in Weekly Assignment 2. You'll need to do some work on the address data (using code!) to prepare them for the API queries. For example, the parsed value `50 Perry Street, Ground Floor,` should be modified to `50 Perry Street, New York, NY`. The addresses are messy and may yield weird results from the API response. Don't worry too much about this right now. But, start to think about it; in a later assignment we'll have to clean these up.  

Your final output should be a `.json` **file** that contains an **array** that contains an **object** for each meeting (which may or may not nest other arrays and objects). The array should have a length equal to the number of meetings. Each object should hold the relevant data for each meeting. For now, we're focusing on the addresses and geographic coordinates. An example:  
```js
[ 
  { address: '63 Fifth Ave, New York, NY', latLong: { lat: 40.7353041, lng: -73.99413539999999 } },
  { address: '16 E 16th St, New York, NY', latLong: { lat: 40.736765, lng: -73.9919024 } },
  { address: '2 W 13th St, New York, NY', latLong: { lat: 40.7353297, lng: -73.99447889999999 } } 
]
```

Be mindful of:  
* API rate limits (you get 2,500 requests total before needing to pay TAMU for more)  
* Asyncronous JavaScript (but don't overuse `setTimeout`)  
* Keeping your API key(s) off of GitHub (use an [environment variable](https://www.npmjs.com/package/dotenv) instead)  
* Keeping only the data you need from the API response, not all the data  

Update your GitHub repository with the relevant file(s). In Canvas, submit the URL of the specific location of this work within your `data-structures` GitHub repository. 

## Starter Code

### Setting environment variables using npm `dotenv`

Environment variables help keep APIs secret (and off of GitHub!). There are several ways to create and manage environment variables; I recommend [`dotenv`](https://www.npmjs.com/package/dotenv).  

Here are the steps to set this up: 

1. In the root directory of your Cloud9 workspace (e.g. `/home/ec2-user/environment`), create a new file named `.env` with the following Linux command: `touch .env`  
2. Open the new `.env` file by double clicking the file name in the Cloud 9 abstraction of the root directory structure.  
3. In this file, you may assign new environment variables. No spaces are permitted in variables assignments (unless in a text string) and each new variable assignment should be on a new line (with no blank lines in between). For example, you could create two new environment variables with:
> ```ini
> NEW_VAR="Content of NEW_VAR variable"
> MYPASSWORD="ilovemykitties"
> ```
4. **IMPORTANT: your `.env` file should NEVER, EVER end up on GitHub.** One way to manage this is by [creating a local `.gitignore` file](https://help.github.com/en/articles/ignoring-files). This file will eventually contain all your API Keys, which should be treated as carefully as you treat passwords, credit card numbers, and family secrets. Guard it with your life. 

To access, these variables, you will use `process.env` to access the environment variables created by the `dotenv` package, as demonstrated in the starter code: 

### Install dependencies
```console
npm install request async dotenv
```

### Node.js script

```js
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
```

#### Documentation

* [Texas A&M Geoservices Geocoding APIs](http://geoservices.tamu.edu/Services/Geocode/WebService/)  
* [Node `querystring` module](https://nodejs.org/api/querystring.html)
* [npm `async` module](http://caolan.github.io/async/)  
* [npm `dotenv` module](https://www.npmjs.com/package/dotenv)

#### Sample API Response

```javascript
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
```
---
### Readings for the week - Due at the beginning of the following week
* Gitelman, Chapter 2
* Hills, Chapters 13, 14, 15, and 16
* Dourish, Chapter 4
--- 
### Process
* Getting a better understanding of Asyncronous Javascript and API requests/responses was one of the main purposes of this weeks exercises.
* I began this exercise by looking more into how the file directories and file paths are served and read using Node.js and the FS module. 
* After I spent a significant amount time trying to understand directories, buffers, streams, and reading about recursive File feeds and Paths, and experimenting with the following code: 
```js
// Directory of files
let directory = "files";
let dirBuf = Buffer.from(directory);

// Async read of directory files
fs.readdir(dirBuf, (err, files)=>{
     if (err) {
        console.log(err.message);
     } else {
         console.log(files);
     }
});

// Writing a new file asynchromously
fs.readFile(filePath, (err,data) => {
     if (err) throw err
     fs.writeFile(newFile, data, (err) => {
     if (err) throw err
         console.log(newFile + ' saved')
     })
});

```

* I realized after going down the abyss of "callback hell" tutorials, that I needed to get back to a simpler version of what was exactly needed to finish the exercise. 
* My apprach was first to limit the streetAddress Array to only 10 addresses, so as to not overdue the API rate limits while testing things. 
* Then to figure out how pass the data of `fs.readFile` to the `async.eachSeries()` method.
* After considerable energy with experimenting, and wanted to solve the issue of multiple files a directory, I came up with the following for loop to address this:

```js
// Used if we have multiple files in the directory to read
var filenames = fs.readdirSync(`${__dirname}/files`); 
// console.log(filenames);

// This forloop goes through each filename in the files directory and reads each file and return its contents.
for (let i = 0; i<filenames.length; i++){
    var addresses = JSON.parse(fs.readFileSync(`${__dirname}/files/${filenames[i]}`));

```  
 * The next struggle was to understand how to transform the data coming back from the API call, and only pulling out the necessary Lat and Long data. After lots of issues, I came up with the following code to address putting those values in a schema:

```js
var finalOutput =
    {
        "address": value,
        "latLong":{
                "lat":tamuGeo.OutputGeocodes[0].OutputGeocode.Latitude,
                "lng":tamuGeo.OutputGeocodes[0].OutputGeocode.Longitude
        }
    };
```

* Finally, the last two issues were to read and replace the `.txt` file extension with `.json` extension:
* Rather clunky execution here, but it's a series of splitting, popping, pushing, and joining the new extension.
```js
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
```

* Lastly, the `writeFileSync()` method takes in that above transformation and stringifies the meetingdata.

```js
    fs.writeFileSync(`${joinJson}`, JSON.stringify(meetingsData));
```
--- 
### Observations & Learnings
* Async / Await seems to be the clearest way to deal with "callback hell" problem. Promises are essential to understanding this as well, as they come up again and again.
* There will always be another blackhole around the corner. Pick your battles wisely. 
---
### Challenges / Opportunities
* One of the biggest challenges I'm encountering is not having the time needed to really experiment with each of these principles of Async, Promises, Paths, File Directories, etc. before moving to the next lesson.     

