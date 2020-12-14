# Final App Demo 
---
Final App Demo Details: [Final Demo App](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/final_app_demo) 

## Summary:
The purpose of this assignment was to provide a foundation for final assignment 1, 2, and 3. 

--- 
### Process

#### Final Assignment 1 (AA Meetings Map)
* After a few days of troubleshooting, I came to realize that I needed to add the `dotenv.config();` after requiring the `const dotenv = require('dotenv');` -- this took me some time to figure out.
* For this sample of the AA Map, I changed the sample query to one where I could test a few locations above a certain latitude:
```js
 var thisQuery = `SELECT lat, lng, json_agg(json_build_object('loc', buildingName, 'address', address, 'zipcode', zipcode)) as meetings 
                    FROM aalocations 
                    WHERE address LIKE '%96th%' OR lat > 40.801
                    GROUP BY lat, lng;`;
```
* The current sample of the map looks like this:

<img src="https://github.com/leeallennyc/data-structures-fall-2020/blob/master/final_app_demo/images/AA_starterMap.png" alt="Map" title="Map" width=80% height=80% />

 
#### Final Assignment 2 (Process Blog)
* For the Process blog, I input my credentials from [week 5](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week5/wa05_b.js)
* Adapting the params of the query for the blog, I input the following:
```js
var params = {
    TableName : "processblog",
    KeyConditionExpression: '#uid = :userIdName AND begins_with (entry_date_id, :entryDateVal)',
    // :minDate and :maxDate"
    ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
        "#uid" : "user_id",
    },
    ExpressionAttributeValues: { // the query values
        ":userIdName": {S: "LK_11"},
        ":entryDateVal": {S: "November 10"},
        // ":tag": {S:"Business Processes"},
        // ":dayOfEntry": {S: "October 10 2020"},
        // ":minDate": {N: new Date("October 6, 2020").valueOf().toString()},
        // ":maxDate": {N: new Date("October 8, 2020").valueOf().toString()}
    }
};
```
* Next, I modified the [pb.txt](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/final_app_demo/templates/pb.txt) file.
```js
var myTable = '<table><thead><tr><th>User</th><th>Date of Entry</th><th>Entry</th></tr></thead><tbody>';

for (var i=0; i < data.length; i++) {
	myTable += '<tr>';
	myTable += '<td>' + data[i].user_id.S + '</td>';
	myTable += '<td>' + data[i].dayOfEntry.S + '</td>';
	myTable += '<td>' + data[i].entry.S + '</td>';
	myTable += '</tr>';
}

```
* The output from the table and returned information from DynamoDB.

<img src="https://github.com/leeallennyc/data-structures-fall-2020/blob/master/final_app_demo/images/Starter_Journal.png" alt="Journal" title="Journal" width=80% height=80% />

* After cleaning up the files, and incorporating CSS grid, also updated the queries for calling back differnt User_Ids and month.
```js
app.get('/processblog', function(req, res) {
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-1";
    console.log(req.query.type);
    var topic = "LK_10";
    if (["LK_06","LK_08","LK_09","LK_10","LK_11","LK_12"].includes(req.query.type)) {
        topic = req.query.type;
}
```

<img src="https://github.com/leeallennyc/data-structures-fall-2020/blob/master/final_app_demo/images/PB_DS_Project2_wo.png" alt="Journal" title="Journal" width=80% height=80% />
* and Updated UUIDs to designate and track duplicates for future entry tracking and filter. 

<img src="https://github.com/leeallennyc/data-structures-fall-2020/blob/master/final_app_demo/images/PB_DS_Project2.png" alt="Journal" title="Journal" width=80% height=80% />


#### Final Assignment 3 (IoT Temperature Sensor Data)
* For Final Assignment 3, I first began to make edits to the [sensor.txt file](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/final_app_demo/templates/sensor.txt)
* First order of business was to change the `var formatPercent` to `var formatNumber = d3.format(".1f");` to get the appropriate response back for formatting numbers.
* Next was to incorporate the proper tick format on the Y axis:
```js

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(10)
    .tickFormat(function(d){
        return d+"F";
    }); 
```
* Once those were achieved, I made small changes to the styling and changed the text format to Degrees Fahrenheit. I will continue to work on adapting the query to incorporate outdoor temperature:
```js
  // SQL query 
    var q = `SELECT EXTRACT(DAY FROM sensorTime) as sensorday,
             AVG(sensorValue::int) as num_obs
             FROM sensorData
             GROUP BY sensorday
             ORDER BY sensorday;`;
```
* Current state:

<img src="https://github.com/leeallennyc/data-structures-fall-2020/blob/master/final_app_demo/images/Sensor_Starter.png" alt="Sensor" title="Sensor" width=80% height=80% />


### Observations & Learnings
* More time is necessary to better understand the SQL queries in Postgres.
* Additional sketches may be needed for the schema design in all Projects.
---
### Challenges / Opportunities Next Steps
* These are sketches for the final. More to come. 


