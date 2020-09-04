class MyMap {
    constructor(lat, long) {
        this.lat = lat;
        this.long = long;
    }

    createMap() {
        // The location of Paris
        let paris = {lat: 48.8565387, lng: 2.3518054};
        // The map, centered at Paris
        let map = new google.maps.Map(
            document.getElementById('map'), {zoom: 13, center: paris});
        // The marker, positioned at Paris
        let markerParis = new google.maps.Marker({position: paris, map: map, label: "Paris"});
        
        // Diplay restaurant's marker on map
        for(let restaurant of restaurants) {
            let markerRestaurant = new google.maps.Marker({
                position: {lat: restaurant.lat, lng: restaurant.long},
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                label: restaurant.restaurantName,
                icon: {
                    url: "img/icon-restaurant-location.png",
                    scaledSize: new google.maps.Size(50, 50),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(0, 0)
                }
            });
        }
        
        let infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
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
            })

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
    }
}