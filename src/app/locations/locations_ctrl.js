var locations_module = require('./locations_module');
var weather_module = require('../weather_search/weather_module');

(function locationsCtrl() {

  function checkMonth() {
    var now = new Date();
    var m = now.getMonth();
    return m;
  }

  var month = checkMonth();

  if (navigator.geolocation) {
    console.log('Geolocation is supported!');
    navigator.geolocation.getCurrentPosition(function(position) {
      var glat = position.coords.latitude;
      var glng = position.coords.longitude;
      weather_module.getWeather(glat, glng);
      weather_module.getMonth(glat, glng, month);
    }, function (error) {
      console.log('Error occurred. Error code: ' + error.code);
      $('.enter-location').removeClass('hide-completely');
    });
  } else {
    console.log('Geolocation is not supported for this Browser/OS version yet.');
  }

  if (localStorage) {
    locations_module.showLocation(localStorage);
  } else {
    $('.enter-location').removeClass('hide-completely');
  }

  $('.locations-list').on('click', 'button', function() {
    $("html, body").animate({scrollTop: 0});
    var name = $(this).attr('data-loc');
    var lat = $(this).attr('data-lat');
    var lng = $(this).attr('data-lng');
    weather_module.getWeather(lat, lng);
    weather_module.getMonth(lat, lng, month);
    $('body').removeClass('fixed').removeClass('menu-open-right');
    weather_module.updateLocation(name);
  });

})();
