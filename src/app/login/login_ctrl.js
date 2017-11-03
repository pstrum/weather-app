var User = {};

$("#adduser").click(function(event) {
  event.preventDefault();

  var email = checkFilled($("#usrEmail"));
  var firstName = checkFilled($("#firstName"));
  var lastName = checkFilled($("#lastName"));
  var password = checkFilled($("#usrPassword"));

  function checkFilled(elem) {
    var val = elem.val();
    if (val === "") {
      elem.addClass("not-filled");
    }
    return val;
  }

  $(".user-login").on("focus", "input", function() {
    var inp = $(this);
    if (inp.hasClass("not-filled")) {
      inp.removeClass("not-filled");
    }
  });

  User.email = email;
  User.firstName = firstName;
  User.lastName = lastName;
  User.password = password;

  var filled = 0;
  for (var val in User) {
    if (User[val] !== "") {
      filled += 1;
    }
  }

  console.log(User);
  if (filled === 4) {
    create(User);
  }

});
