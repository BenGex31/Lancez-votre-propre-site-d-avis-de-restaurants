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
            let newDivModalFooter = document.createElement("div");
            let buttonFooter = document.createElement("button");
            let address = document.createElement("p");
            let iconPosition = document.createElement("i");
            let review = document.createElement("p");
            let restaurantName = document.createElement("h5");
            let restaurantNameH6 = document.createElement("h6");
            let ListRestaurants = document.getElementById("restaurantsList");
            let button = document.createElement("button");
        
            ListRestaurants.appendChild(newDiv);
            newDiv.setAttribute("id", arrayRestaurant[restaurant].id);
            newDiv.classList.add("restaurantInfo");
            newDiv.appendChild(restaurantName);

            restaurantName.classList.add("restaurantName");
            restaurantName.setAttribute("id", "restaurantName" + arrayRestaurant[restaurant].id);
            restaurantName.innerHTML = arrayRestaurant[restaurant].restaurantName;
            newDiv.appendChild(address);

            address.classList.add("restaurantAddress");
            address.innerHTML = arrayRestaurant[restaurant].address;
            address.appendChild(iconPosition);
            iconPosition.classList.add("fas");
            iconPosition.classList.add("fa-map-marker-alt");
            newDiv.appendChild(review);

            review.setAttribute("id", "review" + arrayRestaurant[restaurant].id);

            for (let i = 0; i < arrayRestaurant[restaurant].ratings.length; i++) {
                let totalStars = arrayRestaurant[restaurant].ratings.reduce(function(sum, ratings){
                    return sum + ratings.stars;
                 }, 0);
              
                 if (arrayRestaurant[restaurant].ratings.length > 1) {
                    let averageRatings = (totalStars / arrayRestaurant[restaurant].ratings.length);
                    arrayRestaurant[restaurant].averageRatings = averageRatings.toFixed(1);
                    arrayRestaurant[restaurant].sumStars = totalStars;
                    arrayRestaurant[restaurant].numberRatings = arrayRestaurant[restaurant].ratings.length;
                    review.innerHTML = "Note moyenne : " + arrayRestaurant[restaurant].averageRatings + " / 5";
        
                 } else if (arrayRestaurant[restaurant].ratings.length <= 1) {
                    arrayRestaurant[restaurant].sumStars = totalStars;
                    arrayRestaurant[restaurant].numberRatings = arrayRestaurant[restaurant].ratings.length;
                    review.innerHTML = "Note moyenne : " + arrayRestaurant[restaurant].ratings[i].stars + " / 5";
                }
            }

            review.style.color = "#0a3d62";
            review.style.fontWeight = "bolder";
            review.style.fontSize = "small";
            
            newDiv.appendChild(button);
            button.innerHTML = "Consultez les avis";
            button.setAttribute("id", "buttonReview" + arrayRestaurant[restaurant].id);
            button.setAttribute("type", "button");
            button.setAttribute("class", "btn btn-warning btn-sm");
            button.setAttribute("data-toggle", "modal");
            button.setAttribute("data-target", "#" + "Review" + arrayRestaurant[restaurant].id + "ModalScrollable");
            button.style.fontSize = "small";
            button.style.color = "black";
            button.style.border = "0.5px solid black";
            button.style.fontWeight = "bolder";
            button.style.backgroundColor = "#82ccdd";
            newDiv.appendChild(newDivModalFade);

            newDivModalFade.setAttribute("class", "modal fade");
            newDivModalFade.setAttribute("id", "Review" + arrayRestaurant[restaurant].id + "ModalScrollable");
            newDivModalFade.setAttribute("tabindex", "-1");
            newDivModalFade.setAttribute("role", "dialog");
            newDivModalFade.setAttribute("aria-labelledby", "ReviewTitle" + arrayRestaurant[restaurant].id + "ModalScrollableTitle");
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
            newDivModalTitle.setAttribute("id", "ReviewTitle" + arrayRestaurant[restaurant].id + "ModalScrollableTitle");
            newDivModalTitle.appendChild(restaurantNameH6);
            restaurantNameH6.innerHTML = "Restaurant : " + arrayRestaurant[restaurant].restaurantName;
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
            newDivModalBody.setAttribute("id", "modal-body-consult-restaurant" + arrayRestaurant[restaurant].id);

            for (let i = 0; i < arrayRestaurant[restaurant].ratings.length; i++) {
                $('<div>').prependTo($("#modal-body-consult-restaurant" + arrayRestaurant[restaurant].id)).attr("id", "consultRating" + i + "Restaurant" + arrayRestaurant[restaurant].id);
                $('<p>').prependTo($("#consultRating" + i + "Restaurant" + arrayRestaurant[restaurant].id)).attr({id: "comment" + i + arrayRestaurant[restaurant].restaurantName, class: "comment"}).html(arrayRestaurant[restaurant].ratings[i].comment);
                $('<p>').appendTo($("#consultRating" + i + "Restaurant" + arrayRestaurant[restaurant].id)).attr({id: "stars" + i + arrayRestaurant[restaurant].restaurantName, class: "stars"}).html("Note : " + arrayRestaurant[restaurant].ratings[i].stars + " / 5");
            }
        
            newDivModalContent.appendChild(newDivModalFooter);
            newDivModalFooter.setAttribute("class", "modal-footer");
        
            newDivModalFooter.appendChild(buttonFooter);
            buttonFooter.setAttribute("type", "button");
            buttonFooter.setAttribute("class", "btn btn-secondary");
            buttonFooter.setAttribute("data-dismiss", "modal");
            buttonFooter.innerHTML = "Fermer";
            buttonFooter.style.fontSize = "small";
        }
    }

    createButtonWriteReview(arrayRestaurant) {
        for (let restaurant of arrayRestaurant) {
            $('<button>').appendTo($('#' + restaurant.id)).html("Rédiger un avis").attr({type: "button", class: "btn btn-primary btn-sm", id: "buttonWriteReview" + restaurant.id}).attr("data-toggle", "modal").attr("data-target", "#writeReview" + restaurant.id).css({fontSize: "small", border: "0.5px solid black", fontWeight: "bolder", backgroundColor: "#3c6382", color: "whitesmoke"});
            $('<div>').insertAfter($('#buttonWriteReview' + restaurant.id)).attr({class: 'modal fade', id: "writeReview" + restaurant.id, tabindex: "-1"}).attr('aria-labelledby', "writeReview" + restaurant.id + "Label").attr('aria-hidden', 'true');
            $('<div>').appendTo($('#writeReview' + restaurant.id)).attr({class: "modal-dialog", id: "modal-dialog-writeReview" + restaurant.id});
            $('<div>').appendTo($('#modal-dialog-writeReview' + restaurant.id)).attr({class: "modal-content", id: "modal-content-writeReview" + restaurant.id});
            $('<div>').appendTo($('#modal-content-writeReview' + restaurant.id)).attr({class: "modal-header", id: "modal-header-writeReview" + restaurant.id});
            $('<h6>').appendTo($("#modal-header-writeReview" + restaurant.id)).attr({class: "modal-title animate__animated animate__fadeInRight animate__delay-0.5s", id: "writeReview" + restaurant.id + "Label"}).html("Restaurant : " + restaurant.restaurantName);
            $('<button>').appendTo($("#modal-header-writeReview" + restaurant.id)).attr({type: "button", class: "close", id: "buttonCloseWriteReview" + restaurant.id}).attr('data-dismiss', 'modal').attr('aria-label', 'Close');
            $('<span>').appendTo($("#buttonCloseWriteReview" + restaurant.id)).attr('aria-hidden', 'true').html("&times;");
            $('<div>').appendTo($("#modal-content-writeReview" + restaurant.id)).attr({class: "modal-body", id: "modal-body-writeReview" + restaurant.id});
            $('<h5>').appendTo($("#modal-body-writeReview" + restaurant.id)).html("Votre avis compte aussi !").css({color: "darkgreen", fontWeight: "bolder"}).addClass("text-center animate__animated animate__flash animate__delay-1s").css("margin-bottom", "1em");
            
            $('<div>').appendTo($("#modal-body-writeReview" + restaurant.id)).attr({class: "input-group mb-3", id: "input-group" + restaurant.id});
            $('<div>').appendTo($("#input-group" + restaurant.id)).attr({class: "input-group-prepend", id: "input-group-prepend" + restaurant.id});
            $('<label>').appendTo($("#input-group-prepend" + restaurant.id)).attr({class: "input-group-text", for: "inputGroupSelectRestaurant" + restaurant.id}).html("Sélectionner votre note entre 1 et 5 : ").css("background-color", "#f8c291").css("font-size", "small");
            $('<select>').appendTo($("#input-group" + restaurant.id)).attr({class: "custom-select", id: "inputGroupSelectRestaurant" + restaurant.id, type: "number"}).css("font-size", "small");
            $('<option>').appendTo($("#inputGroupSelectRestaurant" + restaurant.id)).attr("value", "").html("Faites votre choix");

            for(let i = 1; i <= 5; i++) {
                $('<option>').appendTo($("#inputGroupSelectRestaurant" + restaurant.id)).attr("value", i).html(i);
            }
            
            $('<form>').appendTo($("#modal-body-writeReview" + restaurant.id)).addClass("formComment" + restaurant.id);
            $('<div>').appendTo($(".formComment" + restaurant.id)).attr({class: "form-group", id: "form-group" +restaurant.id});
            $('<label>').appendTo($("#form-group" + restaurant.id)).attr("for", "FormControlTextareaRestaurant" + restaurant.id).html("Ecrire votre commentaire :").css("font-size", "small");
            $('<textarea>').appendTo($("#form-group" + restaurant.id)).attr({class: "form-control", id: "FormControlTextareaRestaurant" + restaurant.id, col: "3", rows: "3"});
            $('<div>').appendTo($("#modal-body-writeReview" + restaurant.id)).attr("id", "resultReview" + restaurant.id);
            $('<p>').appendTo($("#resultReview" + restaurant.id)).attr("id", "resultRating" + restaurant.id).html("Votre note : ").css({fontSize: "small", fontWeight: "bolder"});
            $('<span>').appendTo($("#resultRating" + restaurant.id)).attr("id", "spanResultRating"+ restaurant.id).css({fontSize: "small", fontStyle: "italic", color: "black"});
            $('<p>').appendTo($("#resultReview" + restaurant.id)).attr("id", "resultComment" + restaurant.id).html("Votre commentaire : ").css({fontSize: "small", fontWeight: "bolder"});
            $('<span>').appendTo($("#resultComment" + restaurant.id)).attr("id", "spanResultComment" + restaurant.id).css({fontSize: "small", fontStyle: "italic", color: "black"});

            $("#inputGroupSelectRestaurant" + restaurant.id).change(function(event){
                $("#spanResultRating" + restaurant.id).html(event.target.value);
            });

            $("#FormControlTextareaRestaurant" + restaurant.id).change(function(event){
                $("#spanResultComment" + restaurant.id).html('"' + event.target.value + '"');
            });

            $('<div>').appendTo($("#modal-content-writeReview" + restaurant.id)).attr({class: "modal-footer", id: "modal-footer-writeReview" + restaurant.id});
            $('<button>').appendTo($("#modal-footer-writeReview" + restaurant.id)).attr({type: "button", class: "btn btn-secondary btn-sm"}).attr('data-dismiss', 'modal').html("Fermer").css("font-size", "small");
            $('<button>').appendTo($("#modal-footer-writeReview" + restaurant.id)).attr({type: "submit", class: "btn btn-primary btn-sm", id: "publishReview" + restaurant.id}).html("Publier un avis").css("font-size", "small");
        }
    }

    displayRestaurants() {
        this.createListRestaurants(restaurants);
        this.createButtonWriteReview(restaurants);
    }

    clearListRestaurants() {
        $("#restaurantsList").html("");
    }

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
        
        switch(filterRatings.value) {
            case "1":
                this.clearListRestaurants();
                this.createListRestaurants(oneStarArray);
                this.createButtonWriteReview(oneStarArray);
                map.createMarkerRestaurants(oneStarArray);
                this.publishReview();
                break;
            case "2":
                this.clearListRestaurants();
                this.createListRestaurants(twoStarArray);
                this.createButtonWriteReview(twoStarArray);
                map.createMarkerRestaurants(twoStarArray);
                this.publishReview();
                break;
            case "3":
                this.clearListRestaurants();
                this.createListRestaurants(threeStarArray);
                this.createButtonWriteReview(threeStarArray);
                map.createMarkerRestaurants(threeStarArray);
                this.publishReview();
                break;
            case "4":
                this.clearListRestaurants();
                this.createListRestaurants(fourStarArray);
                this.createButtonWriteReview(fourStarArray);
                map.createMarkerRestaurants(fourStarArray);
                this.publishReview();
                break;
            case "5":
                this.clearListRestaurants();
                this.createListRestaurants(fiveStarArray);
                this.createButtonWriteReview(fiveStarArray);
                map.createMarkerRestaurants(fiveStarArray);
                this.publishReview();
                break;
            default:
                this.clearListRestaurants();
                this.displayRestaurants();
                map.createMarkerRestaurants(restaurants);
                this.publishReview();
        }
    }

    publishReview() {
        for (let restaurant of restaurants) {
            let inputGroupSelectRestaurant = document.getElementById("inputGroupSelectRestaurant" + restaurant.id);
            let FormControlTextareaRestaurant = document.getElementById("FormControlTextareaRestaurant" + restaurant.id);
            let restaurantsName = document.getElementById(restaurant.id);

            $("#publishReview" + restaurant.id).on("click", function(){
                if (inputGroupSelectRestaurant.value >= 1 && inputGroupSelectRestaurant.value <= 5 && FormControlTextareaRestaurant.value) {
                    if (restaurant.id === parseInt(restaurantsName.id)) {
                            restaurant.ratings.push({
                                stars: parseInt(inputGroupSelectRestaurant.value),
                                comment: FormControlTextareaRestaurant.value
                            });
                        $("#modal-body-consult-restaurant" + restaurant.id).html("");
                    }
    
                    for (let i = 0; i < restaurant.ratings.length; i++) {
                        $('<div>').prependTo($("#modal-body-consult-restaurant" + restaurant.id)).attr("id", "consultRating" + i + "Restaurant" + restaurant.id);
                        $('<p>').prependTo($("#consultRating" + i + "Restaurant" + restaurant.id)).addClass("comment").attr("id", "comment" + i + "Restaurant" + restaurant.id).html(restaurant.ratings[i].comment);
                        $('<p>').appendTo($('#consultRating'+ i + "Restaurant" + restaurant.id)).addClass("stars").attr("id", "stars" + i + "Restaurant" + restaurant.id).html("Note : " + restaurant.ratings[i].stars + " / 5");
                    }
    
                    $("#publishReview" + restaurant.id).attr("disabled", "true");
                    $('<p>').appendTo($("#modal-body-writeReview" + restaurant.id)).html("Votre avis a bien été enregistré !").addClass("alertMessage text-center animate__animated animate__flash").css({color: "red", fontWeight: "bolder", fontSize: "small"});
                    $('<p>').appendTo($("#modal-body-writeReview" + restaurant.id)).html("Merci de bien vouloir cliquer sur Fermer").addClass("alertMessage text-center animate__animated animate__flash").css({color: "red", fontWeight: "bolder", fontSize: "small"});
    
                    let totalStars = restaurant.ratings.reduce(function(sum, ratings){
                        return sum + ratings.stars;
                        }, 0);
                    
                    let averageRatings = (totalStars / restaurant.ratings.length);
                
                    restaurant.averageRatings = averageRatings.toFixed(1);
                    restaurant.sumStars = totalStars;
                    restaurant.numberRatings = restaurant.ratings.length;
                    $("#review" + restaurant.id).html("Note moyenne : " + restaurant.averageRatings + " / 5");
                } else {
                    alert("Merci de renseigner une note et un commentaire, sinon merci de cliquer sur Fermer")
                }
            });
                
            $("#modal-footer-writeReview" + restaurant.id +  " .btn-secondary").click(function(){
                inputGroupSelectRestaurant.value = "";
                $("#spanResultRating" + restaurant.id).html("");
                FormControlTextareaRestaurant.value = "";
                $("#spanResultComment" + restaurant.id).html("");
                $('.alertMessage').remove();
                $("#publishReview" + restaurant.id).removeAttr("disabled");
            });
        }
    }
}

let buttonFilter = document.getElementById("buttonFilter");
let filter = new App();
buttonFilter.addEventListener("click", function(){
    filter.filterRestaurants();
});

let buttonUpdate = document.getElementById("buttonUpdate");

buttonUpdate.addEventListener("click", function(){
    filter.filterRestaurants();
    $(".alertUpdateLink").remove();
    alert("La liste des restaurant a bien été mise à jour");
});

console.log(restaurants);