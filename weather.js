class Weather {

    askWeather() {
        let infoWeather = document.getElementById("infoWeather");
        let cityName = document.createElement("h4");
        let iconWeather = document.createElement("img");
        let currentCondition = document.createElement("p");
        let currentDate = document.createElement("p");
        let currentHour = document.createElement("p");
        let currentTmp = document.createElement("p");

        infoWeather.appendChild(cityName);
        infoWeather.appendChild(currentDate);
        infoWeather.appendChild(currentHour);
        infoWeather.appendChild(currentTmp);
        infoWeather.appendChild(iconWeather);
        infoWeather.appendChild(currentCondition);
        currentCondition.classList.add("currentCondition");
        cityName.classList.add('cityName');
        iconWeather.classList.add("iconWeather");
        currentDate.classList.add('currentDate');
        currentHour.classList.add('currentHour');
        currentTmp.classList.add('currentTmp');

        let requestWeatherParis = new XMLHttpRequest();
        requestWeatherParis.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                let resultWeather = JSON.parse(this.responseText);
                
                cityName.innerHTML = "Météo sur " + resultWeather.city_info.name + ", " + resultWeather.city_info.country;
                currentDate.innerHTML = "Date : " + resultWeather.current_condition.date;
                currentHour.innerHTML = "Heure local : " + resultWeather.current_condition.hour;
                currentCondition.innerHTML = resultWeather.current_condition.condition;
                iconWeather.setAttribute("src", resultWeather.current_condition.icon);
                currentTmp.innerHTML = "Température : " + resultWeather.current_condition.tmp + " degrés";
            }
        };
        requestWeatherParis.open("GET", "https://www.prevision-meteo.ch/services/json/paris");
        requestWeatherParis.send();

        let geolocation = document.getElementById("geolocation");
        geolocation.addEventListener('click', function(){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
    
                let requestWeatherLocation = new XMLHttpRequest();
                requestWeatherLocation.onreadystatechange = function() {
                    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                        let resultWeatherPosition = JSON.parse(this.responseText);
                        
                        cityName.innerHTML = "Météo sur " + resultWeatherPosition.city_info.name + ", " + resultWeatherPosition.city_info.country;
                        currentDate.innerHTML = "Date : " + resultWeatherPosition.current_condition.date;
                        currentHour.innerHTML = "Heure local : " + resultWeatherPosition.current_condition.hour;
                        currentCondition.innerHTML = resultWeatherPosition.current_condition.condition;
                        iconWeather.setAttribute("src", resultWeatherPosition.current_condition.icon);
                        currentTmp.innerHTML = "Température : " + resultWeatherPosition.current_condition.tmp + " degrés";
                    }
                };
                requestWeatherLocation.open("GET", "https://www.prevision-meteo.ch/services/json/lat="+ pos.lat+"lng="+ pos.lng);
                requestWeatherLocation.send();
                });
            }
        });
    }
}

const weather = new Weather();
weather.askWeather();