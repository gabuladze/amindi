var apiUrl = "http://api.openweathermap.org/data/2.5/weather?APPID=";
var appID = "c3de3d20f28254f5839c03bff10f0c34";
var target = $("#target");
var switchUnit = $("#switchUnit");
var country = $("#country");
var temp = $("#temp");
var desc = $("#desc");

function updateWeather() {
  if(!navigator.geolocation) {
    target.html("Geolocation is Disabled!");
    return;
  }

  function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    apiUrl += appID+"&lat="+latitude+"&lon="+longitude+"&units=metric";

    $.get(apiUrl, function(data) {
      var tempC = Math.round(data.main.temp);
      var tempF = Math.round(data.main.temp * 9/5 +32);
      var weatherDesc = data.weather[0].main;

      console.log(data);
      country.html(data.name+", "+data.sys.country);
      temp.html(tempC+"&deg;C");
      desc.html(weatherDesc);
    })
    // target.html(apiUrl);
  }

  function error() {
    target.html("Error!");
  }

  navigator.geolocation.getCurrentPosition(success, error);
}

$(document).ready(function() {
  updateWeather();
});
