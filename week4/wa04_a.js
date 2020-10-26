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
/////////////////////////
// Creating the tables:
////////////////////////
var thisLocationsQuery = "CREATE TABLE aalocations (meetingID integer, address varchar(120), city varchar(120), state varchar(2), zipCode varchar(20), lat double precision, lng double precision, buildingName varchar(200), wheelChairAccess boolean, roomFloor varchar(120), detailsBox varchar(250));";
var thisTimeListQuery = "CREATE TABLE aatimeLists (meetingID integer, day varchar(120), startTime time, endTime time, meetingType varchar(120), specialInterest varchar(255));";

client.query(thisLocationsQuery, (err, res) => {
    console.log(err, res);
    // client.end();
});

client.query(thisTimeListQuery, (err, res) => {
    console.log(err, res);
    client.end();
});

//////////////////////////
//Dropping the tables
//////////////////////////
var dropThisLocationsQuery = "DROP TABLE aalocations;";
var dropThisTimeListTable =  "DROP TABLE aatimeLists;";

client.query(dropThisLocationsQuery, (err, res) => {
    console.log(err, res);
    client.end();
});

client.query(dropThisTimeListTable, (err, res) => {
    console.log(err, res);
    client.end();
});