////////////////////////////////////////////
//  Assignment 7 Week 7
///////////////////////////////////////////

// Found Here: https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week7/week7_assignment.md

// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

//  load the m06.txt file into a variable, 'content'
var content = fs.readFileSync('data/html_txt/m06.html', 'utf8');

//  load `content` into a cheerio object
var $ = cheerio.load(content);

var locationList = [];
    $('tbody tbody tbody tr').each(function(i, elem){
        // MeetingID
        var meetingID = $(elem).find('a').eq(0).attr('href').split('=')[1]
        // Building Name
        var buildingName = $(elem).find('h4').eq(0).text()
                    .split('\'').join('')
                    .replace('Cernter', 'Center')
        // Meeting Name'
        var meetingName = $(elem).find('b').eq(0).text();
        // Street, Room and Floor
        var _address = $(elem).find('b')[0].nextSibling.nextSibling
        
        var address = $(_address).text().split(',')[0].split(/-|Rm/)[0].replace(/\s\s+/g, "" )
                    .replace('W.', 'West').replace(' W ', 'West').replace('astr', 'ast').replace('west', 'West').replace('EAST', 'East').replace(' E. ', 'East').replace(' E ', 'East').replace('West165th', 'West 165th')
                    .replace('rert', 'reet').replace('St.', 'Street').replace('STREET', 'Street').replace('street', 'Street').replace('St Rm 306', 'Street').replace('Street,Red Door', 'Street')
                    .replace('208West13th', '208 West 13th').replace(' East Union Square', 'Union Square East').replace('10U', '10 U')
                    .replace('80 Street', '80 Saint').replace('206-208', '206').replace('122East37TH', '122 East 37th').replace('Church of the Good Shepard', '543 Main Street')
                    .replace('337East74th', '337 East 74th').replace('331East70th St', '331 East 70th Street').replace('521West126th St', '521 West 126th Street').replace('58-66', '58')
                    .split(' @ ').join(',').split(' - ').join(',').split('- ').join(',').split('-').join(',').split('. ').join(',').split(' (').join(',').split('(').join(',')
                    .split(')').join(',').split(' ,').join(',').split(',').toString();
        
        var roomFloor = $(_address).text().split(/,| - /).slice(1).toString()
                        .replace(/\b\d{5}\b/g,'').replace(/FL.|Floor/,'Fl').replace('Fl','Floor')
                        .replace(/,/g,'').replace('.','').replace('(Room','Room').trim();
         
        //Zipcode
        let zipCode = $(elem).html().trim().match(/\b\d{5}\b/g);
    
        // DetailsBox
        var detailsBox = $(elem).find('div').eq(0).text().trim()
                        .replace('*', '')
                        .split('\'').join('')
        
        // Accessible Facility
        var wheelChair;
        
        if ($(elem).html().includes('span')){
            wheelChair = true;
        } else {
            wheelChair = false;
        };
        
        var meetingLocation = {
            meetingID: meetingID,
            streetAddress: address,
            buildingName: buildingName,
            wheelChairAccess: wheelChair,
            roomFloor: roomFloor,
            city: "New York",
            state: "NY",
            zipCode: `${zipCode}`,
            detailsBox: detailsBox,
        };
        
        locationList.push(meetingLocation);
    });

// console.log(locationList);
fs.writeFileSync('data/locationLists/locationList_zone06.json', JSON.stringify(locationList));

var timeList = [];

    $('tbody tbody tbody tr').each(function(i, elem){
        
        // MeetingID
        var meetingID = $(elem).find('a').eq(0).attr('href').split('=')[1]
        
        // Transfer the html content in the second <td> in each tr to an array
        var allString = $(elem).find('td').eq(1).html().trim();
        var _timeArray = allString.split(/<br>\s*<br>/).toString().trim().replace(/Gay,/g,'Gay').split(',');
        // Remove the last empty entry in array
        var timeArray = _timeArray.filter(function(val){return val!==''});
        
        $(timeArray).each(function(i, eachInfo){
            
            var eachInfo_htmltags = $(eachInfo).toString().trim();
            var eachInfo_notags = $(eachInfo).text().trim();
            
                // Day of the week
                var day = eachInfo_notags.split('From')[0].trim();
                    // !!I have no idea that how to skip the outlier entry in each function
    
                // Start Time
                var startTime = eachInfo_notags.split('From')[1].split('to')[0].trim();
        
                // End Time
                var endTime = eachInfo_htmltags.split('<b>to</b>')[1].split('<br><b>')[0].trim();
                
                // Meeting Type
                if (eachInfo_notags.includes('=')) {
                    var _type = eachInfo_notags.split('=')[1].trim();
                        
                        if (_type.includes('Special Interest')) {
                            var type = _type.split('Special Interest')[0].trim();
                        } else {
                            var type = _type
                        }
                    
                } else {
                    var type = 'N/A'
                }
                
                // Special Interest
                if (eachInfo_notags.includes('Special Interest')){
                    var _interest = eachInfo_notags.split('Special Interest')[1].trim();
                    var interest = _interest.replace(/Gay/g,'Gay,');
                } else {
                    var interest = 'N/A'
                }
                
            var eachTime = {
                meetingID: meetingID,
                day: day,
                startTime: startTime,
                endTime: endTime,
                meetingType: type,
                specialInterest: interest,
            };
            timeList.push(eachTime);
        });
    });
// console.log(timeList);
fs.writeFileSync('data/timeList/timeList_zone06.json', JSON.stringify(timeList));
