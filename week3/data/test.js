const fs = require('fs');

const myArray = ["One","Two","Three","Four"];

// The dataIn from myArray is converted to a string for FileSync
var dataIn = fs.writeFileSync('test.json', JSON.stringify(myArray)); // this needs to be converted through Stringify first

var dataOut = JSON.parse(fs.readFileSync('test.json', 'utf-8')) // converted back to JSON through Parse
console.log(dataOut);




