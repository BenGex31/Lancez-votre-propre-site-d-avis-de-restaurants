/**
 * Class that allows you to customize the Google Maps map
 */
class MyMap {
    newLat;
    newLng;

    constructor() {
        this.map = new google.maps.Map(document.getElementById('map'), {zoom: 12});
    }

    /**
     * Initializes the Google Maps map
     */
    createMap() {
        this.geolocation();
        this.addMarkerRestaurant();
    }

    /**
     * Allows to define the geolocation of the user, otherwise the position in Paris is defined
     */
    geolocation() {
        const map = this.map;
        var self = this;
        let listResults = new Restaurant();

        $("#buttonFilter").attr("disabled", "true");
        $("#titleListRestaurant").removeAttr("disabled");

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
    }

    /**
     * Builds the position and displays the default Google Maps of Paris on the HTML page, as well as the list of restaurants retrieved from the Google Places API
     * @param {object} listResults - Generic instance of the "Restaurant" class
     * @param {object} map - Google Maps
     */
    buildAndDisplayDefaultMap(listResults, map) {
        alert("La position par défaut a été définie sur Paris");

        const pos = {
            lat: 48.8565387,
            lng: 2.3518054
        };
        this.buildAndDisplayMap(pos, listResults, map);

        //listResults.getLocalRestaurantList();
    }

    /**
     * Builds the position and displays the geolocated Google Maps map on the user's position on the HTML page, as well as the list of restaurants retrieved from the Google Places API
     * @param {object} pos - Latitude and longitude
     * @param {object} listResults - Generic instance of the "Restaurant" class
     * @param {object} map - Google Maps
     */
    buildAndDisplayMap(pos, listResults, map) {
        console.log(pos);

        var self = this;

        let filterRatings = document.getElementById("filterRatings");
        filterRatings.value = "Toutes notes moyennes confondues";

        let filterRadius = this.filterRadiusRestaurants(listResults, pos, map);
        this.refreshListRestaurantsAndmarkers(listResults, map, self, filterRadius);

        $("#buttonFilter").on("click", function () {
            listResults.filterResultsRating(restaurantsList, map);
        });

        let MarkerUser = this.createMarkerUser(pos);
        MarkerUser.setMap(map);

        map.setCenter(pos);
    }

    /**
     * Refreshes the list of restaurants on the HTML page and markers on the Google Maps according to the shelf filter of the positions of the restaurants.
     * Also displays the number of restaurants according to the filter.
     * @param {object} listResults - Generic instance of the "Restaurant" class
     * @param {object} map - Google Maps
     * @param {object} self - local variable
     * @param {*} filterRadius - Filter radius restaurant
     */
    refreshListRestaurantsAndmarkers(listResults, map, self, filterRadius) {
        $("#titleListRestaurant").on("click", function () {
            listResults.clearListRestaurants();
            listResults.displayResults(restaurantsList);
            listResults.clearMarkers();
            listResults.createMarkerResults(restaurantsList, map);
            listResults.displayMarkersOnMap(map);
            listResults.publishReview(restaurantsList);
            self.displayNumberRestaurantOnPage(filterRadius);
        });
    }

    /**
     * Creates the user's marker based on their position
     * @param {object} pos - Latitude and longitude
     * @returns {object} - marker
     */
    createMarkerUser(pos) {
        return new google.maps.Marker({
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
    }

    /**
     * Filters the search radius of the position of restaurants on Google Maps
     * @param {object} listResults - Generic instance of the "Restaurant" class
     * @param {object} pos - Latitude and longitude
     * @param {object} map - Google Maps
     * @returns {object} - filterRadius
     */
    filterRadiusRestaurants(listResults, pos, map) {
        let filterRadius = document.getElementById("filterRadius");

        filterRadius.addEventListener("change", function (event) {
            restaurantsList = [];
            listResults.getRestaurantsListWithReviews(pos, map, event.target.value);
        });
        return filterRadius;
    }

    /**
     * Displays the number of restaurants according to the search radius of their position
     * @param {object} filterRadius - Filter radius restaurant
     */
    displayNumberRestaurantOnPage(filterRadius) {
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
    }

    /**
     * Add a marker by clicking on the Google Maps in order to add a new restaurant
     */
    addMarkerRestaurant() {
        const map = this.map;

        map.addListener("click", event => {
            this.placeMarkerRestaurantAndPanTo(event.latLng, map);
            this.newLat = event.latLng.lat();
            this.newLng = event.latLng.lng();
            this.createButtonAddRestaurant();

            const addNewRestaurantOnMap = new Restaurant();
            addNewRestaurantOnMap.addNewRestaurantArray(this.newLat, this.newLng, map);
            $("#removeMarker").removeAttr("disabled");
        });
    }

    /**
     * Place the marker of the new restaurant on the Google Maps map and display it, with the option to remove this marker
     * @param {object} latLng - Latitude and longitude
     * @param {object} map - Google Maps
     */
    placeMarkerRestaurantAndPanTo(latLng, map) {
        let markerNewRestaurant = this.createMarkerNewRestaurant(latLng);
        this.displayMarkerNewRestaurant(markerNewRestaurant, map);

        map.panTo(latLng);

        this.createInfoWindowNewMarker(markerNewRestaurant, map);

        markersArray.push(markerNewRestaurant);
        markerNewRestaurantList.push(markerNewRestaurant);
        console.log(markerNewRestaurantList);

        this.clearMarkerNewRestaurant(markerNewRestaurant);
    }

    /**
     * Create the new restaurant marker
     * @param {object} latLng - Latitude and longitude
     * @returns {object} - marker
     */
    createMarkerNewRestaurant(latLng) {
        return new google.maps.Marker({
            position: latLng,
            animation: google.maps.Animation.DROP,
            //label: "Nouveau restaurant",
            icon: {
                url: "img/icon-restaurant-location-new-restaurant.png",
                scaledSize: new google.maps.Size(50, 50),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 0)
            }
        });
    }

    /**
     * Displays the new restaurant marker on the Google Maps map
     * @param {object} markerNewRestaurant - new restaurant marker variable
     * @param {object} map - Google Maps
     */
    displayMarkerNewRestaurant(markerNewRestaurant, map) {
        markerNewRestaurant.setMap(map);
    }

    /**
     * Remove the new restaurant marker from the Google Maps map if the user decides not to add this new restaurant
     * @param {object} markerNewRestaurant - new restaurant marker variable
     */
    clearMarkerNewRestaurant(markerNewRestaurant) {
        var self = this;
        $("#removeMarker").on("click", function() {
            self.displayMarkerNewRestaurant(markerNewRestaurant, null);
            markerNewRestaurantList.pop();
            $("#removeMarker").attr("disabled", "true");
        });
    }

    /**
     * Creates the HTML button located in the information window of the new marker, opening a modal window allowing you to add a new restaurant using a form
     */
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
        $('<input>').appendTo($("#divInputUserName")).attr({type:"text", class:"form-control", id:"inputUserName"}).css("font-size", "small");

        $('<div>').appendTo($("#form-addRestaurant")).attr({class:"form-group row text-left", id:"addUserFirstName-form-group"});
        $('<label>').appendTo($("#addUserFirstName-form-group")).attr({for:"inputUserFirstName", class:"col-lg-6 col-form-label"}).html("* Votre prénom :");
        $('<div>').appendTo($("#addUserFirstName-form-group")).attr({class:"col-lg-6", id:"divInputUserFirstName"});
        $('<input>').appendTo($("#divInputUserFirstName")).attr({type:"text", class:"form-control", id:"inputUserFirstName"}).css("font-size", "small");

        $('<div>').appendTo($("#form-addRestaurant")).attr({class:"form-group row text-left", id:"addRestaurantName-form-group"});
        $('<label>').appendTo($("#addRestaurantName-form-group")).attr({for:"inputRestaurantName", class:"col-lg-6 col-form-label"}).html("* Nom du restaurant :");
        $('<div>').appendTo($("#addRestaurantName-form-group")).attr({class:"col-lg-6", id:"divInputRestaurantName"});
        $('<input>').appendTo($("#divInputRestaurantName")).attr({type:"text", class:"form-control", id:"inputRestaurantName"}).css("font-size", "small");

        $('<div>').appendTo($("#form-addRestaurant")).attr({class:"form-group row text-left", id:"addRestaurantAddress-form-group"});
        $('<label>').appendTo($("#addRestaurantAddress-form-group")).attr({for:"inputRestaurantAddress", class:"col-lg-6 col-form-label"}).html("* Adresse du restaurant :");
        $('<div>').appendTo($("#addRestaurantAddress-form-group")).attr({class:"col-lg-6", id:"divInputRestaurantAddress"});
        $('<input>').appendTo($("#divInputRestaurantAddress")).attr({type:"text", class:"form-control", id:"inputRestaurantAddress"}).css("font-size", "small");

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

        $('<div>').appendTo($("#modal-content-addRestaurant")).attr({class:"modal-footer", id:"modal-footer-addRestaurant"});
        $('<a>').appendTo($("#modal-footer-addRestaurant")).attr({href:"#updateLink", id:"linkCloseAddRestaurant"});
        $('<button>').appendTo($("#linkCloseAddRestaurant")).attr({type:"submit", class:"btn btn-secondary btn-sm", id:"btnCloseAddRestaurant", 'data-dismiss': 'modal'}).html("Fermer");
        $('<button>').appendTo($("#modal-footer-addRestaurant")).attr({type:"submit", class:"btn btn-primary btn-sm", id:"btnSaveAddRestaurant", /*'data-dismiss': 'modal'*/}).html("Enregistrer");
    }

    /**
     * Create the new marker information window allowing you to add a new restaurant by clicking on this marker
     * @param {object} marker - restaurant marker
     * @param {*} map - Google Maps
     */
    createInfoWindowNewMarker(marker, map) {
        let contentString = 
        '<button class="btn btn-primary btn-sm" type="button" id="addRestaurant" data-toggle="modal" data-target="#addRestaurantModal">Ajouter un restaurant</button>';
        //'<button class="btn btn-primary btn-sm" type="submit" id="removeMarker">Supprimer le marqueur</button>';

        let infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });
    }
}

let markerNewRestaurantList = [];