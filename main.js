window.onload = function() {
  /*const app = new App();
  app.filterRestaurants();*/

  const map = new MyMap(48.8565387, 2.3518054);
        map.createMap();
        console.log(map);
}

$(function() {
  $('#reload').click(function() {
    window.location.reload(true);
  });
});