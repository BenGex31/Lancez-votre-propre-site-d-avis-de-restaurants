class Map {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
        this.zoom = 10;
        this.location = {lat: this.lat, lng: this.lng};
    }
    
    initMap() {
        let city = this.location;

        let map = new google.maps.Map(
            document.getElementById('map'), {
                zoom: this.zoom,
                center: city
        });
        
        let marker = new google.maps.Marker({
            position: city,
            map: map
        });
    }
}

const paris = new Map(48.8566969, 2.3514616);
paris.initMap();