var apiUrl = "http://api.openweathermap.org/data/2.5/weather?APPID=";
var appID = "c3de3d20f28254f5839c03bff10f0c34";
var country = $("#country");
var temp = $("#temp");
var unit = $("#unit");
var desc = $("#desc");
var forecast = {};

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
      forecast.tempC = Math.round(data.main.temp);
      forecast.tempF = Math.round(data.main.temp * 9/5 +32);
      forecast.desc = data.weather[0].main;
      forecast.place = data.name+", "+data.sys.country;

      // FOR DEBUGGING ONLY!!!
      console.log(data);
      ///

      updatePage(forecast);
    });
  }

  function error() {
    alert("Error executing the request!");
  }

  navigator.geolocation.getCurrentPosition(success, error);
}

function updatePage(forecast) {
  country.text(forecast.place);
  temp.html(forecast.tempC);
  desc.text(forecast.desc);
}

function toggleUnit() {
  if (unit.text() === 'C') {
    temp.html(forecast.tempF);
    unit.text("F");
  } else {
    temp.html(forecast.tempC);
    unit.text("C");
  }
}

$(document).ready(function() {
  updateWeather();
  unit.on("click", toggleUnit);
});
