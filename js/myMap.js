class MyMap {
    newLat;
    newLng;

    constructor(lat, long) {
        this.lat = lat;
        this.long = long;
        this.city = {lat: this.lat, lng: this.long};
        this.zoom = 12;
        this.map = new google.maps.Map(document.getElementById('map'), {zoom: this.zoom, /*center: this.city*/});
    }

    createMap() {
        //new google.maps.Marker({position: this.city, map: this.map, label: "Paris"});
        this.geolocation();
        this.addMarkerRestaurant();
    }

    geolocation() {
        const map = this.map;
        const ParisLocation = this.city;
        var self = this;

        let listResults = new Restaurant();
        let infoWindow = new google.maps.InfoWindow;

        //let geolocation = document.getElementById("geolocation");
        //geolocation.addEventListener("click", function(){

            $("#buttonFilter").attr("disabled", "true");
            $("#titleListRestaurant").removeAttr("disabled");
            restaurantsList = [];

            listResults.clearListRestaurants();
            listResults.clearMarkers();

            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    alert("Le service de géolocalisation s'est lancé avec succès");

                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    self.buildAndDisplayMap(pos, listResults, map);

                }, function() {
                    self.buildAndDisplayDefaultMap(listResults, map);
                });
            } else {
                this.buildAndDisplayDefaultMap(listResults, map);
            }
        //});
    }

    buildAndDisplayDefaultMap(listResults, map) {
        alert("La position par défaut a été définie sur Paris");

        const pos = {
            lat: 48.8565387,
            lng: 2.3518054
        };

        this.buildAndDisplayMap(pos, listResults, map);
    }

    buildAndDisplayMap(pos, listResults, map) {
        console.log(pos);

        let filterRatings = document.getElementById("filterRatings");
        filterRatings.value = "Toutes notes moyennes confondues";

        let filterRadius = document.getElementById("filterRadius");
        
        filterRadius.addEventListener("change", function (event) {
            restaurantsList = [];
            listResults.getRestaurantsListWithReviews(pos, map, event.target.value);
        });

        $("#titleListRestaurant").on("click", function () {
            $("#titleListRestaurant").html("Liste des restaurants").removeClass("animate__animated animate__heartBeat").css("color", "black");
            listResults.clearListRestaurants();
            listResults.createListResults(restaurantsList);
            listResults.createButtonConsultReviewResults(restaurantsList);
            listResults.createButtonWriteReviewResults(restaurantsList);
            listResults.clearMarkers();
            listResults.createMarkerResults(restaurantsList, map);
            listResults.displayMarkersOnMap(map);
            listResults.publishReview(restaurantsList);

            if (filterRadius.value >= 100 && filterRadius.value <= 7000) {
                $(".infoNumberRestaurant").html("");
                $("#buttonFilter").removeAttr("disabled");
                if (restaurantsList.length > 1) {
                    $(".infoNumberRestaurant").html(restaurantsList.length + " restaurants autour de vous");
                } else {
                    $(".infoNumberRestaurant").html("Aucun restaurant autour de vous");
                }
                if (restaurantsList.length == 1) {
                    $(".infoNumberRestaurant").html(restaurantsList.length + " restaurant autour de vous");
                }
            } else {
                alert("Merci de sélectionner une distance");
                $(".infoNumberRestaurant").html("");
            }
        });

        $("#buttonFilter").on("click", function () {
            listResults.filterResultsRating(restaurantsList, map);
        });

        let MarkerUser = new google.maps.Marker({
            position: pos,
            animation: google.maps.Animation.DROP,
            label: "Vous êtes ici !",
            icon: {
                url: "img/icon-user-location.png",
                scaledSize: new google.maps.Size(50, 50),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 0)
            }
        });
        MarkerUser.setMap(map);

        map.setCenter(pos);
    }

    addMarkerRestaurant() {
        const map = this.map;

        map.addListener("click", event => {
            this.placeMarkerRestaurantAndPanTo(event.latLng, map);
            this.newLat = event.latLng.lat();
            this.newLng = event.latLng.lng();

            this.createButtonAddRestaurant();

            const addNewRestaurantOnMap = new Restaurant();
            addNewRestaurantOnMap.addNewRestaurantArray(event.latLng.lat(), event.latLng.lng());
            $("#buttonUpdate").removeAttr("disabled");
        });
    }

    placeMarkerRestaurantAndPanTo(latLng, map) {
        let markerNewRestaurant = new google.maps.Marker({
            position: latLng,
            animation: google.maps.Animation.DROP,
            label: "Nouveau restaurant",
            icon: {
                url: "img/icon-restaurant-location.png",
                scaledSize: new google.maps.Size(50, 50),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 0)
            }
        });

        this.displayMarkerNewRestaurant(markerNewRestaurant, map);
        map.panTo(latLng);
        this.createInfoWindowNewMarker(markerNewRestaurant, map);
        markerNewRestaurantArray.push(markerNewRestaurant);
    }

    displayMarkerNewRestaurant(markerNewRestaurant, map) {
        markerNewRestaurant.setMap(map);
    }

    createButtonAddRestaurant() {
        $('<div>').insertAfter($("#map")).attr("id", "divAddRestaurant");

        $('<div>').appendTo($("#divAddRestaurant")).attr({class:"modal fade", id:"addRestaurantModal", tabindex:"-1"}).attr("aria-labelledby", "addRestaurantModalLabel").attr("aria-hidden", "true");
        $('<div>').appendTo($("#addRestaurantModal")).attr({class:"modal-dialog", id:"modal-dialog-addRestaurant"});
        $('<div>').appendTo($("#modal-dialog-addRestaurant")).attr({class:"modal-content", id:"modal-content-addRestaurant"});
        $('<div>').appendTo($("#modal-content-addRestaurant")).attr({class:"modal-header", id:"modal-header-addRestaurant"});
        $('<h5>').appendTo($("#modal-header-addRestaurant")).attr({class:"modal-title", id:"addRestaurantModalLabel"}).html("Partagez votre expérience");
        
        $('<div>').appendTo($("#modal-content-addRestaurant")).attr({class:"modal-body", id:"modal-body-addRestaurant"});

        $('<form>').appendTo($("#modal-body-addRestaurant")).attr("id", "form-addRestaurant");

        $('<div>').appendTo($("#form-addRestaurant")).attr({class:"form-group row text-left", id:"addUserName-form-group"});
        $('<label>').appendTo($("#addUserName-form-group")).attr({for:"inputUserName", class:"col-lg-6 col-form-label"}).html("* Votre nom :");
        $('<div>').appendTo($("#addUserName-form-group")).attr({class:"col-lg-6", id:"divInputUserName"});
        $('<input>').appendTo($("#divInputUserName")).attr({type:"text", class:"form-control", id:"inputUserName"});

        $('<div>').appendTo($("#form-addRestaurant")).attr({class:"form-group row text-left", id:"addUserFirstName-form-group"});
        $('<label>').appendTo($("#addUserFirstName-form-group")).attr({for:"inputUserFirstName", class:"col-lg-6 col-form-label"}).html("* Votre prénom :");
        $('<div>').appendTo($("#addUserFirstName-form-group")).attr({class:"col-lg-6", id:"divInputUserFirstName"});
        $('<input>').appendTo($("#divInputUserFirstName")).attr({type:"text", class:"form-control", id:"inputUserFirstName"});

        $('<div>').appendTo($("#form-addRestaurant")).attr({class:"form-group row text-left", id:"addRestaurantName-form-group"});
        $('<label>').appendTo($("#addRestaurantName-form-group")).attr({for:"inputRestaurantName", class:"col-lg-6 col-form-label"}).html("* Nom du restaurant :");
        $('<div>').appendTo($("#addRestaurantName-form-group")).attr({class:"col-lg-6", id:"divInputRestaurantName"});
        $('<input>').appendTo($("#divInputRestaurantName")).attr({type:"text", class:"form-control", id:"inputRestaurantName"});

        $('<div>').appendTo($("#form-addRestaurant")).attr({class:"form-group row text-left", id:"addRestaurantAddress-form-group"});
        $('<label>').appendTo($("#addRestaurantAddress-form-group")).attr({for:"inputRestaurantAddress", class:"col-lg-6 col-form-label"}).html("* Adresse du restaurant :");
        $('<div>').appendTo($("#addRestaurantAddress-form-group")).attr({class:"col-lg-6", id:"divInputRestaurantAddress"});
        $('<input>').appendTo($("#divInputRestaurantAddress")).attr({type:"text", class:"form-control", id:"inputRestaurantAddress"});

        $('<div>').appendTo($("#form-addRestaurant")).attr({class:"input-group mb-3", id:"input-group-RestaurantRating"});
        $('<div>').appendTo($("#input-group-RestaurantRating")).attr({class:"input-group-prepend", id:"input-group-prependRestaurantRating"});
        $('<label>').appendTo($("#input-group-prependRestaurantRating")).attr({class:"input-group-text", for:"inputGroupSelectRestaurantRating"}).html("* Votre note :");
        $('<select>').appendTo($("#input-group-RestaurantRating")).attr({class:"custom-select", id:"inputGroupSelectRestaurantRating", type:"number"});
        $('<option>').appendTo($("#inputGroupSelectRestaurantRating")).html("Faites votre choix");

        for(let i = 1; i <= 5; i++) {
            $('<option>').appendTo($("#inputGroupSelectRestaurantRating")).attr("value", i).html(i);
        }

        $('<div>').appendTo($("#form-addRestaurant")).attr({class:"form-group text-left", id:"form-group-restaurantComment"});
        $('<label>').appendTo($("#form-group-restaurantComment")).attr({for:"FormControlTextareaRestaurantComment"}).html("* Ecrire votre commentaire :");
        $('<textarea>').appendTo($("#form-group-restaurantComment")).attr({class:"form-control", id:"FormControlTextareaRestaurantComment", col:"3", row:"3"});

        $('<p>').appendTo($("#form-addRestaurant")).html("* Champs obligatoires").addClass("text-left").css("color", "red");
        $('<i>').appendTo($("#form-addRestaurant")).addClass("fas fa-exclamation-triangle animate__animated animate__flash").css({fontSize:"3em", color:"red", marginBottom:"0.5em"});
        $('<p>').appendTo($("#form-addRestaurant")).html("Informations importantes :").addClass("text-center animate__animated animate__flash");
        $('<p>').appendTo($("#form-addRestaurant")).html("Cliquez sur Enregistrer pour valider votre ajout").addClass("text-center animate__animated animate__flash");

        $('<div>').appendTo($("#modal-content-addRestaurant")).attr({class:"modal-footer", id:"modal-footer-addRestaurant"});
        $('<a>').appendTo($("#modal-footer-addRestaurant")).attr({href:"#updateLink", id:"linkCloseAddRestaurant"});
        $('<button>').appendTo($("#linkCloseAddRestaurant")).attr({type:"submit", class:"btn btn-secondary btn-sm", id:"btnCloseAddRestaurant"}).attr("data-dismiss", "modal").html("Fermer");
        $('<button>').appendTo($("#modal-footer-addRestaurant")).attr({type:"submit", class:"btn btn-primary btn-sm", id:"btnSaveAddRestaurant"}).html("Enregistrer");
    }

    createInfoWindowNewMarker(marker, map) {
        let contentString = 
        '<button class="btn btn-primary btn-sm" type="button" id="addRestaurant" data-toggle="modal" data-target="#addRestaurantModal">Ajouter un restaurant</button>';
        //'<button class="btn btn-primary btn-sm" type="button" id="removeMarker">Supprimer le marqueur</button>';

        let infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });
    }
}

let markerNewRestaurantArray = [];
console.log(markerNewRestaurantArray);