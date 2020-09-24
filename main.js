window.onload = function() {
  const app = new App();
  app.filterRestaurants();;

  $("#submitNewRestaurant").on("click", function() {
    app.filterRestaurants();
  });
}

$(function() {
    $('#reload').click(function() {
      window.location.reload(true);
    });
  });