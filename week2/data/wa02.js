////////////////////////////////////////////
//  Assignment 2 Week 2
///////////////////////////////////////////

// Found Here: https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week2/week2_assignment.md

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
    // Exceptions for all Zones and cleaning.
    value = value.replace(/\s\s+/g, "" )// --> Here we are replacing anything with more than one white space character with a single space using Regex
        .replace('W.', 'West').replace(' W ', 'West').replace('astr', 'ast').replace('west', 'West').replace('EAST', 'East').replace(' E. ', 'East').replace(' E ', 'East').replace('West165th', 'West 165th')
        .replace('rert', 'reet').replace('St.', 'Street').replace('STREET', 'Street').replace('street', 'Street').replace('St Rm 306', 'Street')
        .replace('208West13th', '208 West 13th').replace(' East Union Square', 'Union Square East').replace('10U', '10 U')
        .replace('80 Street', '80 Saint').replace('206-208', '206').replace('122East37TH', '122 East 37th').replace('Church of the Good Shepard', '543 Main Street')
        .replace('337East74th', '337 East 74th').replace('331East70th St', '331 East 70th Street').replace('521West126th St', '521 West 126th Street').replace('58-66', '58')
        .split(' @ ').join(',').split(' - ').join(',').split('- ').join(',').split('-').join(',').split('. ').join(',').split(' (').join(',').split('(').join(',')
        .split(')').join(',').split(' ,').join(',').split(',');

    streetAddressArray.push(value[0]); // --> pushing 0 index of value to the empty array.
}); 

console.log(JSON.stringify(streetAddressArray));
// Write the file
// fs.writeFileSync('streetAddresses_zone010.txt', JSON.stringify(streetAddressArray));