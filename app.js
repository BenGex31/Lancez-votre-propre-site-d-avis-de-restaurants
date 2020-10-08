/*class App {

    filterRestaurants() {
        const filterRatings = document.getElementById("filterRatings");

        const oneStarArray = restaurants.filter(average => average.averageRatings >= 0 && average.averageRatings <= 1);
        const twoStarArray = restaurants.filter(average => average.averageRatings >= 1 && average.averageRatings <= 2);
        const threeStarArray = restaurants.filter(average => average.averageRatings >= 2 && average.averageRatings <= 3);
        const fourStarArray = restaurants.filter(average => average.averageRatings >= 3 && average.averageRatings <= 4);
        const fiveStarArray = restaurants.filter(average => average.averageRatings >= 4 && average.averageRatings <= 5);

        const map = new MyMap(48.8565387, 2.3518054);
        map.createMap();
        console.log(map);
        const filter = new Restaurant();
        
        if (map.geolocationMap === false) {
            switch(filterRatings.value) {
                case "1":
                    filter.clearListRestaurants();
                    filter.createListRestaurants(oneStarArray);
                    filter.createButtonWriteReview(oneStarArray);
                    map.createMarkerRestaurants(oneStarArray);
                    filter.publishReview();
                    break;
                case "2":
                    filter.clearListRestaurants();
                    filter.createListRestaurants(twoStarArray);
                    filter.createButtonWriteReview(twoStarArray);
                    map.createMarkerRestaurants(twoStarArray);
                    filter.publishReview();
                    break;
                case "3":
                    filter.clearListRestaurants();
                    filter.createListRestaurants(threeStarArray);
                    filter.createButtonWriteReview(threeStarArray);
                    map.createMarkerRestaurants(threeStarArray);
                    filter.publishReview();
                    break;
                case "4":
                    filter.clearListRestaurants();
                    filter.createListRestaurants(fourStarArray);
                    filter.createButtonWriteReview(fourStarArray);
                    map.createMarkerRestaurants(fourStarArray);
                    filter.publishReview();
                    break;
                case "5":
                    filter.clearListRestaurants();
                    filter.createListRestaurants(fiveStarArray);
                    filter.createButtonWriteReview(fiveStarArray);
                    map.createMarkerRestaurants(fiveStarArray);
                    filter.publishReview();
                    break;
                default:
                    filter.clearListRestaurants();
                    filter.displayRestaurants();
                    map.createMarkerRestaurants(restaurants);
                    filter.publishReview();
            }
        }
    }
}

let buttonFilter = document.getElementById("buttonFilter");
let btnSaveAddRestaurant = document.getElementById('btnSaveAddRestaurant');

let filter = new App();

buttonFilter.addEventListener("click", function(){
    filter.filterRestaurants();
});

$("#buttonUpdate").on("click", function() {
    filter.filterRestaurants();
    $("#buttonUpdate").attr("disabled", "true");
});*/
