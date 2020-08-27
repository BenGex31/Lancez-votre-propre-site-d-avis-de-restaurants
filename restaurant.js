class Restaurant {
    constructor(id, restaurantName, address, lat, long, ratings) {
        this.id = id;
        this.restaurantName = restaurantName;
        this.address = address;
        this.lat = lat;
        this.long = long;
        this.ratings = ratings;
    }
}

const restaurants = [
    new Restaurant(1, "Bronco", "39 Rue des Petites Écuries, 75010 Paris", 48.8737815, 2.3501649, [
        new Rating(4, "Un excellent restaurant, j'y reviendrai ! Par contre il vaut mieux aimer la viande."),
        new Rating(5, "Tout simplement mon restaurant préféré !")
    ]),
    new Restaurant(2, "Babalou", "4 Rue Lamarck, 75018 Paris", 48.8865035, 2.3442197, [
        new Rating(5, "Une minuscule pizzeria délicieuse cachée juste à côté du Sacré choeur !"),
        new Rating(3, "J'ai trouvé ça correct, sans plus")
    ]),
    new Restaurant(3, "Restaurant Le Gabriel", "42 Avenue Gabriel, 75008 Paris", 48.8697092, 2.313439, [
        new Rating(5, "le Gabriel restera mon souvenir gastronomique le plus mémorable."),
        new Rating(5, "Une excellente adresse que je recommande absolument.")
    ]),
    new Restaurant(4, "Ciel de Paris", "Tour Maine Montparnasse, 56ème, Avenue du Maine, 75015 Paris", 48.8430359, 2.3205622, [
        new Rating(5, "Un très bel accueil, une ambiance chaleureuse. Les serveurs étaient au petit soin avec nous."),
        new Rating(1, "Grosse déception. Le serveur et le service désastreux.")
    ]),
    new Restaurant(5, "Epicure", "112 Rue du Faubourg Saint-Honoré, 75008 Paris", 48.8717179, 2.3148011, [
        new Rating(5, "Service impeccable et pas froid comme peuvent l’être de nombreux restaurants étoilés."),
        new Rating(3, "Un peu déçu pour cet étoilé.")
    ]),
    new Restaurant(6, "Boutary", "25 Rue Mazarine, 75006 Paris", 48.8548953, 2.3380191, [
        new Rating(5, "Merci pour cette expérience culinaire mémorable et pour le professionnalisme de l'ensemble du personnel. Chef très talentueux !"),
        new Rating(5, "Un grand moment !! Raffinement du service mais pas guindé, raffinement des goûts, un cadre moderne et sobre.")
    ])
];
console.log(restaurants);


for (let restaurant of restaurants) {
    let newDiv = document.createElement("div");
    let iconPosition = document.createElement("i");
    let address = document.createElement("p");
    let titleComment = document.createElement("h6");
    let stars1 = document.createElement("p");
    let stars2 = document.createElement("p");
    let comment1 = document.createElement("p");
    let comment2 = document.createElement("p");
    let restaurantName = document.createElement("h5");
    let ListRestaurants = document.getElementById("restaurantsList");

    ListRestaurants.appendChild(newDiv);
    newDiv.classList.add("RestaurantInfo");
    newDiv.appendChild(restaurantName);
    restaurantName.classList.add("restaurantName");
    restaurantName.innerHTML = restaurant.restaurantName;
    newDiv.appendChild(address);
    address.classList.add("restaurantAddress");
    address.innerHTML = restaurant.address;
    newDiv.appendChild(titleComment);
    newDiv.appendChild(stars1);
    newDiv.appendChild(comment1);
    newDiv.appendChild(stars2);
    newDiv.appendChild(comment2);
    titleComment.innerHTML = "Commentaires :";
    titleComment.classList.add("titleComment");
    stars1.innerHTML = "Nombre d'étoiles : " + restaurant.ratings[0].stars;
    comment1.innerHTML = restaurant.ratings[0].comment;
    stars2.innerHTML = "Nombre d'étoiles : " + restaurant.ratings[1].stars;
    comment2.innerHTML = restaurant.ratings[1].comment;
    comment1.classList.add("comment1");
    comment2.classList.add("comment2");
    stars1.classList.add("stars1");
    stars2.classList.add("stars2");
}