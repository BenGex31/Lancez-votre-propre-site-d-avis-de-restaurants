window.onload = function() {
  const app = new App();
  app.filterRestaurants();
}

$(function() {
  $('#reload').click(function() {
    window.location.reload(true);
  });
});