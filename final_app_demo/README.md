# Final App Demo 
---
Final App Demo Details: [Final Demo App](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/final_app_demo) 

## Summary:
The purpose is to provide an overview and summary of work for final assignments 1, 2, and 3. 

--- 

#### Final Assignment 1 (AA Meetings Map) -- Description [here](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/Final_Assignment1/final_assignment_1.md) 

* This assignment is a culmination of work from [week 1](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week1), [week 2](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week2), [week 3](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week3), [week 4](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week4), [week 6](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week6), [week 7](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week7), [week 10](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week10), and [week 11](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/final_app_demo). 
* Our goal was to re-architect an Alcoholics Anonymous map based application, from scraping `.txt` and `.html` files, cleaning and reorganizing to JSON format, and inserting our data into a PostgreSQL database. Details from each week are included above, this represents a high level overview of where the project currently is.  

* In its current state, the app doesn't account for connect the backend and frontend interface beyond CSS grid. Functionality will be updated in the future to account for user interaction. 

* For the below view of the AA Map, I changed the sample query to one where I could test a few locations above a certain latitude:
```js
 var thisQuery = `SELECT lat, lng, json_agg(json_build_object('loc', buildingName, 'address', address, 'zipcode', zipcode)) as meetings 
                    FROM aalocations 
                    WHERE address LIKE '%96th%' OR lat > 40.801
                    GROUP BY lat, lng;`;
```

* The challenge currently is to bridge the database queries with the frontend in Leaflet.js -- so the result will be dynamic for user input.
* I will continue working on this connection -- by using either an AJAX request, AWS lambda function, or Amazon API Gateway, or other process--still researching.  

<img src="https://github.com/leeallennyc/data-structures-fall-2020/blob/master/final_app_demo/images/AA_starterMap.png" alt="Map" title="Map" width=80% height=80% />


* This below view has the updated SQL query to bring in Location details and time details for each meeting on the day the app is open. Establishing an opacity layer for interaction with CSS Grid. The idea is to be able to populate the other meetings happening on that day in the left hand grid.

<img src="https://github.com/leeallennyc/data-structures-fall-2020/blob/master/final_app_demo/images/AA_map_search.png" alt="Map" title="Map" width=80% height=80% />

---

#### Final Assignment 2 (Process Blog) -- Description [here](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/Final_Assignment2/final_assignment_2.md) 

* The process blog is a culmination of work from [week5](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week5), [week6](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week6), [week7](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week7), [week8](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week8), [week10](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week10), and [week11](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/final_app_demo)
* Our goal was to establish blog entry, and input those entries into a [DynamoDB database on AWS](https://aws.amazon.com/dynamodb/). 
* After adapting the params from [week 5](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week5/wa05_b.js), I worked to create a frontend view to place this data in:
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

* Cleaning up the files, incorporating CSS grid, also updated the queries for calling back different userid's and month. [pb.txt](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/final_app_demo/templates/pb.txt).
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
```js
var data = {{{pbdata}}} ; 

var myGrid = '<div class="grid-container"><div>User</div><div>Entry Date</div><div>Title</div><div>Entry</div><div>Tag</div><div>Unique ID</div>';

for (var i=0; i < data.length; i++) {
	myGrid += '<div id = "item1">' + data[i].user_id.S + '</div>';
	myGrid += '<div id = "item2">' + data[i].dayOfEntry.S + '</div>';
	myGrid += '<div id = "item3">' + data[i].title.S + '</div>';
	myGrid += '<div id = "item4">' + data[i].entry.S + '</div>';
	myGrid += '<div id = "item5">' + data[i].tag.S + '</div>';
	myGrid += '<div id = "item6">' + data[i].unique_id.S + '</div>';
}

myGrid += '</div>'

$(window).on('load', function() {
  $("#myEntries").html(myGrid)
});

```
* A work in progress. The output from the table and returned data from DynamoDB -- adding a UUID column for future filtering:
* At the moment the URL query statement `?type=LK_10` represents the Primary key, which is the user and the month of entry. This query would return all the entries from "LK" in the month of October.
* The primary key serves as a simple dual function to find the Author of the entry and the month:

<img src="https://github.com/leeallennyc/data-structures-fall-2020/blob/master/final_app_demo/images/Maintainability_UUIDs.png" alt="Journal" title="Journal" width=80% height=80% />
<img src="https://github.com/leeallennyc/data-structures-fall-2020/blob/master/final_app_demo/images/Journal.png" alt="Journal" title="Journal" width=80% height=80% />

* Additional work will be added in future iterations. 

---

#### Final Assignment 3 (IoT Temperature Sensor Data) -- Description [here](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/Final_Assignment3/final_assignment_3.md) 
* Final Assignment was a culmination of work from [week 8](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week8), [week9](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week9), [week11](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/final_app_demo), and [week12](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/final_app_demo)
* The purpose of this project was to connect an IoT temperature sensor, and send the values to our AWS PostgreSQL Database, which we setup for Project 1, then filter and visualize the data on the frontend using D3.js.
* After incorporating a number of changes to the template [sensor.txt file](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/final_app_demo/templates/sensor.txt), I was able able to create an a representation of the data as a series of small bars representing the avg temperature for the last 30 days.
* My next goal is to create comparision range of outdoor temperatures for the same period, as designed for in [week 10](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week10/images/Temperature_sensing_Sketch.png). 

* Changing the format to Fahrenheit:
```js

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(10)
    .tickFormat(function(d){
        return d+"F";
    }); 
```
* Query to extract average temperatures:

```js
  // SQL query 
    var q = `SELECT EXTRACT(DAY FROM sensorTime) as sensorday,
             AVG(sensorValue::int) as num_obs
             FROM sensorData
             GROUP BY sensorday
             ORDER BY sensorday;`;
```
* Current state of the visualization is below, I intend to incorporate user input for dynamic view in futures iterations. 

<img src="https://github.com/leeallennyc/data-structures-fall-2020/blob/master/final_app_demo/images/Sensor_temp.png" alt="Sensor" title="Sensor" width=80% height=80%/>

---

### Observations & Learnings & Opportunities
* The endpoint integration and connecting the front and backends was the biggest challenge / material.  
* An additional week or so for understanding how AWS lambda, and API endpoints, or possibly using AJAX requests to integrate would have been tremendously helpful to finalize the project. 
* I will plan to continue working on this integration piece after the semester is over, and update my documentation accordingly.


 