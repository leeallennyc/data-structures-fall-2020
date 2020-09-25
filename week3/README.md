# Weekly Assignment 3
---
Assignment 3 Detailed Description: [Here](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week1/week3_assignment.md)

--- 
### Process
* Getting a better understanding of Asynchronous Javascript and API requests/responses was one of the main purposes of this week's exercise.
* I began this exercise by looking more into how the file directories and file paths are served and read using Node.js and the FS module. 
* After I spent a significant amount time trying to understand directories, buffers, streams, and reading about recursive File feeds and Paths, and experimenting with the following code: 
```js
// Directory of files
let directory = "files";
let dirBuf = Buffer.from(directory);

// Async read of directory files
fs.readdir(dirBuf, (err, files)=>{
     if (err) {
        console.log(err.message);
     } else {
         console.log(files);
     }
});

// Writing a new file asynchromously
fs.readFile(filePath, (err,data) => {
     if (err) throw err
     fs.writeFile(newFile, data, (err) => {
     if (err) throw err
         console.log(newFile + ' saved')
     })
});
```

* I realized after going down the abyss of "callback hell" tutorials, that I needed to get back to a simpler version of what was exactly needed to finish the exercise. 
* My approach was first to limit the streetAddress Array to only 10 addresses, so as to not overdue the API rate limits while testing things. 
* Then to figure out how to pass the data of `fs.readFile` to the `async.eachSeries()` method.
* After considerable energy with experimenting, and wanted to solve the issue of multiple files a directory, I came up with the following for loop to address this:

```js
// Used if we have multiple files in the directory to read
var filenames = fs.readdirSync(`${__dirname}/files`); 
// console.log(filenames);

// This forloop goes through each filename in the files directory and reads each file and return its contents.
for (let i = 0; i<filenames.length; i++){
    var addresses = JSON.parse(fs.readFileSync(`${__dirname}/files/${filenames[i]}`));

```  
 * The next struggle was to understand how to transform the data coming back from the API call, and only pulling out the necessary Lat and Long data. After lots of issues, I came up with the following code to address putting those values in a schema:

```js
var finalOutput =
    {
        "address": value,
        "latLong":{
                "lat":tamuGeo.OutputGeocodes[0].OutputGeocode.Latitude,
                "lng":tamuGeo.OutputGeocodes[0].OutputGeocode.Longitude
        }
    };
```

* Finally, the last two issues were to read and replace the `.txt` file extension with `.json` extension:
* Rather clunky execution here, but it's a series of splitting, removing, pushing, and joining the new extension.
```js
   setTimeout(callback, 2000);
}, function() {
    // The below code splits the file extension name on .txt and renames a new file with .json as extension. 
    var templateString =  `${__dirname}/files/${filenames[i]}`
    // console.log(templateString);
    var splitTxt = templateString.split(".");
    // console.log(splitTxt);
    var removeTxt = splitTxt.pop();
    // console.log(splitTxt);
    var pushJson = splitTxt.push('.json');
    // console.log(splitTxt);
    var joinJson = splitTxt.join('');
    // console.log(joinJson);
```

* Lastly, the `writeFileSync()` method takes in that above transformation and stringifies the meetingdata.

```js
    fs.writeFileSync(`${joinJson}`, JSON.stringify(meetingsData));
```
--- 
### Observations & Learnings
* Async / Await seems to be the clearest way to deal with "callback hell" problem. Promises are essential to understanding this as well, as they come up again and again.
* There will always be another blackhole around the corner. Pick your battles wisely. 
---
### Challenges / Opportunities
* One of the biggest challenges I'm encountering is not having the time needed to really experiment with each of these principles of Async, Promises, Paths, File Directories, etc. before moving to the next lesson.  
---
### Additional / Readings for the week
* Gitelman, Chapter 2
* Hills, Chapters 13, 14, 15, and 16
* Dourish, Chapter 4

