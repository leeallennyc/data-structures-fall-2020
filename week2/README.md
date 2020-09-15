##  Week 2 Assignment
---
Assignment 2 Detailed Description: [Here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_02.md)

Weekly Assignment 2, due Tuesday 9/15 at 6:00pm:
You will parse one of the HTML files you saved last week and log essential data to the console.

Documentation:
[Node cheerio module](https://www.npmjs.com/package/cheerio)
[Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

Instructions:
### Weekly Assignment 2

We will continue to work with the files you collected in Weekly Assignment 1. For this week, you will work with only one of the files; it will be determined by the last number of your New School ID. The last number of your ID corresponds with the AA Manhattan "zone" you are assigned. For example, if your ID is "N01234567", work with the Zone 7 file. If it is "N09876543", work with the Zone 3 file. If the last number of your New School ID ends with a "0", work with the Zone 10 file. (At the bottom of this markdown file, there's an image showing the map of the zones in Manhattan.)

1. Using Node.js, read the assigned AA text file that you wrote for last week's assignment. Store the contents of the file in a variable.

2. Ask yourself, "why are we reading this from a saved text file instead of making another http request?"

3. Study the HTML structure of this file and began to think about how you might parse it to extract the relevant data for each meeting. Using this knowledge about its structure, write a program in Node.js that will write a new text file that contains the street address for **every** row in the table of meetings in your assigned AA file. Make a decision about the [data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) you want to use to store this data in a file, knowing that you'll be working with this data again later. 

4. Update your GitHub repository with the relevant file(s); this should include a `.js` file(s) with your code and a `.txt` or other format file(s) with the addresses, plus a `md` file with your documentation. In Canvas, submit the URL of the specific location of this work within your `data-structures` GitHub repository. **Note: this should be in a directory that contains only your work for this week.** 

## Starter Code  

```javascript
// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('data/thesis.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// print (to the console) names of thesis students
$('h3').each(function(i, elem) {
    console.log($(elem).text());
});

// write the project titles to a text file
var thesisTitles = ''; // this variable will hold the lines of text

$('.project .title').each(function(i, elem) {
    thesisTitles += ($(elem).text()).trim() + '\n';
});

fs.writeFileSync('data/thesisTitles.txt', thesisTitles);
```

---
### Readings for the week - Due at the beginning of the week
* Gitelman Chapter 5
* Hills, Chapter 10, 11, 12
* [Javascript Data types and structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
* [Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
--- 
### Process
* The approach was to find the parent of the <h4> as to not grab extra content from all the <td> tags.
* After getting parents of the <h4> the approach I took was to only get back the results that matched the "text" NodeTypes.
* From there I parsed and split the data, and output it to the empty array.
* After experimenting with the Cheerio method: contents(), I realized that there were hidden characters that might be helpful in parsing. Specifically the Tab keys, extra spaces, and "@" symbol.
* Looking closely at the syntax, I observed that the addresses which needed to be parsed had a common pattern of UPPERCASE characters followed by "-"  and ![alt text](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week2/images/All%20Caps%20Preview.png "Tabs and New Line")'\n\t\t\t\t\t\t' + the number of the street "152 West 71st" followed by comma: example "FRIDAY NIGHT STEP - \n\t\t\t\t\t\t26 West 84th Street,"

* ![alt text](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week2/images/Tabs%202.png "Tabs and New Line")
* After trying to match the '\n\t\t\t\t\t\t' with Regex (and failing miserably), I decided that it might be better to get rid of all extra whitespaces first. 
* The regex syntax I found was /\s\s+/g and could help deal with the whitespace issue.  
 
--- 
### Observations & Learnings
* Need to work on Regex challenges, as this took me quite some time to find.
* Instead of matching space patterns, it may be a better use of time to pull whitespace out to start.
* I learned about the "text" nodeType, and also how the contents() methods will return text and comments.
* This was the most difficult exercise for me by far, considering where my coding skills are regarding parsing.
* I spent close to 20 hours on this problem. 
---
### Challenges
* One of the biggest challenges I encountered was with the order of operations. 
* I wasn't able to completely solve the problem, and I will continue working on it.
* Mostly, these issues are around splitting on mulitple characters, and then joining again.
