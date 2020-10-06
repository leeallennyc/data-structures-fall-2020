// Import dependencies such as Moment and uuidv1 for time and unique id.
const uuidv1 = require('uuidv1');
var moment = require('moment'); // require
var moment = require('moment-timezone');


let nycTimeStamp = moment().tz("America/New_York").format('MMMM Do YYYY, h:mm:ss a');
console.log(nycTimeStamp);


console.log(uuidv1());
console.log(uuidv1());

var blogEntries = [];

let months  = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let daysOfMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let years =  [2015, 2016, 2017, 2018, 2019, 2020];
let quarter = ["Q1", "Q2", "Q3", "Q4"];



let localDate = new Date();
console.log(localDate.toDateString());

let localeTimeStamp = new Date();
console.log(localeTimeStamp.toLocaleString('en-US', {timeZone: "America/New_York"}));

let timeStampJSON = localeTimeStamp.toJSON();
console.log(timeStampJSON);

let transformedJSONDate = new Date().toString();
console.log(transformedJSONDate);

let currentNumberStamp = Date.now().toString();
console.log(currentNumberStamp);



// let jsonDate = currentTimeStamp.toJSON();

// let transformedJSONDate = new Date(jsonDate).toUTCString();
// // expected output: Tue, 19 Aug 1975 23:15:30 GMT

// console.log(transformedJSONDate);




// Date Formatting



// class BlogEntry {
//     constructor(primaryKey, sortKeyDateNow, yearOfEntry, quarterOfEntry, monthOfEntry, dayOfMonth, dayOfEntry, hourOfEntry, minuteOfEntry, author, subjectMatter, journalEntry, link, reference, tag, productive, wroteinJournal) {
        
       
//         this.pk = {};
//         this.pk.N = primaryKey.toString();
//         this.skdatenow = {};
//         this.skdatenow.S = sortKeyDateNow.toString();
        
    
//         this.yearoOEntry = {};
//         this.yearOfEntry.S = Date.now().getFullYear().toString();
//         this.quarterOfEntry = {}
//         this.quarterOfEntry.S = quarter[2];
//         this.monthOfEntry = {};
//         this.monthOfEntry.S = Date.now().getMonth().toString();
//         this.dayOfMonth = {};
//         this.dayOfMonth.S = daysOfMonth.toString();
//         this.dayOfEntry = {};
//         this.dayOfEntry.S = Date.now().getDate().toString();
//         this.hourOfEntry = {};
//         this.hourOfEntry.S = Date.now().getHours().toString();
//         this.minuteOfEntry = {};
//         this.minuteOfEntry.S = Date.now().getMinutes().toString();
//         this.millisecondOfEntry = {};
//         this.millisecondOfEntry.S = Date.now().getMilliseconds().toString();
        
//         this.author = {};
//         this.author.S = author.toString();
//         this.subjectMatter = {}
//         this.subjectMatter.S = subjectMatter.toString();
//         this.journalEntry = {};
//         this.journalEntry.S = journalEntry.toString();
        
//         this.link = {};
//         this.link.S = link.toString();
        
//         this.reference = {};
//         this.reference.S = reference.toString();
        
//         this.tag = {};
//         this.tag.S = tag.toString();
        
//         this.wroteinJournal = {};
//         this.wroteinJournal.BOOL = productive;
//         if (productive != null) {
//             this.productive = {};
//             this.productive.SS = productive;
//         }
//         this.month = {};
//         this.month.N = new Date(dayOfEntry).getMonth().toString();
//     }
// }

// console.log(yearOfEntry);

//     // constructor(primaryKey, sortKeyDateNow, yearOfEntry, monthOfEntry, dayOfEntry, hourOfEntry, minuteOfEntry, author, subjectMatter, journalEntry, link, reference, tag, productive, wroteinJournal) 
// blogEntries.push(new BlogEntry(1000001, currentNumberStamp, years[5], months[8], daysOfWeek[4], ", true, ["Cheez-Its", "M&Ms"]));
// blogEntries.push(new BlogEntry(1000002, currentNumberStamp, years[4], months[9], daysOfWeek[2], 'October 31 2015', "I piloted my first solo flight!", true, ["pancakes"]));
// blogEntries.push(new BlogEntry(1000003, currentNumberStamp, years[3], months[6], daysOfWeek[4], 'November 10 2019', 8675309, "867-5309?", false));
// blogEntries.push(new BlogEntry(1000004, currentNumberStamp, years[2], months[7], daysOfWeek[0], 'September 25, 2019', "I taught my favorite students.", true, ["peas", "carrots"]));

// console.log(blogEntries);