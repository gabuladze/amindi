var apiUrl = "http://api.openweathermap.org/data/2.5/weather?APPID=";
var appID = "c3de3d20f28254f5839c03bff10f0c34";
var wrapper = $("#wrapper");
var errorAlert = $("#errorAlert");
var errorH1 = $("#error");
var country = $("#country");
var temp = $("#temp");
var unit = $("#unit");
var desc = $("#desc");
var weatherIcon = $("#weatherIcon");
var forecast = {};

function getWeather() {
  if(!navigator.geolocation) {
    errorAlert.show();
    errorH1.html("In order to user the application, please, enable Geolocation.");
    wrapper.hide();
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
      forecast.number = data.weather[0].id;

      updatePage(forecast);
    });
  }

  function error() {
    errorAlert.show();
    errorH1.html("Please, check your Geolocation settings!");
    wrapper.hide();
  }

  navigator.geolocation.getCurrentPosition(success, error);

}

function updatePage(forecast) {
  country.text(forecast.place);
  temp.html(forecast.tempC);
  desc.text(forecast.desc);
  chooseWeatherIcon(forecast);
}

function chooseWeatherIcon(forecast) {
  weatherIcon.removeClass();
  if((new Date).getHours() <= 4 || (new Date).getHours() >= 20) {
    weatherIcon.addClass("wi wi-owm-night-"+forecast.number);
  } else {
    weatherIcon.addClass("wi wi-owm-day-"+forecast.number);
  }
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
  getWeather();
  errorAlert.hide();
  unit.on("click", toggleUnit);
});
