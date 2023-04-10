var apiKey = 'cb46b644cecafb55998e4ecf9d01a0e5';
//interactions:
var citySearchBtn = $('#citySearchBtn');
var searchForm = $('#search-form');
var citySearch = $('input[name="citySearch"]');
var searchHistoryArr = [];
var prevCities = $('#prevCities');
//dates
var today = dayjs();
var thisDay = today.format('YYYY-MM-DD');
var thisMonth = today.format('YYYY-MM');
//id=currentCity from HTML: 
var curCityHeader = $('.current-city-header');
var todayTemp = $('.current-temp');
var todayWeather = $('.current-weather');
var todayWind = $('.currernt-wind');
var todayHumidity = $('.current-humidity');


function searchHistory(event) {
  event.preventDefault();
  console.log(`seach value: ${citySearch.val()}`);
  searchWeather(citySearch.val());
  citySearch.val('');
}

function searchWeather(city) {
  searchHistoryArr.unshift(city);
  // console.log(searchHistoryArr);
  //NOT SURE WHERE I WAS GOING WITH THIS ANYMORE
  searchHistoryArr.length >= 7 ? searchHistoryArr.pop() : null;
  localStorage.setItem('searchHistory', searchHistoryArr);

  //get lat & lon values for the city searched: 
  var geoAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city},&limit=1&appid=${apiKey}`;
  fetch(geoAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      getWeatherForecast(lat, lon);
    })
  makeBtn(city);
}

function getWeatherForecast(lat, lon) {
  //get the weather using the lat/lon coordinates
  var weatherAPI = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetch(weatherAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
      var temp = Math.round(data.list[0].main.temp);
      var weather = data.list[0].weather[0].description;
      var wind = ((data.list[0].wind.speed) * 3.6).toFixed(2);
      var humidity = data.list[0].main.humidity;
      //set current forecast 
      console.log(searchHistoryArr[0]);
      curCityHeader.text(`${thisDay} ${searchHistoryArr[0]}`);
      todayTemp.text(`${temp}°C`);
      todayWeather.text(weather);
      todayWind.text(`wind: ${wind}km/h`);
      todayHumidity.text(`humidity: ${humidity}%`);

      //set the 5-days forecast
      for (i = 7; i < data.list.length; i += 8) {
        console.log(data.list[i]);
        var nextDay = data.list[i].dt_txt.substring(5, 10);
        var nextTemp = Math.round(data.list[i].main.temp);
        var nextWeather = data.list[i].weather[0].description;
        var nextWind = data.list[i].wind.speed;
        var nextHumidity = data.list[i].main.humidity;
        var nextDaysVar = (i + 1) / 8;    //1-5
        var days = `day${nextDaysVar}`;
        var temps = `temp${nextDaysVar}`;
        var weathers = `weather${nextDaysVar}`;
        var winds = `wind${nextDaysVar}`;
        var humidities = `humidity${nextDaysVar}`;
        $(`.${days}`).text(nextDay);
        $(`.${temps}`).text(`${nextTemp}°C`);
        $(`.${weathers}`).text(nextWeather);
        $(`.${winds}`).text(`wind: ${nextWind}km/h`);
        $(`.${humidities}`).text(`humidity: ${nextHumidity}%`);
      }
    })
};

//when searchForm submitted, create a button with searched city
function makeBtn(city) {
  var newBtn = $('<button>');
  newBtn.attr('type', 'button');
  newBtn.addClass("btn btn-secondary btn-lg btn-block m-1");
  newBtn.text(`${city}`);
  prevCities.prepend(newBtn);

  newBtn.on('click', function () {
    searchWeather(city);
  })
  removeLast();
}

//when more than 6 prev city buttons, get rid of the last/oldest search: 
function removeLast() {
  if (prevCities.get(0).childElementCount >= 7) {
    prevCities.children().last().remove();
  }
}

//text-complete in search bar
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