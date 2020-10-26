// Setting up Requirements
const { Client } = require('pg');
const cTable = require('console.table');
const dotenv = require('dotenv');
dotenv.config();

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'lee';
db_credentials.host = 'data-structures-2020.ca5ggconoz0d.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to query meetings on Monday that start on or after 7:00pm: 
var thisQuery = "SELECT address, lat, lng FROM aalocations WHERE address LIKE '%96th%' OR lat > 40.801;"

// Returns Addresses for 96th Street or a lat over 40.801
// address                              lat         long       
// -----------------------------------  ----------  -----------
// 207 West 96th Street, New York, NY   40.7945161  -73.9710419
// 207 West 96th Street, New York, NY   40.7945161  -73.9710419
// 221 West 107th Street, New York, NY  40.8017795  -73.9665393
// 207 West 96th Street, New York, NY   40.7945161  -73.9710419
// 601 West 114th Street, New York, NY  40.8069051  -73.965058 
// 207 West 96th Street, New York, NY   40.7945161  -73.9710419
// 218 West 108th Street, New York, NY  40.8021037  -73.9658778
// 207 West 96th Street, New York, NY   40.7945161  -73.9710419
// 207 West 96th Street, New York, NY   40.7945161  -73.9710419
// 207 West 96th Street, New York, NY   40.7945161  -73.9710419
// 207 West 96th Street, New York, NY   40.7945161  -73.9710419
// 207 West 96th Street, New York, NY   40.7945161  -73.9710419
// 207 West 96th Street, New York, NY   40.7945161  -73.9710419

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        console.table(res.rows);
        client.end();
    }
});