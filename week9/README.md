# Weekly Assignment 9
---

Assignment 9 Details: [Week 9](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week9/week9_assignment.md) 

## Summary:
The purpose of this assignment was to create a new table for our sensor data and begin writing values to it at a frequency of **at least once every five minutes** (but no more than twice per minute). 
We used the same SQL database as our AA PostgresQL project from [week 4](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week4)
--- 

### Process

#### Step One - [File here](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week9/week9a.js)
* We setup our schema for our PostgresQL table using the following code:

```
javascript 
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
var thisQuery = "CREATE TABLE sensorData ( sensorValue double precision, sensorTime timestamp DEFAULT current_timestamp );";
// var thisQuery = "DROP TABLE sensorData;"

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
```

#### Step Two - [File here](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week9/week9_worker.js)
* Next we are establishing a connection with our database and inserting out temperature readings into the table we created. 
```
javascript

var request = require('request');
const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// PARTICLE PHOTON
var device_id = process.env.PHOTON_ID;
var access_token = process.env.PHOTON_TOKEN;
var particle_variable = 'temp';
// var particle_variable2 = 'humdity';
var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user =  'lee';
db_credentials.host = 'data-structures-2020.ca5ggconoz0d.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port =  5432;


var getAndWriteData = function() {
    
    // Make request to the Particle API to get sensor values
    request(device_url, function(error, response, body) {
        console.log(device_url);
        
        // Store sensor value(s) in a variable
        var sv = JSON.parse(body).result;
        // Here we will split and transform the value
        console.log(sv);
        // let splitStr = sv.split('/');
        
        // Connect to the AWS RDS Postgres database
        const client = new Client(db_credentials);
        client.connect();

        // Construct a SQL statement to insert sensor values into a table
        var thisQuery = "INSERT INTO sensorData VALUES (" + sv + ", DEFAULT);";
        console.log(thisQuery); // for debugging

        // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
};

// write a new row of sensor data every five minutes
setInterval(getAndWriteData, 300000);
```

#### Step Three - [File here](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week9/week9_checks.js)
* Here we check out work and output: 
``` js

const { Client } = require('pg');
const cTable = require('console.table');
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

// Sample SQL statements for checking your work: 
var thisQuery = "SELECT * FROM sensorData;"; // print all values
var secondQuery = "SELECT COUNT (*) FROM sensorData;"; // print the number of rows
var thirdQuery = "SELECT sensorValue, COUNT (*) FROM sensorData GROUP BY sensorValue;"; // print the number of rows for each sensorValue

client.query(thisQuery, (err, res) => {
    
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
});

client.query(secondQuery, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
});

client.query(thirdQuery, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
    client.end();
});

```
* Output from call:

![](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week9/images/week9_readings.png?raw=true)
* Using [PM2 Runtime](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/), we then setup a runtime process in the background and the accompanying ecosystem file.
