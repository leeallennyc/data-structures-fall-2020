# Weekly Assignment 5 
---
Assignment 5 Details: [Week 5](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week5/week5_assignment.md) 

## Summary:
The purpose of this assignment was to setup a [DynamoDB](https://aws.amazon.com/dynamodb/) NoSQL database in AWS, and post data from a process blog into the database.

--- 
### Process

#### Preparation & Setup
* Set up a DynamoDB NoSQL database in AWS as illustrated [here](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week5/week5_DynamoDB.md). 
* Our goal was to begin the process of creating a new [DynamoDB](https://aws.amazon.com/dynamodb/) NoSQL database through AWS, and building a schema based on how we might think through the user experience of searching and publishing a journal/blog entry.

#### Step One
* Using a similar framework to last week, I began sketching first: 
* I came up with the following questions based on what might need to be retrieved and accessed from a journal/blog entry.
 ![](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week5/images/AWS_DynamoDB_Questions.png?raw=true)
* Additional Queries and Writes
 ![](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week5/images/AWS_DynamoDB_Queries_Writes.png?raw=true) 
* A sketch the primary key (partition key + sort key) and various attributes for each User. 
 ![](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week5/images/AWS_DynamoDB_schema_sketch.png?raw=true)

#### Step Two
* In Step two we created a class of blogEntries as our datasource to prepare for the DynamoDB. We pushed each BlogEntry into the an empty array, which was then sent to the DB. 

* Starter Code:
```js
var blogEntries = [];

class BlogEntry {
  constructor(primaryKey, date, entry, happy, iate) {
    this.pk = {};
    this.pk.N = primaryKey.toString();
    this.date = {}; 
    this.date.S = new Date(date).toDateString();
    this.entry = {};
    this.entry.S = entry;
    this.happy = {};
    this.happy.BOOL = happy; 
    if (iate != null) {
      this.iate = {};
      this.iate.SS = iate; 
    }
    this.month = {};
    this.month.N = new Date(date).getMonth().toString();
  }
}

blogEntries.push(new BlogEntry(0, 'August 28 2019', "Yay, first day of class!", true, ["Cheez-Its", "M&Ms"]));
blogEntries.push(new BlogEntry(1, 'October 31, 2015', "I piloted my first solo flight!", true, ["pancakes"]));
blogEntries.push(new BlogEntry(2, 8675309, "867-5309?", false));
blogEntries.push(new BlogEntry(3, 'September 25, 2019', "I taught my favorite students.", true, ["peas", "carrots"]));

console.log(blogEntries);
```

#### Step Three
* Populating the Database with the blog/journal entries that we created.
* Starter code:
``` js
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

var params = {};
params.Item = blogEntries[0]; 
params.TableName = "processblog";

dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
```

### Observations & Learnings
* Learning about Global Secondary Indexes and Local Secondary Indexes to help with the "Access patterns" of the DynamoDB. Ideas of Throttling due to "hot keys", and how to set RCU / WCU capacity on global indexes. 
* It's most helpful to understand the quesitons and use cases of the final user before ever touching the schema design. 
* I learned about [moment.js](https://momentjs.com/) and [moment.js/timezone](https://momentjs.com/timezone/).
* Also how bring in and use [uuidV1](https://www.npmjs.com/package/uuid) for creating unique identifiers.

---
### Challenges / Opportunities
* One of the challenges that I continually come across is how many different approaches there are to do the same thing.
* An opportunity for the next exercise would to be scale back the problem to understand what is the minimal example that I can produce before expanding my code and complexity of the problem. 

### Additional / Readings for the week
* 
Hills, Chapter 5
[Database as Symbolic Form, Lev Manovich](https://www.semanticscholar.org/paper/Database-as-Symbolic-Form-Manovich/e45079a8931a1c37da99e9be042502f332e6438b) 
Gitelman, Data Flakes: An Afterword to "Raw Data" Is an Oxymoron
