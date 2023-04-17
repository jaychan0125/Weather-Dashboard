# Work Day Scheduler

## 05 Third-Party APIs: Work Day Scheduler

This weeks challenge will be so useful in helping me stay organised! We’re making a workday scheduler! Following the theme of ‘making our lives easier’, we were given starter code to work with! Even hints, yay! 

I think one of the biggest lessons I’ve learned from this challenge is that my code doesn’t have to be the most condensed (although it would be ideal if it was more legible and succinct), and as long as it FUNCTIONS as it should then I’ll be okay. I was paralyzed for the better part of an evening when I was struggling to write just one line of code so that the localStorage items display in their appropriate sections. After reaching out to AskBCS, Drew kindly helped me understand localStorage better, and showed me that it was okay to just have a line of code for EACH SECTION to display their stored contents. During my review before submitting the challenge, I realised that the code I put for this part had a PATTERN, and I WOULD be able to shorten it using some of the logic I used in other parts of my code! It was very exciting since this was originally how I envisioned to write it, but it just took me understanding how my code functions better first before I could do it! 

Other than this revelation, the trickier part of this challenge would likely be traversing the DOM, and accessing the elements that I needed, especially when all the sections are basically the same except for an ID. 
I feel like overall this one was pretty straightforward; and given access to libraries such as Day.js, it made the task much more manageable than if I didn’t have it. 
 

## Table of Contents

- [Deployment](#deployment)
- [Requirements](#requirements)
- [Usage](#usage)
- [Citations](#citations)
- [License](#license)

## Deployment

Link to my weather dashboard: 

**https://jaychan0125.github.io/WorkDay-Scheduler/**


## Requirements

Here are the provided requirements:
### User Story
```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

### Acceptance Criteria
```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Usage

![Weather Dashboard](./Assets/wd-main.png)

Here you'll find a Weather Dashboard! Please enter the city you're looking for the weather report for in the search input! They'll also be text-complete for some popular city destinations I'd love to travel to! 

![Cities Searched](./Assets/wd-display.png) 

Once you hit search, the weather dashboard for the current day, the 5-day weather report, and a button with your searched city will populate! You can create a maximum of 6 buttons, so you'll be able to look for the weather in those cities with just a click of the button instead of a whole new search! 


## Citations

Maqsood, A., Moatar, T., Krishna, &amp; Zhang, S. (2023). Web APIs Day 1-3. Lecture. 

Compagnoni, J. (2023). Tutoring.

## License

Licensed under the MIT license.

---

