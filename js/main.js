window.onload = function() {
  /*const app = new App();
  app.filterRestaurants();*/

  const map = new MyMap();
  map.createMap();
  console.log(map);
}

$(function() {
  $('#reload').click(function() {
    window.location.reload(true);
  });
});