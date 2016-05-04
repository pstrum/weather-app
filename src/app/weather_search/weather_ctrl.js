var weatherModule = require('./weather_module');

(function weatherCtrl() {

  $('.menu-nav [aria-label="Hourly Forecast"]').addClass('selected');

  $('.menu-nav button').click(function() {

    $("html, body").animate({scrollTop: 0});

    var sibs = $(this).parent().siblings().children();
    var weatherSections = $('section[data-weather]');
    var weatherType = $(this).attr('aria-controls');

    $.each(weatherSections, function(index, value) {
      var dataValue = $(this).attr('data-weather');
      if (!$(this).hasClass('hide-completely')) {
        $(this).addClass('hide-completely');
      }
      if (dataValue === weatherType) {
        $(this).removeClass('hide-completely');
      }
    });

    $.each(sibs, function(index, value) {
      if ($(this).hasClass('selected')) {
        $(this).removeClass();
      }
    });

    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      $(this).addClass('selected');
    }
  })

})();
