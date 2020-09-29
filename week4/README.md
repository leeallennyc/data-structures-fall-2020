# Weekly Assignment 4 
---
Assignment 4 Details: [Week 4](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week4/week4_assignment.md) and [PostGres Setup](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week4/week4_postgresdb.md)  

## Summary:
The purpose of this assignment was to setup a Postgres Relational Database in AWS, begin a schema sketch for AA meetings data, and use SQL to load data into our database using Node.js. 
--- 
### Process
* We first transferred our account to another AWS educate account this week.

#### Step One
* I began sketching from the place of the User as in: `What is most important thing when searching for a meeting?`
* I came up with the following questions based on the [html data]('https://parsons.nyc./aa/m06.html') from `https://parsons.nyc./aa/m06.html`.
![AWS Questions](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week4/images/AWS_RDB_Questions.png "Questions")
* After coming up with these questions I decided to use a more "normalized" approach to setting up tables using Lucidchart as there were multiple considerations around the data.
* The categories fell into `time/availability`, `travel distance`,  `wheelchair access`, `interests`, and `new or returning members/interests`. 
* My first attempt:
![AWS Questions](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week4/images/AWS_schema_sketch.png "Schema Sketch")
* I haven't started to make the entity relations yet, such as one to one, one to many, etc. in the sketch--which is to come in the next iteration. 
* Questions to consider:
-Will you use a Normalized Data Model or a Denormalized Data Model? Why?
-When the data comes back out of the database, how should it be structured? Why?
-How would you describe the hierarchy of the data?
--- 

#### Step Two
* Next we set up a Postgres DB instance on AWS as illustrated [here](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week4/week4_postgresdb.md). 
* Building on our work from the previous weeks, our goal was to begin the process of moving data into the AWS database, and building a schema based on how we might think through the user experience of searching for a AA meeting in NYC. 
```js
// Part a

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

// Sample SQL statement to create a table:
var thisQuery = "CREATE TABLE aalocations (address varchar(120), lat double precision, long double precision);";
// Sample SQL statement to delete a table:
// var thisQuery = "DROP TABLE aalocations;";

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
```
---
#### Step Three
* Here we pass in the sample data as var `addressesForDb`:

```js
// Part b

const { Client } = require('pg');
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

var addressesForDb = [ { address: '63 Fifth Ave, New York, NY', latLong: { lat: 40.7353041, lng: -73.99413539999999 } }, { address: '16 E 16th St, New York, NY', latLong: { lat: 40.736765, lng: -73.9919024 } }, { address: '2 W 13th St, New York, NY', latLong: { lat: 40.7353297, lng: -73.99447889999999 } } ];

async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.address + "', " + value.latLong.lat + ", " + value.latLong.lng + ");";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
}); 
```

#### Step Four
* Finally, we make selection from the Database we set up and return the data:
``` js
// Part c

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

// Sample SQL statement to query the entire contents of a table: 
var thisQuery = "SELECT * FROM aalocations;";

client.query(thisQuery, (err, res) => {
    console.log(err, res.rows);
    client.end();
});
```
### Observations & Learnings
* Tools such Lucidchart are very helpful for understanding the tables being created, and entity relations of each table. 
* The concept of Primary and Foreign key were integral to better understand how the tables will be joined through SQL.
* Taking some time to understand how others model Entity Relationships was tremendously helpful. 
* Understanding how to strucure a schema based on ["normalization" or "de-normalization"?](https://www.quora.com/What-is-normalized-vs-denormalized-data) was a very helpful concept. 
---
### Challenges / Opportunities
* Need to put more time aside for understanding different types of notation used in the world of RDBMS and specifically modeling Entity Relationships (crow's foot, etc). Hills covers his own "COMN" model, but there are many other approaches.
* More time to practice and learn SQL. 

### Additional / Readings for the week
* Gitelman, Chapter 6
* Hills, Chapter 17
* Dourish, Chapter 5
