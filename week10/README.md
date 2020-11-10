# Weekly Assignment 10

Assignment 10 Details: [Week 10](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week10/week10_assignment.md)
---
## AA Map Design -- Project 1
## Summary:
The purpose of this assignment was to design a layout for the front end of our AA Project. 

* Interactivity: 
* Data mapping to Visuals: Here I am using a sketch and screen shot that I adapted from [Maputnik](https://maputnik.github.io/editor/#12.73/40.74696/-73.96324/29.8/1).
  It will be necessary to set up filtering based on distance from location, day and timeframe based on Calendar, wheelchair access, and current location.
* Data transformation before visualization: Here I will still need to do a great deal of clean up with the data and add a radius from the starting zipcode.
* Default view: The map is central in terms of view, and the current location is set near 42nd Street for our persona. 
* User assumptions: I've generated a persona specifically for this use case, though I would like to extend the personas to include more assumptions.


Sketches:
![](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week10/images/AA_persona.png?raw=true)
![](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week10/images/AA_Questions.png?raw=true)
![](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week10/images/AA_Map_Sketch.png?raw=true)


---
## Process Blog -- Project 2
## Summary:
The purpose of this assignment was to design a layout for the front end for our Process Blog.

* Interactivity: 
* Data mapping to Visuals: Here we are making the assumption that we have a sign-in created for a specific user. The main mapping to the frontend will include Data, time, Entry Title, and Entry.
  Also, I've included in the sketch the ability to edit a specific post after the fact.
* Data transformation before visualization: Here it will be necessary to parse the date object and timestamp out to create a clear visual. Also it will be helpful to only give a snap-shot of the 
  entry until it's clicked on. Filtering by Tag is something that I will be interested in looking further into based on the idea of Local Secondary Index. 
* Default view: At the moment the current month will be populated, but future iterations will consider searches by date and multi-user. 
* User assumptions: The current user is a personal Journal for user "Nancy Humboldt", I may change this along the way.  


Sketch:
![](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week10/images/Journal_Sketch.png?raw=true)

---
## IoT Sensor Readings -- Project 3
## Summary:
The purpose of this assignment was to design a layout for our IoT sensor readings.  

* Interactivity: 
* Data mapping to Visuals: Here I've created a sketch of both both indoor and outdoor temperature readings over the course of 45 days or so.
* Data transformation before visualization: It will be necessary to find averages during the day before the "avg temp" for the day is marked. 
* Default view: the entire 45 days will be the default, and -10 to 100 degree will be the spectrum. 
* User assumptions: The temperature sensor is by a drafty window in an apartment in Manhattan, with a heater just below the device. The goal is to test the temperature to see if it goes below a certain threshold.


Sketch:
![](https://github.com/leeallennyc/data-structures-fall-2020/blob/master/week10/images/Temperature_sensing_Sketch.png?raw=true)

---

### Observations & Learnings
* This was a very helpful exercise to draft and consider how the mappings of data will converge with the front end design. At the moment there are still a number of elements that are outstanding.
* One of these considerations is user login information and credentials when a user signs in. 
---
### Challenges / Opportunities
* An opportunity moving forward is to consider how much of the design can actually be initiated in the timeframe we have.
* Better understanding the benefits of SQL and NOSQL Databases will be an important part moving forward. 
---
### Additional / Readings for the week
* [REDESIGNING DESIGN / JOS DE MUL](http://opendesignnow.org/index.html%3Fp=401.html)







