# Weekly Assignment 7 
---

Assignment 7 Details: [Week 7](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week7/week7_assignment.md) 

## Summary:
The purpose of this assignment was to finish parsing and cleaning the rest of the AA data in all ten Manhattan "zones", and update/replace the data in our Postgres table(s).

--- 

### Process
* We worked in a group of three people to think about the most efficient way to parse and clean the information for all zones. 
* Important factors that we considered where `meeting_address`, `meeting_times`, `meeting_name`, `wheelchair_accessiblity`, `interest_group`, addition to others.

#### Step One 
* Looking back at the code from [week 2](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week2/data/wa02.js), my first attempt was to bring in all the files from all weeks.
* This approach produced a number of problems, so I decided to manually check for the exceptions of each week to better understand where the address errors were happening. 
* My regular expression knowledge was limited after replacing all the white space, so decided to go through each of the errors and use the `.replace()` and `.split()` methods.
* Upon completing this I made a note to move onto the next step, and also come back to this later and refactor the code for more efficiency using an async loop.
* This was the outcome for getting the address data for all ten zones. The problem here currently is that each file is loaded in manually, and it's a mess. 

```js
  value = value.replace(/\s\s+/g, "" )// --> Here we are replacing anything with more than one white space character with a single space using Regex
        .replace('W.', 'West').replace(' W ', 'West').replace('astr', 'ast').replace('west', 'West').replace('EAST', 'East').replace(' E. ', 'East').replace(' E ', 'East').replace('West165th', 'West 165th')
        .replace('rert', 'reet').replace('St.', 'Street').replace('STREET', 'Street').replace('street', 'Street').replace('St Rm 306', 'Street')
        .replace('208West13th', '208 West 13th').replace(' East Union Square', 'Union Square East').replace('10U', '10 U')
        .replace('80 Street', '80 Saint').replace('206-208', '206').replace('122East37TH', '122 East 37th').replace('Church of the Good Shepard', '543 Main Street')
        .replace('337East74th', '337 East 74th').replace('331East70th St', '331 East 70th Street').replace('521West126th St', '521 West 126th Street').replace('58-66', '58')
        .split(' @ ').join(',').split(' - ').join(',').split('- ').join(',').split('-').join(',').split('. ').join(',').split(' (').join(',').split('(').join(',')
        .split(')').join(',').split(' ,').join(',').split(',');
```
#### Step Two
* After getting all the `address` information from all ten zones, the next step was to retrieve all the other important data that we will end up querying on for the final assignment. 
* Our group each came back with some insights related to this next step. Zhibang contributed the base code and we adapted it with the exceptions. The code is still difficult to read so we are considering creating a separate JSON file for all exceptions.
* Also the challenge is here is that each file is still created manually. We will need to fix the exceptions and also create a directory to read the files from and into. 
```js
var fs = require('fs');
var cheerio = require('cheerio');

//  load the m06.txt file into a variable, 'content'
var content = fs.readFileSync('data/m10.html', 'utf8');

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
fs.writeFileSync('locationList_zone10.json', JSON.stringify(locationList));

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
fs.writeFileSync('timeList_zone010.json', JSON.stringify(timeList));

```
#### Step Three
* We still had a few parsing errors at this stage, mostly in the locationList files for each Zone. Will need to go back and finish all the cleaning.  
* Two JSON files were created for different tables: `Location List` and `Time List`. They were put in these folders: [Location List](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week7/data/locationLists), [Time List](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week7/data/timeList)
* JSON files were then completed for all [10 Zones](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week7/data/Addresses_Lat_Long) using the code from week 3.
* I ended up feeding each one of the files into the week3 [code](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week3/data/wa03.js) and placed them in the [completed_addresses folder](https://github.com/leeallennyc/data-structures-fall-2020/tree/master/week3/data/complete_addresses)


#### Step Four (to come)
* Preparing all the JSON for different tables, and loading the JSON files into our Postgres DB using SQL.




### Observations & Learnings
* 


---
### Challenges / Opportunities
* 

### Additional / Readings for the week
* Gitelman, Chapter 7