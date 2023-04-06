var citySearchBtn = $('#citySearchBtn');
var searchForm = $('#search-form')
var citySearch = $('input[name="citySearch"]')
var searchHistoryArr = [];
var prevCities = $('#prevCities') 


$( function() {
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
  } );



  function searchHistory(event) {
    event.preventDefault();
    console.log(citySearch.val());
    searchHistoryArr.unshift(citySearch.val());
    console.log(searchHistoryArr);

    searchHistoryArr.length >= 5 ? searchHistoryArr.pop() : null;
    localStorage.setItem('searchHistory', searchHistoryArr);

    makeBtn()
  }


  function makeBtn() {
    var newBtn = $('<button>')
    newBtn.attr('type', 'button');
    newBtn.addClass("btn btn-secondary btn-lg btn-block m-1");
    newBtn.text(`${citySearch.val()}`); //NEED TO ADD IT SO FUNCTIONS TO WHAT THE CITY IS
    prevCities.prepend(newBtn)
    console.log(prevCities.get(0).childElementCount)  //WHAT IS .GET(0) WHY ARENT THESE WORKING
    console.log(prevCities.children().last())  
    citySearch.val('');
    removeLast();
  }
//SAME WITH THESE
  function removeLast() {
    if (prevCities.get(0).childElementCount >= 6) {
    prevCities.children().last().remove()
  }}



searchForm.on('submit', searchHistory); 
  
