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
    }

    createMarkerRestaurants(arrayRestaurant) {
        const map = this.map;
        for(let restaurant in arrayRestaurant) {
            let markerRestaurant = new google.maps.Marker({
                position: {lat: arrayRestaurant[restaurant].lat, lng: arrayRestaurant[restaurant].long},
                map: map,
                draggable: true,
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

            let markerUser = new google.maps.Marker({
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
}