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
// blogEntries.push(new BlogEntry(userID[7], nycTimeStamp, 'Ideas for Co.', 'Business Processes', 'August 28 2019','The first thing...', 200, uuidv1(), true, ["Summer", "2019"]));
// blogEntries.push(new BlogEntry(userID[11], nycTimeStamp, 'Holons', 'Integral Theory', 'December 20 2019','Idea of a whole as part...', 340, uuidv1(), true, ["Winter", "2019"]));
// blogEntries.push(new BlogEntry(userID[5], nycTimeStamp, 'Ecosystems', 'Organizational Dynamics', 'June 14 2020', 'Business Species...', 150, uuidv1(), true, ["Summer", "2020"]));
// blogEntries.push(new BlogEntry(userID[8], nycTimeStamp, 'Macro Vision','Self-Development', 'September 20 2020', 'The timeline for..', 600, uuidv1(), true, ["Fall", "2020"]));

// blogEntries.push(new BlogEntry(userID[09], nycTimeStamp + uuidv1(), 'Amsterdam Art Show.', 'Art Exhibitions', 'October 10 2020','GEM-Z Exhibition...', 300, uuidv1(), true, ["Spring", "2021"]));
// blogEntries.push(new BlogEntry(userID[09], nycTimeStamp + uuidv1(), 'Lenses', 'Business Processes', 'October 8 2020','Putting Mineral Glasses Lenses...', 340, uuidv1(), true, ["Winter", "2020"]));
// blogEntries.push(new BlogEntry(userID[09], nycTimeStamp + uuidv1(), 'Vision Series', 'Self-Development', 'October 5 2020', 'Wrapping up the Vision Series', 500, uuidv1(), true, ["Winter", "2020"]));
// blogEntries.push(new BlogEntry(userID[09], nycTimeStamp + uuidv1(), 'Tomoe River FP','Product Development', 'October 11 2020', 'Dear Ms.Chensa, ...', 500, uuidv1(), true, ["Spring", "2021"]));

// blogEntries.push(new BlogEntry(userID[09], nycTimeStamp + uuidv1(), 'Midori Sample.','Product Development', 'October 12 2020','Sample sent from Japan...', 300, uuidv1(), true, ["Spring", "2021"]));
// blogEntries.push(new BlogEntry(userID[09], nycTimeStamp + uuidv1(), 'Run', 'Self-Development', 'October 12 2020','2.5 Miles around...', 460, uuidv1(), true, ["Winter", "2020"]));
// blogEntries.push(new BlogEntry(userID[09], nycTimeStamp + uuidv1(), 'Germany','Product Development', 'October 13 2020', 'Send address to ....', 700, uuidv1(), true, ["Winter", "2020"]));
// blogEntries.push(new BlogEntry(userID[09], nycTimeStamp + uuidv1(), 'Tomoe Rivr FP','Product Development', 'October 13 2020', 'Dear Ms.Chensa, ...', 500, uuidv1(), true, ["Spring", "2021"]));

blogEntries.push(new BlogEntry(userID[10], nycTimeStamp + uuidv1(), 'Double Signature.','Product Development', 'November 2 2020','Additional sample from Germany', 200, uuidv1(), true, ["Spring", "2021"]));
blogEntries.push(new BlogEntry(userID[10], nycTimeStamp + uuidv1(), 'Networks and Geographies', 'Entrepreneurship Research', 'November 3 2020','2.5 Zoltan J. Acs and David Audretsch...', 600, uuidv1(), true, ["Winter", "2020"]));
blogEntries.push(new BlogEntry(userID[10], nycTimeStamp + uuidv1(), 'Section 1 of DX Journal','DX Journal', 'November 4 2020', 'Data Experience is..', 400, uuidv1(), true, ["Winter", "2021"]));
blogEntries.push(new BlogEntry(userID[10], nycTimeStamp + uuidv1(), 'Demand Side Arguments','Knowledge Capital', 'November 5 2020','State the environment creates...', 325, uuidv1(), true, ["Spring", "2021"]));
blogEntries.push(new BlogEntry(userID[10], nycTimeStamp + uuidv1(), 'Run', 'Self-Development', 'November 6 2020','3 Miles around...', 350, uuidv1(), true, ["Winter", "2020"]));
blogEntries.push(new BlogEntry(userID[10], nycTimeStamp + uuidv1(), 'Amsterdam Project','Art Exhibition', 'November 7 2020', 'Email sent to D. and Z...', 700, uuidv1(), true, ["Spring", "2021"]));
blogEntries.push(new BlogEntry(userID[10], nycTimeStamp + uuidv1(), 'Geographical Clustering','Entrepreneurship Research', 'November 8 2020','From a cost perspective, Geographical Clustering...', 550, uuidv1(), true, ["Spring", "2021"]));
blogEntries.push(new BlogEntry(userID[10], nycTimeStamp + uuidv1(), 'Population Ecology', 'Entrepreneurship Research', 'November 9 2020','Small numbers problem tied to automonous...', 300, uuidv1(), true, ["Winter", "2020"]));
blogEntries.push(new BlogEntry(userID[10], nycTimeStamp + uuidv1(), 'Configurations versus Custom','Product Development', 'November 10 2020', 'This idea of customization falling out...', 700, uuidv1(), true, ["Winter", "2020"]));


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