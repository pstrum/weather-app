(function menuController() {

  $(".icon-search").click(function(event) {

    event.preventDefault();

    var windowPosition = -Math.abs(window.pageYOffset);

    $("body").css('top', windowPosition).addClass("menu-open").addClass("fixed");
    $("html").addClass("body-menu");

  });

  $(".icon-map").click(function(event) {

    event.preventDefault();

    var windowPosition = -Math.abs(window.pageYOffset);

    $("body").css('top', windowPosition).addClass("menu-open-right").addClass("fixed");
    $("html").addClass("body-menu");
  })

  $(".icon-close").click(function(event) {

    event.preventDefault();

    var windowPosition = -Math.abs(window.pageYOffset);

    if ($("body").hasClass("menu-open")) {
      $("window").scrollTop(500);
      $("body").removeClass("fixed").removeClass("menu-open").removeAttr("style");
      $("html").removeClass("body-menu");
    }

  });
})();
