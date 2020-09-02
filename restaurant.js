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
    new Restaurant(3, "Gabriel", "42 Avenue Gabriel, 75008 Paris", 48.8697092, 2.313439, ratings.filter(rating => rating.idRestaurant === 3)),
    new Restaurant(4, "Ciel-de-Paris", "Tour Maine Montparnasse, 56ème, Avenue du Maine, 75015 Paris", 48.8430359, 2.3205622, ratings.filter(rating => rating.idRestaurant === 4)),
    new Restaurant(5, "Epicure", "112 Rue du Faubourg Saint-Honoré, 75008 Paris", 48.8717179, 2.3148011, ratings.filter(rating => rating.idRestaurant === 5)),
    new Restaurant(6, "Boutary", "25 Rue Mazarine, 75006 Paris", 48.8548953, 2.3380191, ratings.filter(rating => rating.idRestaurant === 6))
];

console.log(restaurants);

for (let restaurant in restaurants) {
    let newDiv = document.createElement("div");
    let newDivModalFade = document.createElement("div");
    let newDivModalDialog = document.createElement("div");
    let newDivModalContent = document.createElement("div");
    let newDivModalHeader = document.createElement("div");
    let newDivModalTitle = document.createElement("div");
    let buttonClose = document.createElement("button");
    let span = document.createElement("span");
    let newDivModalBody = document.createElement("div");
    let newDivComment = document.createElement("div");
    let author1 = document.createElement('h1');
    let author2 = document.createElement('h1');
    let newPcommentAuthor1 = document.createElement('p');
    let newPcommentAuthor2 = document.createElement('p');
    let note1 = document.createElement('p');
    let note2 = document.createElement('p');
    let newDivModalFooter = document.createElement("div");
    let buttonFooter = document.createElement("button");
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
    //review.style.fontWeight = "bolder";
    review.style.fontSize = "small";
    newDiv.appendChild(button);
    button.innerHTML = "Consultez les avis";
    button.setAttribute("id", restaurants[restaurant].name + restaurants[restaurant].id);
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn btn-info");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#" + restaurants[restaurant].name + "ModalScrollable");
    button.style.fontSize = "small";
    button.style.color = "black";
    newDiv.appendChild(newDivModalFade);

    newDivModalFade.setAttribute("class", "modal fade");
    newDivModalFade.setAttribute("id", restaurants[restaurant].name + "ModalScrollable");
    newDivModalFade.setAttribute("tabindex", "-1");
    newDivModalFade.setAttribute("role", "dialog");
    newDivModalFade.setAttribute("aria-labelledby", restaurants[restaurant].name + "ModalScrollableTitle");
    newDivModalFade.setAttribute("aria-hidden", "true");
    newDivModalFade.appendChild(newDivModalDialog);

    newDivModalDialog.setAttribute("class", "modal-dialog modal-dialog-scrollable");
    newDivModalDialog.setAttribute("role", "document");
    newDivModalDialog.appendChild(newDivModalContent);
    newDivModalContent.setAttribute("class", "modal-content");
    newDivModalContent.appendChild(newDivModalHeader);
    newDivModalHeader.setAttribute("class", "modal-header");
    newDivModalHeader.appendChild(newDivModalTitle);

    newDivModalTitle.setAttribute("class", "modal-title");
    newDivModalTitle.setAttribute("id", restaurants[restaurant].name + "ModalScrollableTitle");
    newDivModalTitle.innerHTML = "Restaurant : " + restaurants[restaurant].name;
    newDivModalTitle.appendChild(buttonClose);

    buttonClose.setAttribute("class", "close");
    buttonClose.setAttribute("data-dismiss", "modal");
    buttonClose.setAttribute("aria-label", "close");
    buttonClose.appendChild(span);

    span.setAttribute("aria-hidden", "true");
    span.innerHTML = "&times;";

    newDivModalContent.appendChild(newDivModalBody);
    newDivModalBody.setAttribute("class", "modal-body");
    newDivModalBody.appendChild(newDivComment);

    newDivComment.setAttribute("class", "authorComment");
    newDivComment.appendChild(author1);

    author1.setAttribute("class", "author");
    author1.innerHTML = "De la part de : " + restaurants[restaurant].ratings[0].author;

    newDivComment.appendChild(newPcommentAuthor1);
    newPcommentAuthor1.setAttribute("class", "comment");
    newPcommentAuthor1.innerHTML = restaurants[restaurant].ratings[0].comment;

    newDivComment.appendChild(note1);
    note1.setAttribute("class", "stars");
    note1.innerHTML = "Note : " + restaurants[restaurant].ratings[0].stars + " / 5";

    newDivComment.appendChild(author2);

    author2.setAttribute("class", "author");
    author2.innerHTML = "De la part de : " + restaurants[restaurant].ratings[1].author;

    newDivComment.appendChild(newPcommentAuthor2);
    newPcommentAuthor2.setAttribute("class", "comment");
    newPcommentAuthor2.innerHTML = restaurants[restaurant].ratings[1].comment;

    newDivComment.appendChild(note2);
    note2.setAttribute("class", "stars");
    note2.innerHTML = "Note : " + restaurants[restaurant].ratings[1].stars + " / 5";

    newDivModalContent.appendChild(newDivModalFooter);
    newDivModalFooter.setAttribute("class", "modal-footer");

    newDivModalFooter.appendChild(buttonFooter);
    buttonFooter.setAttribute("type", "button");
    buttonFooter.setAttribute("class", "btn btn-secondary");
    buttonFooter.setAttribute("data-dismiss", "modal");
    buttonFooter.innerHTML = "Close";

}