window.onload = function() {
  const app = new App();
  app.filterRestaurants();
  app.addRestaurantArray();
}

$(function() {
    $('#reload').click(function() {
      window.location.reload(true);
    });
  });