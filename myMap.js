class MyMap {
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
        this.addRestaurantArray();
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
            console.log(event.latLng.lat());
            console.log(event.latLng.lng());
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
        this.createWindowAddRestaurant(marker, map);
    }

    createWindowAddRestaurant(marker, map) {
        const modalWindow =
        '<div id="AddContentRestaurant">' +
            '<h4 id="titleAddRestaurant">Partagez votre expérience !</h4>' +
            '<label id"labelAddRestaurant">Ajouter un restaurant</label>' +
            '<form id"addFormRestaurant">' +
                '<div class="form-row">' +
                    '<div class="col">' +
                        '<input id="addRestaurantName" type="text" class="form-control" placeholder="Nom du restaurant">' +
                    '</div>' +
                '</div>' +
                '<br>' +
                '<div class="form-row">' +
                    '<div class="col">' +
                        '<input id="addRestaurantAddress" type="text" class="form-control" placeholder="Adresse complète">' +
                    '</div>' +
                '</div>' +
                '<br>' +
            '</form>' +
            '<footer>' +
                '<div class="row">' +
                    '<div class="col d-flex justify-content-around">' +
                        '<button id="deleteMarker" type="button" class="btn btn-secondary btn-sm">Annuler</button>' +
                        '<button id="saveNewRestaurant" type="button" class="btn btn-primary btn-sm">Valider</button>'+
                    '</div>' +
                '</div>'
            '</footer>' +
        '</div>';

        const infoWindow = new google.maps.InfoWindow({
            content : modalWindow,
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    }

    addRestaurantArray(location) {
        let restaurantNameInput = document.getElementById("addRestaurantName");
        let restaurantAddress = document.getElementById("addRestaurantAddress");
        let saveNewRestaurant = document.getElementById("saveNewRestaurant");

        $("#saveNewRestaurant").on("click", function() {
            if (restaurantNameInput.value === "") {
                alert("Merci de renseigner le nom du restaurant !");
            }
            if (restaurantAddress.value === "") {
                alert("Merci de renseigner l'adresse du restaurant !");
            }
            if (restaurantNameInput.value === "" && restaurantAddress.value === "") {
                alert("Merci de renseigner le nom et l'adresse du restaurant !");
            } else {
                restaurants.push({
                    id: restaurants[5].id + 1,
                    restaurantName: restaurantNameInput.value,
                    address: restaurantAddress.value,
                    lat: location.lat(),
                    long: location.lng(),
                    ratings: [
                        {
                            stars: null,
                            comment: ""
                        }
                    ]
                });
            }
        });
    }
}