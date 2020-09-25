##  Week 2 Assignment
---
Assignment 2 Detailed Description: [Here](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week1/week2_assignment.md)

Weekly Assignment 2, due Tuesday 9/15 at 6:00pm:
You will parse one of the HTML files you saved last week and log essential data to the console.

Documentation:
[Node cheerio module](https://www.npmjs.com/package/cheerio)
[Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
--- 
### Process

* The approach was to find the parent of the `h4` tags and not grab extra content from all the `td` tags.
* After getting parents of the `h4` ,the approach I took was to only get back the results that matched the `text` NodeTypes.
* From there I parsed and split the data, and output it to the empty array.
* After experimenting with the Cheerio method: contents(), I realized that there were hidden characters that might be helpful in parsing. Specifically the Tab keys, extra spaces, and "@" symbol.
* Looking closely at the syntax, I observed that the addresses which needed to be parsed had a common pattern of UPPERCASE characters followed by `"-"` and `'\n\t\t\t\t\t\t'` + the number of the street "152 West 71st" followed by comma. 
* ![alt text](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week2/images/All%20Caps%20Preview.png "Tabs and New Line")
* ![alt text](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week2/images/Tabs%202.png "Tabs and New Line")
* After trying to match the `'\n\t\t\t\t\t\t'` with Regex (and failing miserably), I decided that it might be better to get rid of all extra whitespaces first. 
* The regex syntax I found was `/\s\s+/g` and could help deal with the whitespace issue.  
* Finalized the project by cleaning up the parsing using `.slice(2)` on the first `<h4>` tags, and splitting and rejoining on the ` " - " ` and `". "`.
* Output was much cleaner: 
* ![alt text](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week2/images/final%20array.png "Final Output")
 
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
* I wasn't able to completely solve the problem, in the allotted time, but solved it soon after.
* Mostly, these issues are around splitting, rejoining, and splitting again on multiple characters. 
---
### Additional / Readings for the week
* Gitelman Chapter 5
* Hills, Chapter 10, 11, 12
* [Javascript Data types and structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
* [Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
