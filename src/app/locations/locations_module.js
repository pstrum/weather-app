var locations_module = module.exports = {

  addStorage: function storeIt(name, data) {
    var item = JSON.stringify(data); 
    weatherStorage = localStorage;
    weatherStorage.setItem(name, item);
  },

  getStorage: function getIt(name) {
    var getVal = weatherStorage.getItem(name);
    var jsonObj = JSON.parse(getVal);
    return jsonObj;
  },

  showLocation: function attachLocation(storage) {

    for (var i in storage) {
      var getItem = storage.getItem(i);
      var item = JSON.parse(getItem);
      var place = item.name;
      var locArr = place.split(', ');
      var name = locArr[0];
      var state = locArr[1];
      var lat = item.latitude;
      var lng = item.longitude;
      var $spn = $('<span />').html(state);
      var $btn = $('<button>').attr('data-loc', name).attr('data-lat', lat).attr('data-lng', lng).html(name).append($spn);
      var $li = $('<li />').append($btn);
      var $locationList = $('.locations-list');
      var $locationChilds = $locationList.children();
      if ($locationChilds.length >= 10) {
        $('.locations-list li:last-child').remove();
        $locationList.prepend($li);
      } else {
        $locationList.prepend($li);
      }
    }
  }

};
