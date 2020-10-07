# Weekly Assignment 5 
---
Assignment 5 Details: [Week 5](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week5/week5_assignment.md) 

## Summary:
The purpose of this assignment was to setup a [DynamoDB](https://aws.amazon.com/dynamodb/) NoSQL database in AWS, and post data from a process blog into the database.

--- 
### Process

#### Preparation & Setup
* Set up a DynamoDB NoSQL database in AWS as illustrated [here](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week5/week5_assignment.md). 
* Our goal was to begin the process of creating a new [DynamoDB](https://aws.amazon.com/dynamodb/) NoSQL database through AWS, and build a schema based on how we might think through the user experience of searching and publishing a journal/blog entry.
* Here I also chose to set up a Local Secondary Index on "Tag"
 ![](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week5/images/Local_Secondary_Index.png?raw=true)
#### Step One
* Using a similar framework to last week, I began sketching first: 
* I came up with the following questions based on what might need to be retrieved and accessed from a journal/blog entry.
 ![](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week5/images/AWS_DynamoDB_Questions.png?raw=true)
* Additional Queries and Writes
 ![](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week5/images/AWS_DynamoDB_Queries_Writes.png?raw=true) 
* A sketch the primary key (partition key + sort key) and various attributes for each User. 
 ![](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week5/images/AWS_DynamoDB_schema_sketch.png?raw=true)

#### Step Two
* In Step two we created a class of blogEntries as our datasource to prepare for DynamoDB. We pushed each BlogEntry into the an empty array, which was then sent to the DB. 

* class BlogEntry:
```js
var blogEntries = [];

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
        // this.month = {};
        // this.month.N = new Date(dayOfEntry).getMonth().toString();
    }
}

    blogEntries.push(new BlogEntry(userID[7], nycTimeStamp, 'Ideas for Co.', 'Business Processes', 'August 28 2019','The first thing...', 200, uuidv1(), true, ["Summer", "2019"]));
    blogEntries.push(new BlogEntry(userID[11], nycTimeStamp, 'Holons', 'Integral Theory', 'December 20 2019','Idea of a whole as part...', 340, uuidv1(), true, ["Winter", "2019"]));
    blogEntries.push(new BlogEntry(userID[5], nycTimeStamp, 'Ecosystems', 'Organizational Dynamics', 'June 14 2020', 'Business Species...', 150, uuidv1(), true, ["Summer", "2020"]));
    blogEntries.push(new BlogEntry(userID[8], nycTimeStamp, 'Macro Vision','Self-Development', 'September 20 2020', 'The timeline for..', 600, uuidv1(), true, ["Fall", "2020"]));

console.log(blogEntries);
```

#### Step Three
* Populating the Database with the blog/journal entries that we created.
* Used the `async.eachSeries()`
``` js
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
```

* Result of first attempt.
![](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week5/images/AWS_DynamoDb_Table.png?raw=true)

* Result with duplicates.
![](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week5/images/AWS_duplicates.png?raw=true)

### Observations & Learnings
* Learning about Global Secondary Indexes and Local Secondary Indexes to help with the "Access patterns" of the DynamoDB. Ideas of Throttling due to "hot keys", and how to set RCU / WCU capacity on global indexes. 
* There is no extra cost to using LSIs but there is a large cost to using GSIs (especially when the table gets large). With this in mind, the LSIs have to be defined at Table creation time. 
* It's most helpful to understand the quesitons and use cases of the final user before ever touching the schema design. 
* I learned about [moment.js](https://momentjs.com/) and [moment.js/timezone](https://momentjs.com/timezone/).
* Also how bring in and use [uuidV1](https://www.npmjs.com/package/uuid) for creating unique identifiers.
* Having duplicate entries in the DB because of the unique sort key combination with `timestamp` and `unique_id`

---
### Challenges / Opportunities
* One of the challenges that I continually come across is how many different approaches there are to do the same thing.
* An opportunity for the next exercise would to be scale back the problem to understand what is the minimal example that I can produce before expanding my code and complexity of the problem.
* Challenge with duplicate entries from sort key combination, also using the `async.eachSeries()` method to finalize the assignment was more difficult than expected, as I spent the majority of my time on learning about `uuidv1()`, Moment.js, and setup. 

### Additional / Readings for the week
* Hills, Chapter 5
* [Database as Symbolic Form, Lev Manovich](https://www.semanticscholar.org/paper/Database-as-Symbolic-Form-Manovich/e45079a8931a1c37da99e9be042502f332e6438b) 
* Gitelman, Data Flakes: An Afterword to "Raw Data" Is an Oxymoron
