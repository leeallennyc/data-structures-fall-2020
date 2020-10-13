
// npm install aws-sdk
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

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

dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});
