# Weekly Assignment 6 
---

Assignment 6 Details: [Week 6](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week6/week6_assignment.md) 

## Summary:
The purpose of this assignment was to retrieve data from our SQL Database & NoSQL Database.

--- 

### Process

#### Preparation & Setup for SQL query - File is [Here](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week6/wa06_SQL.js)
* Before I began working on the SQL data retrieval, I first cleaned up the `address.json` file from week3, deleted the table from week4, and parsed in the whole file in using `var addressesForDb = JSON.parse(fs.readFileSync('../week3/data/files/streetAddresses.json'));`
* After that I set up the credential for AWS and created a `.env` file to pass in for querying.
* Also included the console.table, and dotenv imports. 
```js
const cTable = require('console.table');
const dotenv = require('dotenv');
dotenv.config();
```
#### Step One
* After setting up the AWS creds, dropping the original table in week4, and recreating it -- I proceeded with querying based on multiple `WHERE` statements and conditions:
`var thisQuery = "SELECT address, lat, long FROM aalocations WHERE address LIKE '%96th%' OR lat > 40.801;"`
* Here I used the WHERE and LIKE condition to find the streets with "96th" in the address and addresses which had a latitude above 40.801.

```js
address                              lat         long       
-----------------------------------  ----------  -----------
207 West 96th Street, New York, NY   40.7945161  -73.9710419
207 West 96th Street, New York, NY   40.7945161  -73.9710419
221 West 107th Street, New York, NY  40.8017795  -73.9665393
207 West 96th Street, New York, NY   40.7945161  -73.9710419
601 West 114th Street, New York, NY  40.8069051  -73.965058 
207 West 96th Street, New York, NY   40.7945161  -73.9710419
218 West 108th Street, New York, NY  40.8021037  -73.9658778
207 West 96th Street, New York, NY   40.7945161  -73.9710419
207 West 96th Street, New York, NY   40.7945161  -73.9710419
207 West 96th Street, New York, NY   40.7945161  -73.9710419
207 West 96th Street, New York, NY   40.7945161  -73.9710419
207 West 96th Street, New York, NY   40.7945161  -73.9710419
207 West 96th Street, New York, NY   40.7945161  -73.9710419
```

*Image:

<img src = "https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week6/images/SQL_query.png">

#### Preparation & Setup for NOSQL query -  File is [Here](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week6/wa06_NOSQL.js)
* In this example for NoSQL, we are querying the DynamoDB database which we set up in [week5](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week5).
* In order to prepare, we have added additional entries into the database:

```js
blogEntries.push(new BlogEntry(userID[09], nycTimeStamp + uuidv1(), 'Amsterdam Art Show.', 'Art Exhibitions', 'October 10 2020','GEM-Z Exhibition...', 300, uuidv1(), true, ["Spring", "2021"]));
blogEntries.push(new BlogEntry(userID[09], nycTimeStamp + uuidv1(), 'Lenses', 'Business Processes', 'October 8 2020','Putting Mineral Glasses Lenses...', 340, uuidv1(), true, ["Winter", "2020"]));
blogEntries.push(new BlogEntry(userID[09], nycTimeStamp + uuidv1(), 'Vision Series', 'Self-Development', 'October 5 2020', 'Wrapping up the Vision Series', 500, uuidv1(), true, ["Winter", "2020"]));
blogEntries.push(new BlogEntry(userID[09], nycTimeStamp + uuidv1(), 'Tomoe River FP','Product Development', 'October 11 2020', 'Dear Ms.Chensa, ...', 500, uuidv1(), true, ["Spring", "2021"]));
```

#### Step One
* In Step One, I set the `user_id` to user LK with a Month search of August entries.
* Next, I used the `begins_with` filter in Dynamo for setting the sortkey value to submitted entries on October 6th.
* `KeyConditionExpression` contains the `user_id` partition key and `entry_date_id` for the sortkey. 

```js

var params = {
    TableName : "processblog",
    KeyConditionExpression: '#uid = :userIdName AND begins_with (entry_date_id, :entryDateVal)',
    // :minDate and :maxDate"
    ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
        "#uid" : "user_id",
    },
    ExpressionAttributeValues: { // the query values
        ":userIdName": {S: "LK_08"},
        ":entryDateVal": {S: "October 6"},
        // ":tag": {S:"Business Processes"},
        // ":dayOfEntry": {S: "October 10 2020"},
        // ":minDate": {N: new Date("October 6, 2020").valueOf().toString()},
        // ":maxDate": {N: new Date("October 8, 2020").valueOf().toString()}
    }
};

```


#### Output: 

* Here we are searching on Journal Entries by user LK, which had the day of the entry created in August, but the entries were submitted to the database on October 6th.
 
```js

Query succeeded.
***** ***** ***** ***** ***** 
 { wroteinJournal: { SS: [ '2019', 'Summer' ] },
  user_id: { S: 'LK_08' },
  entry: { S: 'The first thing...' },
  entry_date_id: { S: 'October 6th 2020, 10:47:3535 pm' },
  wordcount: { N: '200' },
  unique_id: { S: '74657b00-0847-11eb-8076-b12adb84fa9a' },
  productive: { BOOL: true },
  dayOfEntry: { S: 'August 28 2019' },
  tag: { S: 'Business Processes' },
  title: { S: 'Ideas for Co.' } }
***** ***** ***** ***** ***** 
 { wroteinJournal: { SS: [ '2019', 'Summer' ] },
  user_id: { S: 'LK_08' },
  entry: { S: 'The first thing...' },
  entry_date_id:
   { S:
      'October 6th 2020, 11:12:4848 pmfa32d6d0-084a-11eb-8e64-892dd3b11d02' },
  wordcount: { N: '200' },
  unique_id: { S: 'fa337310-084a-11eb-876e-961b44ecc83a' },
  productive: { BOOL: true },
  dayOfEntry: { S: 'August 28 2019' },
  tag: { S: 'Business Processes' },
  title: { S: 'Ideas for Co.' } }
***** ***** ***** ***** ***** 
 { wroteinJournal: { SS: [ '2019', 'Summer' ] },
  user_id: { S: 'LK_08' },
  entry: { S: 'The first thing...' },
  entry_date_id:
   { S:
      'October 6th 2020, 11:22:3333 pm573ec400-084c-11eb-8aad-a4a3d79603e8' },
  wordcount: { N: '200' },
  unique_id: { S: '573f3930-084c-11eb-845e-c894ed767de7' },
  productive: { BOOL: true },
  dayOfEntry: { S: 'August 28 2019' },
  tag: { S: 'Business Processes' },
  title: { S: 'Ideas for Co.' } }
***** ***** ***** ***** ***** 
 { wroteinJournal: { SS: [ '2019', 'Summer' ] },
  user_id: { S: 'LK_08' },
  entry: { S: 'The first thing...' },
  entry_date_id: { S: 'October 6th 2020, 3:56:011 pm' },
  wordcount: { N: '200' },
  unique_id: { S: 'f5aee910-080d-11eb-8acb-ddb82ab6aed1' },
  productive: { BOOL: true },
  dayOfEntry: { S: 'August 28 2019' },
  tag: { S: 'Business Processes' },
  title: { S: 'Ideas for Co.' } }
***** ***** ***** ***** ***** 
 { wroteinJournal: { SS: [ '2019', 'Summer' ] },
  user_id: { S: 'LK_08' },
  entry: { S: 'The first thing...' },
  entry_date_id: { S: 'October 6th 2020, 4:34:3030 pm' },
  wordcount: { N: '200' },
  unique_id: { S: '56467130-0813-11eb-82e6-3520044643b3' },
  productive: { BOOL: true },
  dayOfEntry: { S: 'August 28 2019' },
  tag: { S: 'Business Processes' },
  title: { S: 'Ideas for Co.' } }

```
* Image:

<img src = "https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week6/images/NOSQL_query.png">


### Observations & Learnings
* I will need to add many more tables and also find a way to get rid of duplicate addresses, either using SQL or hardcoded in the JSON return.
* After working through the NOSQL example, I think adding a Uuid to the date might be overkill to the sortkey, or I just haven't yet learned how to best query with it yet. 

---
### Challenges / Opportunities
* I may need to delete the NOSQL "table" and start fresh with a new sort key name and new attribute names, as the picture is becoming clearer as to how I would like to retrieve the information.
* Additional research into querying will be tremendously helpful for dynamodb and postgresql.
* Need to find the best way to deal with duplicates in both the SQL database and NOSQL database. In some cases these are helpful in others they are not. 

### Additional / Readings for the week
* Gitelman, Chapter 4
* For Big-Data Scientists, ['Janitor Work' Is Key Hurdle to Insights, The New York Times, August 17, 2014](https://www.nytimes.com/2014/08/18/technology/for-big-data-scientists-hurdle-to-insights-is-janitor-work.html?smid=pl-share)
* Documentation: GitHub issues
