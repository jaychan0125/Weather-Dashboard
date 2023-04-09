var apiKey = 'cb46b644cecafb55998e4ecf9d01a0e5'

var citySearchBtn = $('#citySearchBtn');
var searchForm = $('#search-form')
var citySearch = $('input[name="citySearch"]')
var searchHistoryArr = [];
var prevCities = $('#prevCities')

var today = dayjs();
var thisDay = today.format('YYYY-MM-DD');
var day = today.format('DD');
var nextDay = (parseInt(day) + 1);
console.log(`day + 1: ${nextDay}`);
var thisHour = today.format('HH');
var closestTime = `${thisDay} ${thisHour}`;
// console.log(closestTime)

//id=currentCity HTML slots
var curCityHeader = $('.current-city-header')
var todayTemp = $('.current-temp')
var todayWeather = $('.current-weather')
var todayWind = $('.currernt-wind')
var todayHumidity = $('.current-humidity')





function searchHistory(event) {
  event.preventDefault();
  console.log(`seach value: ${citySearch.val()}`);
  searchHistoryArr.unshift(citySearch.val());
  // console.log(searchHistoryArr);
  searchHistoryArr.length >= 6 ? searchHistoryArr.pop() : null;
  localStorage.setItem('searchHistory', searchHistoryArr);


  //get lat & lon values for the city searched: 
  var geoAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearch.val()},&limit=1&appid=${apiKey}`;
  fetch(geoAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data[0].lat
      var lon = data[0].lon
      console.log(`lat: ${lat}`)
      console.log(`lon: ${lon}`)
    
      //get the weather using the lat/lon coordinates
      var weatherAPI = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      fetch(weatherAPI)
      .then(function (responseW) {
        return responseW.json();
      })
      .then(function (dataW) {
        console.log(dataW);
        var temp = Math.round(dataW.list[0].main.temp);
        console.log(`the temp in celcius: ${temp}`)
        var weather = dataW.list[0].weather[0].description;
        console.log(`weather: ${weather}`)
        var wind = ((dataW.list[0].wind.speed) * 3.6).toFixed(2);
        console.log(`wind: ${wind}km/s`)
        var humidity = dataW.list[0].main.humidity;
        console.log(`humidity: ${humidity}%`)

        console.log(citySearch.val()) //WHY ISNT THIS WORKING
        curCityHeader.text(`${citySearch.val()} ${thisDay}`)
        todayTemp.text(`${temp}°C`)
        todayWeather.text(weather)
        todayWind.text(`wind: ${wind}km/s`)
        todayHumidity.text(`humidity: ${humidity}%`)
        
        // var tmrData = data.find(`2023-04-${nextDay} 12`)
        // console.log(tmrData)





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

searchForm.on('submit', searchHistory);