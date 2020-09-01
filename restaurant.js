class Restaurant {
    constructor(id, name, address, lat, long, ratings) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.lat = lat;
        this.long = long;
        this.ratings = ratings;
    }
}

const restaurants = [
    new Restaurant(1, "Bronco", "39 Rue des Petites Écuries, 75010 Paris", 48.8737815, 2.3501649, ratings.filter(rating => rating.idRestaurant === 1)),
    new Restaurant(2, "Babalou", "4 Rue Lamarck, 75018 Paris", 48.8865035, 2.3442197, ratings.filter(rating => rating.idRestaurant === 2)),
    new Restaurant(3, "Le Gabriel", "42 Avenue Gabriel, 75008 Paris", 48.8697092, 2.313439, ratings.filter(rating => rating.idRestaurant === 3)),
    new Restaurant(4, "Ciel de Paris", "Tour Maine Montparnasse, 56ème, Avenue du Maine, 75015 Paris", 48.8430359, 2.3205622, ratings.filter(rating => rating.idRestaurant === 4)),
    new Restaurant(5, "Epicure", "112 Rue du Faubourg Saint-Honoré, 75008 Paris", 48.8717179, 2.3148011, ratings.filter(rating => rating.idRestaurant === 5)),
    new Restaurant(6, "Boutary", "25 Rue Mazarine, 75006 Paris", 48.8548953, 2.3380191, ratings.filter(rating => rating.idRestaurant === 6))
];

console.log(restaurants);

for (let restaurant in restaurants) {
    let newDiv = document.createElement("div");
    let address = document.createElement("p");
    let review = document.createElement("h6");
    let restaurantName = document.createElement("h5");
    let ListRestaurants = document.getElementById("restaurantsList");
    let button = document.createElement("button");

    let num1 = restaurants[restaurant].ratings[0].stars;
    let num2 = restaurants[restaurant].ratings[1].stars;
    let sum = num1 + num2;
    let averageRatings = (sum / restaurants[restaurant].ratings.length);

    ListRestaurants.appendChild(newDiv);
    newDiv.classList.add("RestaurantInfo");
    newDiv.appendChild(restaurantName);
    restaurantName.classList.add("restaurantName");
    restaurantName.setAttribute("id", restaurants[restaurant].name);
    restaurantName.innerHTML = restaurants[restaurant].id + ". " + restaurants[restaurant].name;
    newDiv.appendChild(address);
    address.classList.add("restaurantAddress");
    address.innerHTML = restaurants[restaurant].address;
    newDiv.appendChild(review);
    review.classList.add("review" + restaurants[restaurant].id);
    review.innerHTML = averageRatings + " / 5";
    review.style.color = "#e58e26";
    review.style.fontWeight = "bolder";
    review.style.fontSize = "medium";
}