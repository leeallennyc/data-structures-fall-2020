var express = require('express'), 
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');
const moment = require('moment');
const momentTimeZone = require('moment-timezone');
const handlebars = require('handlebars');
var fs = require('fs');
const querystring = require('querystring');
const dotenv = require('dotenv');
dotenv.config();

const indexSource = fs.readFileSync("templates/sensor.html").toString();
var template = handlebars.compile(indexSource, { strict: true });

const pbSource = fs.readFileSync("templates/pb.html").toString();
var pbtemplate = handlebars.compile(pbSource, { strict: true });

// AWS RDS credentials
var db_credentials = new Object();
db_credentials.user = process.env.AWSRDS_UN;
db_credentials.host = process.env.AWSRDS_HT; 
db_credentials.database = process.env.AWSRDS_DB;
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// create templates
var hx = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AA Meetings</title>
  <meta name="description" content="AA Meetings in Manhattan">
  <meta name="author" content="AA">
  <link rel="stylesheet" href="css/styles.css?v=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
       integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
       crossorigin=""/>
</head>
<body>
<div id="mapid">
    <div class="card-container">
        <div> 
            <button onclick="updateMeetingDetails()">Change Paragraph</button></br>
            AA MEETINGS IN NYC
            <li id = "meetings-content">
            Details go here
            </p>
        </div>
    </div>
</div>
<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>
  <script>
  var data = 
  `;
  
var jx = `;
    var mymap = L.map('mapid').setView([40.734636,-73.994997], 15);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1Ijoidm9ucmFtc3kiLCJhIjoiY2pveGF1MmxoMjZnazNwbW8ya2dsZTRtNyJ9.mJ1kRVrVnwTFNdoKlQu_Cw'
    }).addTo(mymap);
    
    for (var x=0; x<data.length; x++) {
        
        let transformedData = data[x].meetings;
        console.log(transformedData);
        let dayofWeek = transformedData[0].day;
        let meetingStart = transformedData[0].startTime;
        let meetingEnd = transformedData[0].endTime;
        let place = transformedData[0].buildingname;
        let addy = transformedData[0].address;
       
        let meetingtimeString = "On " + dayofWeek + " Starting @ " + meetingStart + " and ending @ " + meetingEnd + " You can find us @ " + place + " " + addy;
        console.log(meetingtimeString);
        
        
        let newMeeting = L.marker( [data[x].lat, data[x].lng] ).bindPopup(meetingtimeString).addTo(mymap);
       
        function updateMeetingDetails() {
        document.getElementById("meetings-content").innerHTML= meetingtimeString;
        }

    }
    
   
   

    </script>
    </body>
    </html>`;


app.get('/', function(req, res) {
    res.send('<h3>Code demo site</h3><ul><li><a href="/aa">aa meetings</a></li><li><a href="/temperature">temp sensor</a></li><li><a href="/processblog">process blog</a></li></ul>');
}); 

// respond to requests for /aa
app.get('/aa', function(req, res) {
    
     // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    var now = moment.tz(Date.now(), "America/New_York");
    
    // let nownow = moment();
    // console.log(nownow.format("LTS"));

    // console.log(now);
    var indexDay = now.day();
    // console.log(indexDay);
    
    // var dayy = now.day().toString();
    // var hourr = now.hour().toString(); 
    var days = [
        'Mondays', 
        'Tuesdays', 
        'Wednesdays', 
        'Thursdays', 
        'Fridays', 
        'Saturdays', 
        'Sundays'];
        
    var currentDay = days[indexDay -1].toString();
    // console.log(_currentDay);
    var today = "'" + currentDay + "'";
    // console.log(today);
  
   
    // With gratitude for the help of Zhibang Jiang with the SQL query. Was stuck on the INNER JOIN and ORDER BY part.          
    var thisQuery = `SELECT aalocations.meetingID, lat, lng, day, address, zipcode, buildingname,
                    json_agg(json_build_object('day', day, 'startTime', startTime, 'endTime', endTime, 'buildingname', buildingname, 'address', address, 'meetingType', meetingType)) as meetings 
                    FROM aalocations
                    INNER JOIN aatimeLists USING(meetingID)
                    WHERE aatimeLists.day = ` + today +
                    `GROUP BY lat, lng, day, meetingID, address, zipcode, buildingname
                    ORDER BY meetingID;`;

    client.query(thisQuery, (qerr, qres) => {
        console.log(thisQuery);
        if (qerr) { throw qerr }
        
        else {
            var resp = hx + JSON.stringify(qres.rows) + jx;
            console.log(resp);
            res.send(resp);
            client.end();
            console.log('2) responded to request for aa meeting data');
        }
    });
});

app.get('/temperature', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query 
    var q = `SELECT EXTRACT(DAY FROM sensorTime) as sensorday,
             AVG(sensorValue::int) as num_obs
             FROM sensorData
             GROUP BY sensorday
             ORDER BY sensorday;`;

    client.connect();
    client.query(q, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            res.end(template({ sensordata: JSON.stringify(qres.rows)}));
            client.end();
            console.log('1) responded to request for sensor graph');
        }
    });
}); 

app.get('/processblog', function(req, res) {
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-1";
    console.log(req.query.type);
    var topic = "LK_10";
    if (["LK_06","LK_08","LK_09","LK_10","LK_11","LK_12"].includes(req.query.type)) {
        topic = req.query.type;
}
    
    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();

    // DynamoDB (NoSQL) query
    var params = {
    TableName : "processblog",
    KeyConditionExpression: '#uid = :userIdName',
    // AND begins_with (entry_date_id, :entryDateVal)'
    // :minDate and :maxDate"
    ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
        "#uid" : "user_id",
    },
    ExpressionAttributeValues: { // the query values
        ":userIdName": {S: topic},
        // ":entryDateVal": {S: "November 10"},
        // ":tag": {S:"Business Processes"}
        // ":dayOfEntry": {S: "October 10 2020"},
        // ":minDate": {N: new Date("October 6, 2020").valueOf().toString()},
        // ":maxDate": {N: new Date("October 8, 2020").valueOf().toString()}
    }
};

    dynamodb.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            throw (err);
        }
        else {
            console.log(data.Items)
            res.end(pbtemplate({ pbdata: JSON.stringify(data.Items)}));
            console.log('3) responded to request for process blog data');
        }
    });
});

// serve static files in /public
app.use(express.static('public'));

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// listen on port 8080
var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log('Server listening...');
});