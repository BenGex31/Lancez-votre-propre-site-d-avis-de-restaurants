class MyMap {
    newLat;
    newLng;

    constructor(lat, long) {
        this.lat = lat;
        this.long = long;
        this.city = {lat: this.lat, lng: this.long};
        this.map = new google.maps.Map(document.getElementById('map'), {zoom: 13, center: this.city});
    }

    createMap() {
        let markerParis = new google.maps.Marker({position: this.city, map: this.map, label: "Paris"});
        this.geolocation();
        this.addMarkerRestaurant();
    }

    createMarkerRestaurants(arrayRestaurant) {
        const map = this.map;
        for(let restaurant in arrayRestaurant) {
            let markerRestaurant = new google.maps.Marker({
                position: {lat: arrayRestaurant[restaurant].lat, lng: arrayRestaurant[restaurant].long},
                map: map,
                animation: google.maps.Animation.DROP,
                label: arrayRestaurant[restaurant].restaurantName,
                icon: {
                    url: "img/icon-restaurant-location.png",
                    scaledSize: new google.maps.Size(50, 50),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(0, 0)
                }
            });

            const contentString =
            '<h1 id="firstHeading" class="restaurantName text-left">' + arrayRestaurant[restaurant].restaurantName + '</h1>' + 
            '<div class="text-left">' +
            '<img class"streetView" src="https://maps.googleapis.com/maps/api/streetview?size=200x150&location=' + arrayRestaurant[restaurant].lat + "," + arrayRestaurant[restaurant].long + '&heading=151.78&pitch=-0.76&key=AIzaSyC4fKHC9oHDR8F0Zban3gY6M8LGYrIDlpc">' +
            '</div>' +
            '<div id="bodyContent">' +
            '<p><i class="fas fa-map-marker-alt"></i>' + arrayRestaurant[restaurant].address + '</p>' +
            '</div>';

            const infoWindow = new google.maps.InfoWindow({
                content : contentString
            });

            markerRestaurant.addListener("click", () => {
                infoWindow.open(map, markerRestaurant);
            });
        }
    }

    geolocation() {
        const map = this.map;
        let infoWindow = new google.maps.InfoWindow;

        let geolocation = document.getElementById("geolocation");
        geolocation.addEventListener("click", function(){
            // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            new google.maps.Marker({
                position: pos,
                map: map,
                animation: google.maps.Animation.DROP,
                label : "Vous êtes ici !",
                icon: {
                    url: "img/icon-user-location.png",
                    scaledSize: new google.maps.Size(50, 50),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(0, 0)
                }
            });

            map.setCenter(pos);
            }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                                'Erreur: Le service de géolocalisation a échoué.' :
                                'Erreur: Votre navigateur ne prend pas en charge la géolocalisation.');
        infoWindow.open(map);
        }
        });
    }

    addMarkerRestaurant() {
        const map = this.map;

        map.addListener("click", event => {
            this.placeMarkerRestaurantAndPanTo(event.latLng, map);
            this.newLat = event.latLng.lat();
            this.newLng = event.latLng.lng();
            console.log(event.latLng.lat());
            console.log(event.latLng.lng());

            this.createButtonAddRestaurant();
            this.addNewRestaurantArray(event.latLng.lat(), event.latLng.lng());
        });
    }

    placeMarkerRestaurantAndPanTo(latLng, map) {
        const marker = new google.maps.Marker({
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
        map.panTo(latLng);
        this.createInfoWindowNewMarker(marker, map);
    }

    createButtonAddRestaurant() {
        $('<div>').insertAfter($("#map")).attr("id", "divAddRestaurant");
        //$("<button>").appendTo($("#divAddRestaurant")).attr({type:"button", class:"btn btn-primary btn-sm", id:"addRestaurant"}).attr("data-toggle", "modal").attr("data-target", "#addRestaurantModal").html("Ajouter un restaurant").css({marginTop:"1em", marginRight:"1em"});
        $('<div>').appendTo($("#divAddRestaurant")).attr({class:"modal fade", id:"addRestaurantModal", tabindex:"-1"}).attr("aria-labelledby", "addRestaurantModalLabel").attr("aria-hidden", "true");
        $('<div>').appendTo($("#addRestaurantModal")).attr({class:"modal-dialog", id:"modal-dialog-addRestaurant"});
        $('<div>').appendTo($("#modal-dialog-addRestaurant")).attr({class:"modal-content", id:"modal-content-addRestaurant"});
        $('<div>').appendTo($("#modal-content-addRestaurant")).attr({class:"modal-header", id:"modal-header-addRestaurant"});
        $('<h5>').appendTo($("#modal-header-addRestaurant")).attr({class:"modal-title", id:"addRestaurantModalLabel"}).html("Partagez votre expérience");
        
        $('<div>').appendTo($("#modal-content-addRestaurant")).attr({class:"modal-body", id:"modal-body-addRestaurant"});

        $('<form>').appendTo($("#modal-body-addRestaurant")).attr("id", "form-addRestaurant");
        $('<div>').appendTo($("#form-addRestaurant")).attr({class:"form-group row text-left", id:"addRestaurantName-form-group"});
        $('<label>').appendTo($("#addRestaurantName-form-group")).attr({for:"inputRestaurantName", class:"col-lg-6 col-form-label"}).html("* Nom du restaurant");
        $('<div>').appendTo($("#addRestaurantName-form-group")).attr({class:"col-lg-6", id:"divInputRestaurantName"});
        $('<input>').appendTo($("#divInputRestaurantName")).attr({type:"text", class:"form-control", id:"inputRestaurantName"});

        $('<div>').appendTo($("#form-addRestaurant")).attr({class:"form-group row text-left", id:"addRestaurantAddress-form-group"});
        $('<label>').appendTo($("#addRestaurantAddress-form-group")).attr({for:"inputRestaurantAddress", class:"col-lg-6 col-form-label"}).html("* Adresse du restaurant");
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
        $('<label>').appendTo($("#form-group-restaurantComment")).attr({for:"FormControlTextareaRestaurantComment"}).html("Ecrire votre commentaire");
        $('<textarea>').appendTo($("#form-group-restaurantComment")).attr({class:"form-control", id:"FormControlTextareaRestaurantComment", col:"3", row:"3"});

        $('<p>').appendTo($("#form-addRestaurant")).html("* champs obligatoires").addClass("text-left");

        $('<div>').appendTo($("#modal-content-addRestaurant")).attr({class:"modal-footer", id:"modal-footer-addRestaurant"});
        $('<button>').appendTo($("#modal-footer-addRestaurant")).attr({type:"button", class:"btn btn-secondary btn-sm", id:"btnCloseAddRestaurant"}).attr("data-dismiss", "modal").html("Fermer");
        $('<button>').appendTo($("#modal-footer-addRestaurant")).attr({type:"submit", class:"btn btn-primary btn-sm", id:"btnSaveAddRestaurant"}).html("Enregistrer");
        $('<button>').appendTo($("#modal-footer-addRestaurant")).attr({type:"submit", class:"btn btn-danger btn-sm", id:"cancelAddRestaurant"}).html("Annuler");
        
    }

    createInfoWindowNewMarker(marker, map) {
        const contentString = 
        '<button class="btn btn-primary btn-sm" type="button" id="addRestaurant" data-toggle="modal" data-target="#addRestaurantModal">Ajouter un restaurant</button>';

        const infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });
    }

    addNewRestaurantArray(lat, lng) {
        let inputRestaurantName = document.getElementById("inputRestaurantName");
        let inputRestaurantAddress = document.getElementById("inputRestaurantAddress");
        let starsRating = document.getElementById("inputGroupSelectRestaurantRating");
        let commentRating = document.getElementById("FormControlTextareaRestaurantComment");
        let btnSaveAddRestaurant = document.getElementById("btnSaveAddRestaurant");
        let cancelAddRestaurant = document.getElementById("cancelAddRestaurant");
        let btnCloseAddRestaurant = document.getElementById("btnCloseAddRestaurant");

        btnSaveAddRestaurant.addEventListener("click", function() {
            if (inputRestaurantName.value && inputRestaurantAddress.value && commentRating.value) {
                if (starsRating.value >= 1 && starsRating <= 5) {
                    restaurants.push({
                        id : restaurants.length + 1,
                        restaurantName : inputRestaurantName.value,
                        address : inputRestaurantAddress.value,
                        lat : lat,
                        long : lng,
                        ratings : [
                            {
                                stars : starsRating.value,
                                comment : commentRating.value
                            }
                        ]
                    });
                }
            } else {
                alert("Merci de renseigner tous les champs obligatoires *");
            }
            console.log(restaurants);
        });

        btnCloseAddRestaurant.addEventListener("click", function() {
            inputRestaurantName.value = "";
            inputRestaurantAddress.value = "";
            starsRating.value = "";
            commentRating.value = "";
        });
    }
}