////////////////////////////////////////////
//  Assignment 1 Week 1
///////////////////////////////////////////

// Found Here: https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_01.md

// npm install request
// mkdir data
var request = require('request');
var fs = require('fs');

// Create an array of the meeting suffixes for the writeFile method
var meetingSuffixes = [
    'm01.txt',
    'm02.txt',
    'm03.txt',
    'm04.txt',
    'm05.txt',
    'm06.txt',
    'm07.txt',
    'm08.txt',
    'm09.txt',
    'm10.txt'
    ];
    
// Create htmlPage Array
var htmlPages = [
    'https://parsons.nyc./aa/m01.html',
    'https://parsons.nyc./aa/m02.html',
    'https://parsons.nyc./aa/m03.html',
    'https://parsons.nyc./aa/m04.html',
    'https://parsons.nyc./aa/m05.html',
    'https://parsons.nyc./aa/m06.html',
    'https://parsons.nyc./aa/m07.html',
    'https://parsons.nyc./aa/m08.html',
    'https://parsons.nyc./aa/m09.html',
    'https://parsons.nyc./aa/m10.html',
    ];

// Outputs each element in the meetingSuffixes array
let textSuffix = (item, index, arr) => {
    meetingSuffixes.forEach(textSuffix);
    arr[index] = item;
}

// Outputs each element in the htmlPage array
let htmlURL = (item, index, arr) => {
    htmlPages.forEach(htmlURL)
    arr[index] = item;
}

// The for loop requests each htmlURL in the htmlPages array,
// Then writeFileSyncs each html body output of the html Pages to a text file in the data folder
// Will consider using Async in the next version, and work on refactoring.
for(let i=0; i< meetingSuffixes.length; i++){
    request(htmlPages[i], function(error, response, body){
    if(!error && response.statusCode == 200) {
        fs.writeFileSync(meetingSuffixes[i], body);
    }
    else {console.log("Request failed")}
    });
}  