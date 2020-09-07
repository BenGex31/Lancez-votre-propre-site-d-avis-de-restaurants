class App {

    createListRestaurants(arrayRestaurant) {
        for (let restaurant in arrayRestaurant) {
            let newDiv = document.createElement("div");
            let newDivModalFade = document.createElement("div");
            let newDivModalDialog = document.createElement("div");
            let newDivModalContent = document.createElement("div");
            let newDivModalHeader = document.createElement("div");
            let newDivModalTitle = document.createElement("div");
            let buttonClose = document.createElement("button");
            let span = document.createElement("span");
            let newDivModalBody = document.createElement("div");
            let img = document.createElement("img");
            let newDivComment = document.createElement("div");
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
        
            ListRestaurants.appendChild(newDiv);
            newDiv.classList.add("RestaurantInfo");
            newDiv.appendChild(restaurantName);
            restaurantName.classList.add("restaurantName");
            restaurantName.setAttribute("id", arrayRestaurant[restaurant].restaurantName);
            restaurantName.innerHTML = arrayRestaurant[restaurant].id + ". " + arrayRestaurant[restaurant].restaurantName;
            newDiv.appendChild(address);
            address.classList.add("restaurantAddress");
            address.innerHTML = arrayRestaurant[restaurant].address;
            newDiv.appendChild(review);
            review.setAttribute("id", "review" + arrayRestaurant[restaurant].id);

            this.displayAverageRatings(arrayRestaurant[restaurant], review);

            review.style.color = "green";
            review.style.fontWeight = "bolder";
            review.style.fontSize = "small";
            newDiv.appendChild(button);
            button.innerHTML = "Consultez les avis";
            button.setAttribute("id", arrayRestaurant[restaurant].restaurantName + arrayRestaurant[restaurant].id);
            button.setAttribute("type", "button");
            button.setAttribute("class", "btn btn-info btn-sm");
            button.setAttribute("data-toggle", "modal");
            button.setAttribute("data-target", "#" + arrayRestaurant[restaurant].restaurantName + "ModalScrollable");
            button.style.fontSize = "small";
            button.style.color = "black";
            newDiv.appendChild(newDivModalFade);
        
            newDivModalFade.setAttribute("class", "modal fade");
            newDivModalFade.setAttribute("id", arrayRestaurant[restaurant].restaurantName + "ModalScrollable");
            newDivModalFade.setAttribute("tabindex", "-1");
            newDivModalFade.setAttribute("role", "dialog");
            newDivModalFade.setAttribute("aria-labelledby", arrayRestaurant[restaurant].restaurantName + "ModalScrollableTitle");
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
            newDivModalTitle.setAttribute("id", arrayRestaurant[restaurant].restaurantName + "ModalScrollableTitle");
            newDivModalTitle.innerHTML = "Restaurant : " + arrayRestaurant[restaurant].restaurantName;
            newDivModalTitle.appendChild(buttonClose);
        
            buttonClose.setAttribute("class", "close");
            buttonClose.setAttribute("data-dismiss", "modal");
            buttonClose.setAttribute("aria-label", "close");
            buttonClose.appendChild(span);
        
            span.setAttribute("aria-hidden", "true");
            span.innerHTML = "&times;";
        
            newDivModalTitle.appendChild(img);
            img.setAttribute("src", "https://maps.googleapis.com/maps/api/streetview?size=300x250&location=" + arrayRestaurant[restaurant].lat + "," + arrayRestaurant[restaurant].long + "&heading=151.78&pitch=-0.76&key=AIzaSyC4fKHC9oHDR8F0Zban3gY6M8LGYrIDlpc");
            img.setAttribute("class", "streetView");
        
            newDivModalContent.appendChild(newDivModalBody);
            newDivModalBody.setAttribute("class", "modal-body");
        
            newDivModalBody.appendChild(newDivComment);
        
            newDivComment.appendChild(newPcommentAuthor1);
            newPcommentAuthor1.setAttribute("class", "comment");
            newPcommentAuthor1.innerHTML = arrayRestaurant[restaurant].ratings[0].comment;
        
            newDivComment.appendChild(note1);
            note1.setAttribute("class", "stars");
            note1.innerHTML = "Note : " + arrayRestaurant[restaurant].ratings[0].stars + " / 5";
        
            newDivComment.appendChild(newPcommentAuthor2);
            newPcommentAuthor2.setAttribute("class", "comment");
            newPcommentAuthor2.innerHTML = arrayRestaurant[restaurant].ratings[1].comment;
        
            newDivComment.appendChild(note2);
            note2.setAttribute("class", "stars");
            note2.innerHTML = "Note : " + arrayRestaurant[restaurant].ratings[1].stars + " / 5";
        
            newDivModalContent.appendChild(newDivModalFooter);
            newDivModalFooter.setAttribute("class", "modal-footer");
        
            newDivModalFooter.appendChild(buttonFooter);
            buttonFooter.setAttribute("type", "button");
            buttonFooter.setAttribute("class", "btn btn-secondary");
            buttonFooter.setAttribute("data-dismiss", "modal");
            buttonFooter.innerHTML = "Close";
        }
    }

    displayAverageRatings(restaurant, review) {
        let totalStars = restaurant.ratings.reduce(function(sum, ratings){
            return sum + ratings.stars;
         }, 0);

        let averageRatings = (totalStars / restaurant.ratings.length);
        review.innerHTML = averageRatings + " / 5";
    }

    displayRestaurants() {
        this.createListRestaurants(restaurants);
    }

    filterRestaurants() {
        const filterRatings = document.getElementById("filterRatings");

        for(let restaurant in restaurants) {
            let totalStars = restaurants[restaurant].ratings.reduce(function(sum, ratings){
               return sum + ratings.stars;
            }, 0);
        
            let averageRatings = (totalStars / restaurants[restaurant].ratings.length);

            if(averageRatings >= 0 && averageRatings <= 1) {
                
            }
        }

        if (filterRatings.value >= 1 && filterRatings.value <= 5) {
            if (filterRatings.value === 1) {
                let oneStarArray = restaurants.filter(rating => rating.ratings[0].stars <= 1 || rating.ratings[1].stars <= 1);
                this.createListRestaurants(oneStarArray);
            }
            if (filterRatings.value === 2) {
                let twoStarArray = restaurants.filter(rating => rating.ratings[0].stars <= 2 || rating.ratings[1].stars <= 2);
                this.createListRestaurants(twoStarArray);
            }
            if (filterRatings.value === 3) {
                let threeStarArray = restaurants.filter(rating => rating.ratings[0].stars <= 3 || rating.ratings[1].stars <= 3);
                this.createListRestaurants(threeStarArray);
            }
            if (filterRatings.value === 4) {
                let fourStarArray = restaurants.filter(rating => rating.ratings[0].stars <= 4 || rating.ratings[1].stars <= 4);
                this.createListRestaurants(fourStarArray);
            }
            if (filterRatings.value === 5) {
                let fiveStarArray = restaurants.filter(rating => rating.ratings[0].stars <= 5 || rating.ratings[1].stars <= 5);
                this.createListRestaurants(fiveStarArray);
            }
        }
    }
}

const app = new App();
app.displayRestaurants();

const buttonFilter = document.getElementById("buttonFilter");
const filter = new App();
buttonFilter.addEventListener("change", function() {
    filter.filterRestaurants();
});