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

// forEach method on the meetingSuffixes array
meetingSuffixes.forEach(textSuffix);
function textSuffix(item, index, arr){
    arr[index] = item
}

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
    
// Outputs each element in the htmlPage array
htmlPages.forEach(htmlURL)
function htmlURL(item, index, arr){
    arr[index] = item
}

// The for loop requests each htmlURL in the htmlPages array
// Then writeFileSyncs each html body output of the html Pages to a text file in the data folder
// Will consider using Async in the next version.

// Needs to be Refactored
for(let i=0; i< meetingSuffixes.length; i++){
    request(htmlPages[i], function(error, response, body){
    if(!error && response.statusCode == 200) {
        fs.writeFileSync(meetingSuffixes[i], body);
    }
    else {console.log("Request failed")}
    });
}


////////////////////////////////////////////
//  Assignment 1 Week 1
///////////////////////////////////////////

// Using Node.js (in Cloud 9), make a request for each of the ten "Meeting List Agenda" pages for Manhattan. Important: show the code for all ten requests.

// https://parsons.nyc/aa/m01.html  
// https://parsons.nyc/aa/m02.html  
// https://parsons.nyc/aa/m03.html  
// https://parsons.nyc/aa/m04.html  
// https://parsons.nyc/aa/m05.html  
// https://parsons.nyc/aa/m06.html  
// https://parsons.nyc/aa/m07.html  
// https://parsons.nyc/aa/m08.html  
// https://parsons.nyc/aa/m09.html  
// https://parsons.nyc/aa/m10.html   

// Using Node.js: For each of the ten files you requested, save the body as a text file to your "local" environment (in AWS Cloud9).

// Study the HTML structure and tags and begin to think about how you might parse these files to extract relevant data for these AA meetings.

// Update your GitHub repository with the relevant files: your js file and ten txt files, plus a md file with your documentation. In Canvas, submit the URL of the specific location of this work within your data-structures GitHub repository.