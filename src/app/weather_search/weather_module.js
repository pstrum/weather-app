var env = require('../../../server/config/environment');
var exData = require('../example_data/weather_exdata');
var exMData = require('../example_data/weather_exmondata');

var weather_module = module.exports = {

  updateLocation: function(city) {
    $('.hourly ul, .daily ul, .monthly ul').children().remove();
    $('#currentLocation').html(city);
    $('html').removeClass('body-menu');
    $('.menu-nav button').removeClass('selected');
    $('.menu-nav [aria-label="Hourly Forecast"]').addClass('selected');
    var weatherSections = $('[data-weather]');
    $.each(weatherSections, function(index, value) {
      var dataDash = $(this).attr('data-weather');
      if (dataDash == 'hourly') {
        if ($(this).hasClass('hide-completely')) {
          $(this).removeClass('hide-completely');
        }
      } else if (!$(this).hasClass('hide-completely')) {
        $(this).addClass('hide-completely');
      }
    });
  },

  hourlySum: function(dataObj) {
    var current = dataObj;
    if (current.time == "Now") {
      var selectedHour = "Now";
    } else {
      var selectedHour = weather_module.convertTimeHour(current.time);
    }
    var temp = Math.round(current.temperature);
    var apptemp = Math.round(current.apparentTemperature);
    var dew = Math.round(current.dewPoint);
    var precip = Math.round(current.precipProbability * 100);
    var direction = weather_module.findBearing(current.windBearing);
    var img = current.icon;
    var humid = Math.round(current.humidity * 100);
    var cover = Math.round(current.cloudCover * 100);

    $('#selHour').html(selectedHour);
    $('#hSum').html(current.summary);
    $('#hTemp').html(temp).removeClass().addClass(img);
    $('#hAppTemp').html(apptemp);
    $('#hDew').html(dew);
    $('#hPrecip').html(precip + "%");
    $('#hWind').html(current.windSpeed + " " + direction);
    $('#hHumid').html(humid + "%");
    $('#hCloud').html(cover + "%");
  },

  dailySum: function(dataObj) {
    var dayData = dataObj;
    var day = weather_module.getDayOfWeek(dayData.time);
    var tempMin = Math.round(dayData.temperatureMin);
    var tempMax = Math.round(dayData.temperatureMax);
    var aveTemp = Math.round((tempMin + tempMax) / 2);
    var dew = Math.round(dayData.dewPoint);
    var precip = Math.round(dayData.precipProbability * 100);
    var direction = weather_module.findBearing(dayData.windBearing);
    var img = dayData.icon;
    var humid = Math.round(dayData.humidity * 100);
    var cover = Math.round(dayData.cloudCover * 100);
    var sunrise = weather_module.convertTimeHourMin(dayData.sunriseTime);
    var sunset = weather_module.convertTimeHourMin(dayData.sunsetTime);

    $('#day').html(day);
    $('#dSum').html(dayData.summary);
    $('#dTemp').html(tempMin + " – " + tempMax).addClass(img);
    $('#dAve').html(aveTemp);
    $('#dDew').html(dew);
    $('#dPrecip').html(precip + "%");
    $('#dWind').html(dayData.windSpeed + " " + direction);
    $('#dHumid').html(humid + "%");
    $('#dCloud').html(cover + "%");
    $('#dSunrise').html(sunrise);
    $('#dSunset').html(sunset);
  },

  monthSum: function(dataObj) {
    var month = dataObj.trip;
    var monthName = month.period_of_record.date_start.date.monthname;
    var tempMin = Math.round(month.temp_low.avg.F);
    var tempMax = Math.round(month.temp_high.avg.F);
    var dewMin = Math.round(month.dewpoint_low.avg.F);
    var dewMax = Math.round(month.dewpoint_high.avg.F);
    var precip = month.chance_of.chanceofprecip.percentage;
    var cloud = month.cloud_cover.cond;
    var fog = month.chance_of.chanceoffogday.percentage;
    var snow = month.chance_of.chanceofsnowday.percentage;
    var thun = month.chance_of.chanceofthunderday.percentage;
    var sun = month.chance_of.chanceofsunnycloudyday.percentage;

    $('#month').html(monthName);
    $('#mTemp').html(tempMin + " – " + tempMax);
    $('#mDew').html(dewMin + " – " + dewMax);
    $('#mPrecip').html(precip + "%");
    $('#mFog').html(fog + "%");
    $('#mSnow').html(snow + "%");
    $('#mCloud').html(cloud);
    $('#mSun').html(sun + "%");
    $('#mThun').html(thun + "%");
  },

  hourlyDet: function(dataObj) {
    var hours = dataObj.hourly.data;
    var hoursSumm = [];
    var $domList = $('#hourlyDetailed');
    var childs = $domList.children();

    for (var i = 0; i <= 20; i++) {
      if (i == 0) {
        var time = "Now";
        hours[0].time = "Now";
      } else {
        var time = weather_module.convertTimeHour(hours[i].time);
      }
      var hourSummary = hours[i].summary;
      var image = hours[i].icon;
      var temp = Math.round(hours[i].temperature);
      hoursSumm.push([time, hourSummary, image, temp, hours[i]]);
      i++;
    }

    $.each(hoursSumm, function (index, value) {
      $domList.append('<li><button data-idx="' + index + '"><h3 class="hour">' + value[0] + '</h3><p class="hour-sum">' + value[1] + '</p><p class="hour-temp' + " " + value[2] + '">' + value[3] + '</p></button></li>');
    });

    $('.hourly button').click(function() {

      var idx = $(this).attr('data-idx');
      var newData = hoursSumm[idx][4];
      weather_module.hourlySum(newData);

    });
  },

  dailyDet: function(dataObj) {
    var days = dataObj.daily.data;
    var dailySumm = [];
    var $domList = $('#dailyDetailed');

    for (var i = 0; i <= 7; i++) {
      var time = weather_module.getDayOfWeek(days[i].time);
      var dayAve = Math.round((days[i].apparentTemperatureMax + days[i].apparentTemperatureMin) / 2);
      var image = days[i].icon;
      var temp = Math.round(days[i].temperatureMin) + ' – ' + Math.round(days[i].temperatureMax) ;
      dailySumm.push([time, dayAve, image, temp, days[i]]);
    }

    $.each(dailySumm, function (index, value) {
      $domList.append('<li><button data-idx="' + index + '"><h3 class="day">' + value[0] + '</h3><p class="day-ave' + " " + value[2] + '">' + value[1] + '</p><p class="day-temp">' + value[3] + '</p></button></li>');
    });

    $('.daily button').click(function() {

      var idx = $(this).attr('data-idx');
      var newData = dailySumm[idx][4];
      weather_module.dailySum(newData);

    });
  },

  convertTimeHour: function(time) {
    var date = new Date(time * 1000);
    var hour = date.getHours();
    var ap = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    var addAP = hour + " " + ap;
    return addAP;
  },

  convertTimeHourMin: function(time) {
    var date = new Date(time * 1000);
    var hour = date.getHours();
    var min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    var ap = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    var addAP = hour + ":" + min + " " + ap;
    return addAP;
  },

  getDayOfWeek: function(time) {
    var date = new Date(time * 1000);
    var n = date.getDay();
    var day;
    if (n === 0) {
      day = "Sun";
    } else if (n === 1) {
      day = "Mon";
    } else if (n === 2) {
      day = "Tue";
    } else if (n === 3) {
      day = "Wed";
    } else if (n === 4) {
      day = "Thu";
    } else if (n === 5) {
      day = "Fri";
    } else if (n === 6) {
      day = "Sat";
    }
    return day;
  },

  findBearing: function(windB) {
    var bear;
    if (windB >= 348.75 && windB <= 360) {
      bear = 'N';
    } else if (windB >= 0 && windB <= 11.25) {
      bear = 'N';
    } else if (windB >= 11.26 && windB <= 33.75) {
      bear = 'NNE';
    } else if (windB >= 33.76 && windB <= 56.25) {
      bear = 'NE';
    } else if (windB >= 56.26 && windB <= 78.75) {
      bear = 'ENE';
    } else if (windB >= 78.76 && windB <= 101.25) {
      bear = 'E';
    } else if (windB >= 101.26 && windB <= 123.75) {
      bear = 'ESE';
    } else if (windB >= 123.76 && windB <= 146.25) {
      bear = 'SE';
    } else if (windB >= 146.26 && windB <= 168.75) {
      bear = 'SSE';
    } else if (windB >= 168.76 && windB <= 191.25) {
      bear = 'S';
    } else if (windB >= 191.26 && windB <= 213.75) {
      bear = 'SSW';
    } else if (windB >= 213.76 && windB <= 236.25) {
      bear = 'SW';
    } else if (windB >= 236.26 && windB <= 258.75) {
      bear = 'WSW';
    } else if (windB >= 258.76 && windB <= 281.25) {
      bear = 'W';
    } else if (windB >= 281.26 && windB <= 303.75) {
      bear = 'WNW';
    } else if (windB >= 303.76 && windB <= 326.25) {
      bear = 'NW';
    } else if (windB >= 326.26 <= windB <= 348.74) {
      bear = 'NNW';
    }
    return bear;
  },

  getWeather: function(lat, lng) {

    if (!$('.enter-location').hasClass('hide-completely')) {
      $('.enter-location').addClass('hide-completely');
    }
    var apiKey = env.forecastKey;
    var urlString = 'https://api.forecast.io/forecast/' + apiKey + '/' + lat + ',' + lng;
    var weatherData = localStorage;

    var data = exData;
    var current = data.currently;
    current.time = "Now";
    var daily = data.daily.data[0];
    weather_module.hourlySum(current);
    weather_module.hourlyDet(data);
    weather_module.dailySum(daily);
    weather_module.dailyDet(data);

    //var req = $.ajax({
      //url: urlString,
      //method: 'GET',
      //dataType: "jsonp",
    //});
    //req.done(function(data) {
      //var current = data.currently;
      //current.time = "Now";
      //var daily = data.daily.data[0];
      //weather_module.hourlySum(current);
      //weather_module.hourlyDet(data);
      //weather_module.dailySum(daily);
      //weather_module.dailyDet(data);
    //});
    //req.fail(function( jqXHR, status ) {
      //console.log( "Request failed: " + status );
    //});

  },

  getMonth: function(lat, lng, time) {

    var month;
    if (time == 0) {
      month = '01010131';
    } else if (time == 1) {
      month = '02010228';
    } else if (time == 2) {
      month = '03010331';
    } else if (time == 3) {
      month = '04010430';
    } else if (time == 4) {
      month = '05010531';
    } else if (time == 5) {
      month = '06010630';
    } else if (time == 6) {
      month = '07010731';
    } else if (time == 7) {
      month = '08010831';
    } else if (time == 8) {
      month = '09010930';
    } else if (time == 9) {
      month = '10011031';
    } else if (time == 10) {
      month = '11011130';
    } else if (time == 11) {
      month = '12011231';
    }

    var apiKey = env.wuKey;
    var urlString = 'https://api.wunderground.com/api/' + apiKey + '/planner_' + month + '/q/' + lat + ',' + lng + '.json';

    var data = exMData;
    weather_module.monthSum(data);

    //var req = $.ajax({
      //url: urlString,
      //method: 'GET',
      //dataType: "jsonp"
    //});
    //req.done(function(data) {
      //weather_module.monthSum(data);
    //});
    //req.fail(function( jqXHR, status ) {
      //console.log( "Request failed: " + status );
    //});

  }

};
