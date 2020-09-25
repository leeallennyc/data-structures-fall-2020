##  Week 1 Assignment
---
Assignment 1 Detailed Description: [Here](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week1/week1_assignment.md)

Scope: Using Node.js (in Cloud 9), make a request for each of the ten "Meeting List Agenda" pages for Manhattan. Important: show the code for all ten requests.

```javascript
https://parsons.nyc/aa/m01.html  
https://parsons.nyc/aa/m02.html
https://parsons.nyc/aa/m03.html  
https://parsons.nyc/aa/m04.html 
https://parsons.nyc/aa/m05.html
https://parsons.nyc/aa/m06.html  
https://parsons.nyc/aa/m07.html  
https://parsons.nyc/aa/m08.html  
https://parsons.nyc/aa/m09.html  
https://parsons.nyc/aa/m10.html
```

Using Node.js: For each of the ten files you requested, save the body as a text file to your "local" environment (in AWS Cloud9).

Study the HTML structure and tags and begin to think about how you might parse these files to extract relevant data for these AA meetings.

Update your GitHub repository with the relevant files: your js file and ten txt files, plus a md file with your documentation. In Canvas, submit the URL of the specific location of this work within your data-structures GitHub repository.

* The first step was to create an array of meeting.txt files and an array of the html pages to request:

```js
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

```
* After creating these arrays, by next goal was to create a function which pulled out each element in the arrays.
 
```js
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
```
* Lastly, I created a for loop which makes a request for each element in the html array and synchronously writes the body of the request to a txt file with the suffix. 

```js
for(let i=0; i< meetingSuffixes.length; i++){
    request(htmlPages[i], function(error, response, body){
    if(!error && response.statusCode == 200) {
        fs.writeFileSync(meetingSuffixes[i], body);
    }
    else {console.log("Request failed")}
    });
} 
```
--- 
### Observations and Learnings
* One observation is around the need to refactor my code with arrow function syntax.
* Learning how to be less verbose with my code.
* The need for lots of extra time to experiment. 
 
--- 
### Challenges
* Syncing Across a variety of different tools with Git: Visual Studio Code, AWS Cloud 9, GitHub Desktop, Remote Repos.
* Refactoring is a challenge.
* Will need put time and resources into the idea of Async, Promises, etc.  


