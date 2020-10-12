class MyMap {
    newLat;
    newLng;

    constructor(lat, long) {
        this.lat = lat;
        this.long = long;
        this.city = {lat: this.lat, lng: this.long};
        this.zoom = 16;
        this.map = new google.maps.Map(document.getElementById('map'), {zoom: this.zoom, center: this.city});
    }

    createMap() {
        new google.maps.Marker({position: this.city, map: this.map, label: "Paris"});
        this.geolocation();
        this.addMarkerRestaurant();
    }

    geolocation() {
        const map = this.map;
        const ParisLocation = this.city;

        let listResults = new Restaurant();
        let infoWindow = new google.maps.InfoWindow;

        let geolocation = document.getElementById("geolocation");
        geolocation.addEventListener("click", function(){

            $("#buttonFilter").attr("disabled", "true");
            $("#titleListRestaurant").removeAttr("disabled");
            restauranstList = [];

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

                    console.log(pos);

                    let filterRatings = document.getElementById("filterRatings");
                    filterRatings.value = "Toutes notes moyennes confondues";

                    listResults.getRestauranstListWithReviews(pos, map);

                    $("#titleListRestaurant").on("click", function() {
                        $("#buttonFilter").removeAttr("disabled");
                        listResults.clearListRestaurants();
                        listResults.createListResults(restauranstList);
                        listResults.createButtonConsultReviewResults(restauranstList);
                        listResults.createButtonWriteReviewResults(restauranstList);
                        listResults.clearMarkers();
                        listResults.createMarkerResults(restauranstList, map);
                        listResults.displayMarkersOnMap(map);
                    });
                    
                    $("#buttonFilter").on("click", function() {
                        listResults.filterResultsRating(restauranstList, map)
                    });

                    let MarkerUser = new google.maps.Marker({
                        position: pos,
                        //map: map,
                        animation: google.maps.Animation.DROP,
                        label : "Vous êtes ici !",
                        icon: {
                            url: "img/icon-user-location.png",
                            scaledSize: new google.maps.Size(50, 50),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(0, 0)
                        }
                    });
                    MarkerUser.setMap(map);

                    map.setCenter(pos);

                }, function() {
                    alert("La position par défaut a été définie sur Paris");

                    restaurantsListParis = [];

                    listResults.clearListRestaurants();
                    listResults.clearMarkers();

                    map.setCenter(ParisLocation);

                    let filterRatings = document.getElementById("filterRatings");
                    filterRatings.value = "Toutes notes moyennes confondues";

                    //listResults.getRestaurantsListParisWithReviews(ParisLocation, map);
                    listResults.getLocalRestaurantList();

                    $("#titleListRestaurant").on("click", function() {
                        $("#buttonFilter").removeAttr("disabled");
                        listResults.clearListRestaurants();
                        listResults.createListResults(restaurantsListParis);
                        listResults.createButtonConsultReviewResults(restaurantsListParis);
                        listResults.createButtonWriteReviewResults(restaurantsListParis);
                        listResults.clearMarkers();
                        listResults.createMarkerResults(restaurantsListParis, map);
                        listResults.displayMarkersOnMap(map);
                    });

                    $("#buttonFilter").on("click", function() {
                        listResults.filterResultsRating(restaurantsListParis, map);
                    });
                });
            }
        });
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
            $(".alertUpdateLink").remove();
            $("#buttonUpdate").removeAttr("disabled");
        });
    }

    placeMarkerRestaurantAndPanTo(latLng, map) {
        let marker = new google.maps.Marker({
            position: latLng,
            map: map,
            animation: google.maps.Animation.DROP,
            label: "Nouveau restaurant",
            icon: {
                url: "img/icon-restaurant-location.png",
                scaledSize: new google.maps.Size(50, 50),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 0)
            }
        });

        marker.setMap(map);
        map.panTo(latLng);
        this.createInfoWindowNewMarker(marker, map);
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
        '<button class="btn btn-primary btn-sm" type="button" id="addRestaurant" data-toggle="modal" data-target="#addRestaurantModal">Ajouter un restaurant</button>' ;

        let infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker.addListener("click", () => {

            infowindow.open(map, marker);
        });
    }
}