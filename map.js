class Map {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }
}

let parisLocation = {lat : 48.8566969, lng: 2.3514616};

let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: parisLocation
});

let marker = new google.maps.Marker({
    position : parisLocation,
    map: map
});