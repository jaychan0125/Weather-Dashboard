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
