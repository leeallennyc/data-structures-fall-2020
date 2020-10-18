# Weekly Assignment 7 
---

Assignment 7 Details: [Week 7](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week7/week7_assignment.md) 

## Summary:
The purpose of this assignment was to finish parsing and cleaning the rest of the AA data in all ten Manhattan "zones", and update/replace the data in our Postgres table(s).

--- 

### Process
* We worked in small groups to think about the most efficient way to parse and clean the information for all zones. Important factors that we considered where `meeting_address`, `meeting_times`, `meeting_name`, `wheelchair_accessiblity`, `interest_group`

#### Step One 
* Looking back at code from [week 2](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week2/data/wa02.js), first tried to bring in all the html files from all weeks.
* This approach produced a number of problems, so I decided to manually check for the exceptions of each week to better understand where the address errors were happening. 
* I had a number of problems with regular expressions after replacing all the white space, so decided to go through each of the errors and use the `.replace()` and `.split()` methods.
* After this completed I made a note to move onto the next step, and also come back to this to later refactor and make the code more efficient with looping. 

```js
  value = value.replace(/\s\s+/g, "" )// --> Here we are replacing anything with more than one white space character with a single space using Regex
        .replace('W.', 'West')
        .replace(' W ', 'West')
        .replace('astr', 'ast')
        .replace('rert', 'reet')
        .replace('208West13th', '208 West 13th')
        .replace('St.', 'Street')
        .replace(' East Union Square', 'Union Square East')
        .replace('10U', '10 U')
        .replace('80 Street', '80 Saint')
        .replace('206-208', '206')
        .replace('St Rm 306', 'Street')
        .replace('EAST', 'East')
        .replace('STREET', 'Street')
        .replace('west', 'West')
        .replace('street', 'Street')
        .replace(' E ', 'East')
        .replace(' E. ', 'East')
        .replace('122East37TH', '122 East 37th')
        .replace('Church of the Good Shepard', '543 Main Street')
        .replace('337East74th', '337 East 74th')
        .replace('331East70th St', '331 East 70th Street')
        .replace('521West126th St', '521 West 126th Street')
        .replace('58-66', '58')
        .replace('West165th', 'West 165th')
        .split(' @ ').join(',')
        .split(' - ').join(',')
        .split('- ').join(',')
        .split('-').join(',')
        .split('. ').join(',')
        .split(' (').join(',')
        .split('(').join(',')
        .split(')').join(',') 
        .split(' ,').join(',')
        .split(','); // resplitting on ","
```
#### Step Two
* After getting all the `address` information from all ten zones, the next step was to retrieve all the other important data that we will end up querying on for the final assignment. 
* Our group each came back with some insights related to this next step.
* 



### Observations & Learnings
* 

---
### Challenges / Opportunities
* 

### Additional / Readings for the week
* Gitelman, Chapter 7