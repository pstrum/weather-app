var env = require('../../../server/config/environment');
var search = require('./search_module');

(function searchEvent() {
  var searchField = document.getElementById('findLocation');

  searchField.addEventListener('focus', function() {
    search.search();
  });

  function loadGoogle() {
    var mapsScript = document.createElement('script');
    var apiKey = env.googleKey;
    mapsScript.src = '//maps.googleapis.com/maps/api/js?key=' + apiKey + '&libraries=places';
    mapsScript.async = true;
    document.body.appendChild(mapsScript);
  }

  loadGoogle();

})();
