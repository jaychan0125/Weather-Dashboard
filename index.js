var citySearchBtn = $('#citySearchBtn');
var searchForm = $('#search-form')
var citySearch = $('input[name="citySearch"]')
var searchHistoryArr = [];
var prevCities = $('#prevCities')

//turn City into Lat and Lon: 
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{country code}&limit=1&appid={API key}
//will return" "name", "lat", "lon"
//local storage: make object with name as key, and values lat and lon????

var apiKey = 'cb46b644cecafb55998e4ecf9d01a0e5'

// var getGeoInfo = function (citySearch) {
// console.log(citySearch)
// var geoAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearch.val()},&limit=1&appid=${apiKey}`;
// fetch(geoAPI)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   })
// }















//for text complete in search bar: 
$(function () {
  var availableTags = [
    "Toronto",
    "Markham",
    "Hong Kong",
    "Vancouver",
    "Calgary",
    "Banff",
    "Edmonton",
    "Seoul",
    "Tokyo"
  ];
  $("#citySearch").autocomplete({
    source: availableTags
  });
});


function searchHistory(event) {
  event.preventDefault();
  console.log(citySearch.val());
  searchHistoryArr.unshift(citySearch.val());
  // console.log(searchHistoryArr);
  searchHistoryArr.length >= 5 ? searchHistoryArr.pop() : null;
  localStorage.setItem('searchHistory', searchHistoryArr);

  var geoAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearch.val()},&limit=1&appid=${apiKey}`;
  fetch(geoAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data[0].lat
      var lon = data[0].lon
      console.log(lat)
      console.log(lon)
    
      var weatherAPI = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      fetch(weatherAPI)
      .then(function (responseW) {
        return responseW.json();
      })
      .then(function (dataW) {
        console.log(dataW);
        console.log(`the temp in celcius: ${Math.round(dataW.list[0].main.temp - 273.15)}`)





      })})












  makeBtn()
}

//when search, create a button with searched city
function makeBtn() {
  var newBtn = $('<button>')
  newBtn.attr('type', 'button');
  newBtn.addClass("btn btn-secondary btn-lg btn-block m-1");
  newBtn.text(`${citySearch.val()}`); //NEED TO ADD IT SO FUNCTIONS TO WHAT THE CITY IS
  prevCities.prepend(newBtn)
  // console.log(prevCities.get(0).childElementCount)
  // console.log(prevCities.children().last())  
  citySearch.val('');
  removeLast();
}
//when more than 5 prev city buttons, get rid of the last/oldest search: 
function removeLast() {
  if (prevCities.get(0).childElementCount >= 6) {
    prevCities.children().last().remove()
  }
}

searchForm.on('submit', searchHistory);

