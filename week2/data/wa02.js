////////////////////////////////////////////
//  Assignment 2 Week 2
///////////////////////////////////////////

// Found Here: https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_02.md

// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

//  load the m06.txt file into a variable, 'content'
var content = fs.readFileSync('m06.html', 'utf8');

//  load `content` into a cheerio object
var $ = cheerio.load(content);

// This array will hold the output of value that is defined in the loops below
var streetAddressArray = [];

// Grab and loop through each 'h4' element
$('h4').slice(2).each(function(i, elem) {
    let value = '';
    $(elem.parent).contents() // --> Here we are grabbing the parent of the h4 and contents() which grabs comments and text nodes
    .each(function (i, htmlNode) {
        if (htmlNode.type === "text") { // --> For each of these nodes that match "text" as a nodeType we add the data to value
        value += value + htmlNode.data;
        }
    });
    value = value.replace(/\s\s+/g, "" ) // --> Here we are replacing anything with more than one white space character with a single space using Regex
        .split(' - ').join(',') // --> Splitting on hypen and joining on ","
        .split('. ').join(',') // --> Resplitting on ". " and rejoining on ","
        .split(','); // resplitting on ","

    streetAddressArray.push(value[0]); // --> pushing 0 index of value to the empty array.
}); 
// Write the file
fs.writeFileSync('streetAddresses.txt', streetAddressArray);