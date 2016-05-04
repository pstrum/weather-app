var weather = require('../weather_search/weather_module');
var location = require('../locations/locations_module');

module.exports = {

  search: function initSearch() {
    var weatherData;
    var input = document.getElementById('findLocation');
    var options = {
      types: ['(cities)']
    };
    var autocomp = new google.maps.places.Autocomplete(input, options);

    autocomp.addListener('place_changed', function getAddress() {
      var place = autocomp.getPlace();
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();
      var placeShName = place.name;
      var placeName = place.formatted_address;
      var placeData = {
        name: placeName,
        latitude: lat,
        longitude: lng
      };

      function checkMonth() {
        var now = new Date();
        var m = now.getMonth();
        return m;
      }

      var month = checkMonth();
      $("html, body").animate({scrollTop: 0});

      weatherData = weather.getWeather(lat, lng);
      weather.getMonth(lat, lng, month);
      location.addStorage(placeName, placeData);
      $('.locations-list').children().remove();
      location.showLocation(weatherStorage);

      weather.updateLocation(placeShName);
      $('#findLocation').val('');
      $('body').removeClass('fixed').removeClass('menu-open').removeAttr('style');

    });
    return weatherData;
  }

};
