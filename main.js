window.onload = function() {
  const app = new App();
  app.filterRestaurants();

  const weather = new Weather();
  weather.askWeather();
}

$(function() {
    $('#reload').click(function() {
      window.location.reload(true);
    });
  });