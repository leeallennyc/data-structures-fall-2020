const uuidv1 = require('uuidv1'); // require uuidv1 for Unique ID generator
const async = require('async'); // require async
var moment = require('moment'); // require Moment.js
var moment = require('moment-timezone'); // require Moment-Timezone

// Creates a timestamp in NYC time of the current time and unique ID.
let nycTimeStamp = moment().tz("America/New_York").format('MMMM Do YYYY, h:mm:sss a');

// Creating User Id with Month number as suffix
let userID = [
    'LK_01', // Jan Entries for user_Id "LK"
    'LK_02', 
    'LK_03',
    'LK_04',
    'LK_05', // May Entries for user_Id "LK"
    'LK_06',
    'LK_07',
    'LK_08', 
    'LK_09',
    'LK_10',
    'LK_11', 
    'LK_12'  // Dec Entries for user_Id "LK"
    ];

var blogEntries = [];

// Create a unique ID
// let id = uuidv1().tostring();

class BlogEntry {
    constructor(primaryKey, sortKey, title, tag, dayOfEntry, entry, wordcount, uniqueId, productive, wroteinJournal) {
        this.user_id = {};
        this.user_id.S = primaryKey.toString();
        this.entry_date_id = {};
        this.entry_date_id.S = sortKey.toString();
        this.title = {};
        this.title.S = title.toString();
        this.tag = {};
        this.tag.S = tag.toString();
        this.dayOfEntry = {};
        this.dayOfEntry.S = dayOfEntry.toString();
        this.entry = {};
        this.entry.S = entry.toString();
        this.wordcount = {};
        this.wordcount.N = wordcount.toString();
        this.unique_id = {}
        this.unique_id.S = uniqueId.toString();
        this.productive = {};
        this.productive.BOOL = productive;
        if (wroteinJournal != null) {
            this.wroteinJournal = {};
            this.wroteinJournal.SS = wroteinJournal;
        }
    }
}
// Push Blog entries to empty array
blogEntries.push(new BlogEntry(userID[7], nycTimeStamp + uuidv1(), 'Ideas for Co.', 'Business Processes', 'August 28 2019','The first thing...', 200, uuidv1(), true, ["Summer", "2019"]));
blogEntries.push(new BlogEntry(userID[11], nycTimeStamp + uuidv1(), 'Holons', 'Integral Theory', 'December 20 2019','Idea of a whole as part...', 340, uuidv1(), true, ["Winter", "2019"]));
blogEntries.push(new BlogEntry(userID[5], nycTimeStamp + uuidv1(), 'Ecosystems', 'Organizational Dynamics', 'June 14 2020', 'Business Species...', 150, uuidv1(), true, ["Summer", "2020"]));
blogEntries.push(new BlogEntry(userID[8], nycTimeStamp + uuidv1(), 'Macro Vision','Self-Development', 'September 20 2020', 'The timeline for..', 600, uuidv1(), true, ["Fall", "2020"]));
// console.log(blogEntries);

// Setup AWS sdk and config region
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";
var dynamodb = new AWS.DynamoDB();

// Asynchronously loop through each blogEntry
async.eachSeries(blogEntries, function(value, callback){
    let params = {
        Item: value,
        TableName:'processblog'
        };
    // Put each each item in DynamoDB asynchronously  
    dynamodb.putItem(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
    setTimeout(callback, 2000); // wait 2 seconds for each item
    // console.log(params);
    }, function(err) {
    if (err) {
    console.log('unable to create entry');
    } else {
    console.log('All entries created');
    };
});