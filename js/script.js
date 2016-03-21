var apiUrl = "http://api.openweathermap.org/data/2.5/weather?APPID=";
var appID = "c3de3d20f28254f5839c03bff10f0c34";
var target = $("#target");
var switchUnit = $("#switchUnit");
var country = $("#country");
var temp = $("#temp");
var desc = $("#desc");

function updateWeather() {
  if(!navigator.geolocation) {
    alert("Geolocation is Disabled!");
    return;
  }

  function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    apiUrl += appID+"&lat="+latitude+"&lon="+longitude+"&units=metric";

    $.get(apiUrl, function(data) {
      var tempC = Math.round(data.main.temp);
      var tempF = Math.round(data.main.temp * 9/5 +32);
      var countryName = data.name+", "+data.sys.country;
      var weatherDesc = data.weather[0].main;

      // FOR DEBUGGING ONLY!!!
      console.log(data);
      ///

      updatePage(countryName, tempC, weatherDesc);
    });
  }

  function error() {
    alert("Error executing the request!");
  }

  navigator.geolocation.getCurrentPosition(success, error);
}

function updatePage(countryName, tempC, weatherDesc) {
  country.html(countryName);
  temp.html(tempC+"&deg;C");
  desc.html(weatherDesc);
}

$(document).ready(function() {
  updateWeather();
});
