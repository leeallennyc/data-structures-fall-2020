# Final App Demo 
---
Final App Demo Details: [Final Demo App](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/final_app_demo) 

## Summary:
The purpose of this assignment was to provide a foundation for final assignment 1, 2, and 3. 

--- 
### Process

#### Final Assignment 1 (AA Meetings Map)
* 
 
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
* The output from the table and returned information from DynamoDB:
![](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/final_app_demo/images/Dynamo_table.png?raw=true)


#### Final Assignment 3 (IoT Temperature Sensor Data)
* 


### Observations & Learnings
* 
---
### Challenges / Opportunities Next Steps
* 


