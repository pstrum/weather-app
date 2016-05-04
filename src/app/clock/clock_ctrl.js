(function clockController() {

  function startTime() {

    function addZero(time) {
      var updated = (time < 10 ? '0' : '') + time;
      return updated;
    }

    var now = new Date();
    var hh = now.getHours();
    hh = hh % 12;
    hh = addZero(hh);
    var mm = now.getMinutes();
    mm = addZero(mm);
    var ss = now.getSeconds();
    ss = addZero(ss);
    $('#time').html(hh + " " + mm + " " + ss);
  }

  setInterval(startTime, 1000);

})();
