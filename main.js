window.onload = function() {
    const map = new MyMap();
    map.createMap();
}

$(function(){
    $('<i></i>').prependTo($('.restaurantAddress')).addClass("fas fa-map-marker-alt").css({"margin-right" : "5px", "color" : "#eb2f06"});
});

$(function() {
    $('#reload').click(function() {
      window.location.reload(true);
    });
  });