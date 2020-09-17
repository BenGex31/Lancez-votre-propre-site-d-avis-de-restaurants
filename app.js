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
            newDiv.setAttribute("id", arrayRestaurant[restaurant].restaurantName);
            newDiv.classList.add("restaurantInfo");
            newDiv.appendChild(restaurantName);

            restaurantName.classList.add("restaurantName");
            restaurantName.setAttribute("id", arrayRestaurant[restaurant].restaurantName);
            restaurantName.innerHTML = arrayRestaurant[restaurant].id + ". " + arrayRestaurant[restaurant].restaurantName;
            newDiv.appendChild(address);

            address.classList.add("restaurantAddress");
            address.innerHTML = arrayRestaurant[restaurant].address;
            address.appendChild(iconPosition);
            iconPosition.classList.add("fas");
            iconPosition.classList.add("fa-map-marker-alt");
            newDiv.appendChild(review);

            review.setAttribute("id", "review" + arrayRestaurant[restaurant].id);
            review.innerHTML = "Note moyenne : " + arrayRestaurant[restaurant].averageRatings + " / 5"
            review.style.color = "#0a3d62";
            review.style.fontWeight = "bolder";
            review.style.fontSize = "small";
            
            newDiv.appendChild(button);
            button.innerHTML = "Consultez les avis";
            button.setAttribute("id", arrayRestaurant[restaurant].restaurantName + arrayRestaurant[restaurant].id);
            button.setAttribute("type", "button");
            button.setAttribute("class", "btn btn-warning btn-sm");
            button.setAttribute("data-toggle", "modal");
            button.setAttribute("data-target", "#" + arrayRestaurant[restaurant].restaurantName + "ModalScrollable");
            button.style.fontSize = "small";
            button.style.color = "black";
            button.style.border = "0.5px solid black";
            button.style.fontWeight = "bolder";
            button.style.backgroundColor = "#82ccdd";
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
            newDivModalBody.setAttribute("id", "modal-body-consult-" + arrayRestaurant[restaurant].restaurantName);

            for (let i = 0; i < arrayRestaurant[restaurant].ratings.length; i++) {
                $('<div>').prependTo($("#modal-body-consult-" + arrayRestaurant[restaurant].restaurantName)).attr("id", "consultRating" + i + arrayRestaurant[restaurant].restaurantName);
                $('<p>').prependTo($("#consultRating" + i + arrayRestaurant[restaurant].restaurantName)).attr({id: "comment" + i + arrayRestaurant[restaurant].restaurantName, class: "comment"}).html(arrayRestaurant[restaurant].ratings[i].comment);
                $('<p>').appendTo($('#consultRating'+ i + arrayRestaurant[restaurant].restaurantName)).attr({id: "stars" + i + arrayRestaurant[restaurant].restaurantName, class: "stars"}).html("Note : " + arrayRestaurant[restaurant].ratings[i].stars + " / 5");
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
            $('<button>').appendTo($('#' + restaurant.restaurantName)).html("Rédiger un avis").attr({type: "button", class: "btn btn-primary btn-sm", id: "buttonWriteReview" + restaurant.restaurantName}).attr("data-toggle", "modal").attr("data-target", "#writeReview" + restaurant.restaurantName).css({fontSize: "small", border: "0.5px solid black", fontWeight: "bolder", backgroundColor: "#3c6382", color: "whitesmoke"});
            $('<div>').insertAfter($('#buttonWriteReview' + restaurant.restaurantName)).attr({class: 'modal fade', id: "writeReview" + restaurant.restaurantName, tabindex: "-1"}).attr('aria-labelledby', "writeReview" + restaurant.restaurantName + "Label").attr('aria-hidden', 'true');
            $('<div>').appendTo($('#writeReview' + restaurant.restaurantName)).attr({class: "modal-dialog", id: "modal-dialog-writeReview" + restaurant.restaurantName});
            $('<div>').appendTo($('#modal-dialog-writeReview' + restaurant.restaurantName)).attr({class: "modal-content", id: "modal-content-writeReview" + restaurant.restaurantName});
            $('<div>').appendTo($('#modal-content-writeReview' + restaurant.restaurantName)).attr({class: "modal-header", id: "modal-header-writeReview" + restaurant.restaurantName});
            $('<h6>').appendTo($("#modal-header-writeReview" + restaurant.restaurantName)).attr({class: "modal-title animate__animated animate__fadeInRight animate__delay-0.5s", id: "writeReview" + restaurant.restaurantName + "Label"}).html("Restaurant : " + restaurant.restaurantName);
            $('<button>').appendTo($("#modal-header-writeReview" + restaurant.restaurantName)).attr({type: "button", class: "close", id: "buttonCloseWriteReview" + restaurant.restaurantName}).attr('data-dismiss', 'modal').attr('aria-label', 'Close');
            $('<span>').appendTo($("#buttonCloseWriteReview" + restaurant.restaurantName)).attr('aria-hidden', 'true').html("&times;");
            $('<div>').appendTo($("#modal-content-writeReview" + restaurant.restaurantName)).attr({class: "modal-body", id: "modal-body-writeReview" + restaurant.restaurantName});
            $('<h5>').appendTo($("#modal-body-writeReview" + restaurant.restaurantName)).html("Votre avis compte aussi !").css({color: "darkgreen", fontWeight: "bolder"}).addClass("text-center animate__animated animate__flash animate__delay-1s").css("margin-bottom", "1em");
            $('<div>').appendTo($("#modal-body-writeReview" + restaurant.restaurantName)).attr({class: "input-group mb-3", id: "input-group" + restaurant.restaurantName});
            $('<div>').appendTo($("#input-group" + restaurant.restaurantName)).attr({class: "input-group-prepend", id: "input-group-prepend" + restaurant.restaurantName});
            $('<label>').appendTo($("#input-group-prepend" + restaurant.restaurantName)).attr({class: "input-group-text", for: "inputGroupSelect" + restaurant.restaurantName}).html("Sélectionner votre note entre 1 et 5 : ").css("background-color", "#f8c291").css("font-size", "small");
            $('<select>').appendTo($("#input-group" + restaurant.restaurantName)).attr({class: "custom-select", id: "inputGroupSelect" + restaurant.restaurantName, type: "number"}).css("font-size", "small");
            $('<option>').appendTo($("#inputGroupSelect" + restaurant.restaurantName)).attr("value", "").html("Faites votre choix");

            for(let i = 1; i <= 5; i++) {
                $('<option>').appendTo($("#inputGroupSelect" + restaurant.restaurantName)).attr("value", i).html(i);
            }
            
            $('<form>').appendTo($("#modal-body-writeReview" + restaurant.restaurantName)).addClass("formComment" + restaurant.restaurantName);
            $('<div>').appendTo($(".formComment" + restaurant.restaurantName)).attr({class: "form-group", id: "form-group" +restaurant.restaurantName});
            $('<label>').appendTo($("#form-group" +restaurant.restaurantName)).attr("for", "FormControlTextarea" + restaurant.restaurantName).html("Ecrire votre commentaire :").css("font-size", "small");
            $('<textarea>').appendTo($("#form-group" +restaurant.restaurantName)).attr({class: "form-control", id: "FormControlTextarea" + restaurant.restaurantName, col: "3", rows: "3"});
            $('<div>').appendTo($("#modal-body-writeReview" + restaurant.restaurantName)).attr("id", "resultReview" + restaurant.restaurantName);
            $('<p>').appendTo($("#resultReview" + restaurant.restaurantName)).attr("id", "resultRating" + restaurant.restaurantName).html("Votre note : ").css({fontSize: "small", fontWeight: "bolder"});
            $('<span>').appendTo($("#resultRating" + restaurant.restaurantName)).attr("id", "spanResultRating"+ restaurant.restaurantName).css({fontSize: "small", fontStyle: "italic", color: "black"});
            $('<p>').appendTo($("#resultReview" + restaurant.restaurantName)).attr("id", "resultComment" + restaurant.restaurantName).html("Votre commentaire : ").css({fontSize: "small", fontWeight: "bolder"});
            $('<span>').appendTo($("#resultComment" + restaurant.restaurantName)).attr("id", "spanResultComment" + restaurant.restaurantName).css({fontSize: "small", fontStyle: "italic", color: "black"});

            $("#inputGroupSelect" + restaurant.restaurantName).change(function(event){
                $("#spanResultRating" + restaurant.restaurantName).html(event.target.value);
            });

            $("#FormControlTextarea" + restaurant.restaurantName).change(function(event){
                $("#spanResultComment" + restaurant.restaurantName).html('"' + event.target.value + '"');
            });

            $('<div>').appendTo($("#modal-content-writeReview" + restaurant.restaurantName)).attr({class: "modal-footer", id: "modal-footer-writeReview" + restaurant.restaurantName});
            $('<button>').appendTo($("#modal-footer-writeReview" + restaurant.restaurantName)).attr({type: "button", class: "btn btn-secondary btn-sm"}).attr('data-dismiss', 'modal').html("Fermer").css("font-size", "small");
            $('<button>').appendTo($("#modal-footer-writeReview" + restaurant.restaurantName)).attr({type: "submit", class: "btn btn-primary btn-sm", id: "publishReview" + restaurant.restaurantName}).html("Publier un avis").css("font-size", "small");
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
            let inputGroupSelectRestaurant = document.getElementById("inputGroupSelect" + restaurant.restaurantName);
            let FormControlTextareaRestaurant = document.getElementById("FormControlTextarea" + restaurant.restaurantName);
            let restaurantsName = document.getElementById(restaurant.restaurantName);

            $("#publishReview" + restaurant.restaurantName).on("click", function(){
                //debugger;
                if (restaurant.restaurantName === restaurantsName.id) {
                    console.log(restaurantsName.id);
                    $("#inputGroupSelect" + restaurant.restaurantName).change(function(number){
                        $("#FormControlTextarea" + restaurant.restaurantName).change(function(text){
                            restaurant.ratings.push({
                                stars: parseInt(number.target.value),
                                comment: text.target.value
                            });
                        });
                    });
                    $("#modal-body-consult-" + restaurant.restaurantName).html("");
                }

                for (let i = 0; i < restaurant.ratings.length; i++) {
                    $('<div>').prependTo($("#modal-body-consult-" + restaurant.restaurantName)).attr("id", "consultRating" + i + restaurant.restaurantName);
                    $('<p>').prependTo($("#consultRating" + i + restaurant.restaurantName)).addClass("comment").html(restaurant.ratings[i].comment);
                    $('<p>').appendTo($('#consultRating'+ i + restaurant.restaurantName)).addClass("stars").html("Note : " + restaurant.ratings[i].stars + " / 5");
                }

                $("#publishReview" + restaurant.restaurantName).attr("disabled", "true");
                $('<p>').appendTo($("#modal-body-writeReview" + restaurant.restaurantName)).html("Votre avis a bien été enregistré !").addClass("alertMessage text-center animate__animated animate__flash").css({color: "red", fontWeight: "bolder", fontSize: "small"});
                $('<p>').appendTo($("#modal-body-writeReview" + restaurant.restaurantName)).html("Merci de bien vouloir cliquer sur Fermer").addClass("alertMessage text-center animate__animated animate__flash").css({color: "red", fontWeight: "bolder", fontSize: "small"});

                let totalStars = restaurant.ratings.reduce(function(sum, ratings){
                    return sum + ratings.stars;
                    }, 0);
                
                let averageRatings = (totalStars / restaurant.ratings.length);
            
                restaurant.averageRatings = averageRatings;
                restaurant.sumStars = totalStars;
                restaurant.numberRatings = restaurant.ratings.length;
                $("#review" + restaurant.id).html("Note moyenne : " + Math.floor(restaurant.averageRatings) + " / 5");
            });

            $("#modal-footer-writeReview" + restaurant.restaurantName +  " .btn-secondary").click(function(){
                inputGroupSelectRestaurant.value = "";
                $("#spanResultRating" + restaurant.restaurantName).html("");
                FormControlTextareaRestaurant.value = "";
                $("#spanResultComment" + restaurant.restaurantName).html("");
                $('.alertMessage').remove();
                $("#publishReview" + restaurant.restaurantName).removeAttr("disabled");
            });
        }
    }
}

const buttonFilter = document.getElementById("buttonFilter");

const filter = new App();

buttonFilter.addEventListener("click", function(){
    filter.filterRestaurants();
});