class Map {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }
}

// Initialize and add the map
function initMap() {
    // The location of Uluru
    let paris = {lat: 48.8566969, lng: 2.3514616};
    // The map, centered at Uluru
    let map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 12,
            center: paris
        });
    // The marker, positioned at Uluru
    let marker = new google.maps.Marker({
        position: paris,
        map: map
    });
  }