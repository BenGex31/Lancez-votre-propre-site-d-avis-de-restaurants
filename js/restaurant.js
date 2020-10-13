class Restaurant {
   constructor(id, restaurantName, address, icon, lat, long, location, rating, place_id, reviews) {
      this.id = id;
      this.restaurantName = restaurantName;
      this.address = address;
      this.icon = icon;
      this.lat = lat;
      this.long = long;
      this.location = location;
      this.rating = rating;
      this.place_id = place_id;
      this.reviews = reviews;
   }

   // Récupération des restaurants via GooglePlaces
   getRestaurantsListWithReviews(position, map, radius) {
      const requestRestaurant = {
         location: position,
         radius: radius,
         type: ['restaurant']
      };

      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(requestRestaurant, (results, status) => {
         if (status == google.maps.places.PlacesServiceStatus.OK) {
            results.forEach((restaurant) => {
               this.getGooglePlacesReviews(restaurant, map);
            });
            console.log(restaurantsList);
         } else {
         alert("Le status de la requête est " + status + ", merci d'essayer à nouveau ultérieurement.");
         }
      });
   }

   getGooglePlacesReviews(restaurant, map) {
      const requestReview = {
         placeId: restaurant.place_id,
         fields: ['review']
      };

      const service = new google.maps.places.PlacesService(map);
      service.getDetails(requestReview, (place, status) => {
         if (status == google.maps.places.PlacesServiceStatus.OK) {
            const newRestaurant = new Restaurant(
               restaurantsList.length + 1,
               restaurant.name,
               restaurant.vicinity,
               restaurant.icon,
               restaurant.geometry.location.lat(),
               restaurant.geometry.location.lng(),
               restaurant.geometry.location,
               restaurant.rating,
               restaurant.place_id,
               []
            );

            restaurantsList.push(newRestaurant);

            place.reviews.forEach(review => {
               const newReview = new Review(
                  review.author_name,
                  review.profile_photo_url,
                  review.rating,
                  review.text,
                  restaurant.place_id,
                  review.relative_time_description
               );

               restaurantsList.forEach(element => {
                  if (element.place_id == restaurant.place_id) {
                     element.reviews.push(newReview);
                  }
               });
            });
         } else {
            alert('Aucun avis client.' + "Le status de la requête est " + status);
         }
      });
   }

   getRestaurantsListParisWithReviews(position, map, radius) {
      const requestRestaurantParis = {
         location: position,
         radius: radius,
         type: ['restaurant']
     }

     const service = new google.maps.places.PlacesService(map);
     service.nearbySearch(requestRestaurantParis, (results, status) => {
         if (status == google.maps.places.PlacesServiceStatus.OK) {
            results.forEach(restaurantParis => {
               this.getGooglePlacesReviewsParis(restaurantParis, map);
            });
            console.log(restaurantsListParis);
         } else {
            alert('Aucun avis client.' + "Le status de la requête est " + status);
         }
     });
   }

   getGooglePlacesReviewsParis(restaurantParis, map) {
      const requestReviewParis = {
         placeId: restaurantParis.place_id,
         fields: ['review']
      };

      const service = new google.maps.places.PlacesService(map);
      service.getDetails(requestReviewParis, (place, status) => {
         if (status == google.maps.places.PlacesServiceStatus.OK) {
            const reviewsParis = place.reviews.map(reviewParis => {
                return new Review(
                  reviewParis.author_name,
                  reviewParis.profile_photo_url,
                  reviewParis.rating,
                  reviewParis.text,
                  restaurantParis.place_id,
                  reviewParis.relative_time_description
               )
            });

            const newRestaurantParis = new Restaurant(
               restaurantsListParis.length + 1,
               restaurantParis.name,
               restaurantParis.vicinity,
               restaurantParis.icon,
               restaurantParis.geometry.location.lat(),
               restaurantParis.geometry.location.lng(),
               restaurantParis.geometry.location,
               restaurantParis.rating,
               restaurantParis.place_id,
               reviewsParis
            );

            restaurantsListParis.push(newRestaurantParis);
         } else {
            alert('Aucun avis client.' + "Le status de la requête est " + status);
         }
      });
   }

   getLocalRestaurantList() {
      let requestRestaurantLocal = new XMLHttpRequest();
      requestRestaurantLocal.onreadystatechange = (results) => {
         if (this.readyState == XMLHttpRequest.DONE) {
            results = JSON.parse(this.responseText);

            results.forEach(restaurant => {
               const reviews = restaurant.ratings.map(rating => new Review(
                  "Utilisateur anonyme",
                  "https://cdn3.iconfinder.com/data/icons/glyphicon/64/profil-512.png",
                  rating.stars,
                  rating.comment,
                  undefined,
                  "Date de publication non renseignée"
               ));
      
               const newRestaurantLocal = new Restaurant(
                  restaurantsListParis.length + 1,
                  restaurant.restaurantName,
                  restaurant.address,
                  "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                  restaurant.lat,
                  restaurant.long,
                  undefined,
                  undefined,
                  undefined,
                  reviews
               );
               restaurantsListParis.push(newRestaurantLocal);
            });
         }
      };
      requestRestaurantLocal.open("GET", "data.json");
      requestRestaurantLocal.send();
      console.log(restaurantsListParis);
   }

   displayResults(arrayRestaurant) {
      this.createListResults(arrayRestaurant);
      this.createButtonConsultReviewResults(arrayRestaurant);
      this.createButtonWriteReviewResults(arrayRestaurant);
   }

   createListResults(arrayRestaurant) {
      for (let restaurant of arrayRestaurant) {
         $('<div>').appendTo($("#restaurantsList")).attr({id: restaurant.id, class:"restaurantInfo text-left"});
         $('<h5>').appendTo($("#" + restaurant.id)).attr({class:"restaurantName", id:"restaurantName" + restaurant.id}).html(restaurant.restaurantName);
         $('<img>').prependTo($("#restaurantName" + restaurant.id)).attr("src", restaurant.icon).css({width:"20px", height:"20px", marginRight:"0.5em"});
         $('<p>').appendTo($("#" + restaurant.id)).attr({class:"RestaurantAddress", id:"RestaurantAddress" + restaurant.id}).html(restaurant.address).css({fontSize:"small", cursor:"pointer"});
         $('<i>').prependTo($("#RestaurantAddress" + restaurant.id)).addClass("fas fa-map-marker-alt");

         this.getAverageRating(restaurant);

         if (isNaN(restaurant.rating)) {
            $('<p>').appendTo($("#" + restaurant.id)).attr("id", "review" + restaurant.id).html("Aucun avis et aucune note laissés pour restaurant").css({color:"red", fontWeight:"bolder", fontSize:"small"});
            } else {
            $('<p>').appendTo($("#" + restaurant.id)).attr("id", "review" + restaurant.id).html("Note moyenne : " + restaurant.rating.toFixed(1) + " / 5").css({color:"#0a3d62", fontWeight:"bolder", fontSize:"small"});
         }
      }
   }
   
   getAverageRating(restaurant) {
      let totalStars = restaurant.reviews.reduce(function (sum, reviews) {
         return sum + reviews.stars;
      }, 0);
      let average = totalStars / restaurant.reviews.length;
      restaurant.rating = average;
   }

   createButtonConsultReviewResults(arrayRestaurant) {
      for (let restaurant of arrayRestaurant) {
         $('<button>').appendTo($('#' + restaurant.id)).html("Voir les avis").attr({type: "button", class: "btn btn-warning btn-sm", id: "buttonConsultReview" + restaurant.id}).attr("data-toggle", "modal").attr("data-target", "#consultReview" + restaurant.id).css({fontSize: "small", border: "0.5px solid black", fontWeight: "bolder", backgroundColor: "#82ccdd", color: "black"});
         if (restaurant.reviews.length === 0) {
            $("#buttonConsultReview" + restaurant.id).attr("disabled", "true");
         }
         $('<div>').insertAfter($('#buttonConsultReview' + restaurant.id)).attr({class: 'modal fade', id: "consultReview" + restaurant.id, tabindex: "-1"}).attr('aria-labelledby', "consultReview" + restaurant.id + "Label").attr('aria-hidden', 'true');
         $('<div>').appendTo($('#consultReview' + restaurant.id)).attr({class: "modal-dialog", id: "modal-dialog-consultReview" + restaurant.id});
         $('<div>').appendTo($('#modal-dialog-consultReview' + restaurant.id)).attr({class: "modal-content", id: "modal-content-consultReview" + restaurant.id});
         
         $('<div>').appendTo($('#modal-content-consultReview' + restaurant.id)).attr({class: "modal-header", id: "modal-header-consultReview" + restaurant.id});
         $('<h4>').appendTo($("#modal-header-consultReview" + restaurant.id)).attr({class: "modal-title animate__animated animate__fadeInRight animate__delay-0.5s", id: "consultReview" + restaurant.id + "Label"}).html(restaurant.restaurantName);
         $('<img>').appendTo($("#modal-header-consultReview" + restaurant.id)).attr({class:"streetView", src:"https://maps.googleapis.com/maps/api/streetview?size=200x150&location=" + restaurant.lat + "," + restaurant.long + "&heading=151.78&pitch=-0.76&key=AIzaSyC4fKHC9oHDR8F0Zban3gY6M8LGYrIDlpc"});
         
         $('<div>').appendTo($("#modal-content-consultReview" + restaurant.id)).attr({class:"modal-body", id:"modal-body-consultReview" + restaurant.id});
         $('<h5>').appendTo($("#modal-body-consultReview" + restaurant.id)).addClass("titleReviews text-center").html("Commentaires et notes des clients").css({fontWeight: "bolder", borderBottom: "1px solid black", marginBottom: "2em", color:"red"});

         for  (let review = 0; review < restaurant.reviews.length; review++) {
            $('<div>').appendTo($("#modal-body-consultReview" + restaurant.id)).attr("id", "blocReview" + review + "Restaurant" + restaurant.id).css({border:"2px inset black", marginBottom:"1em", padding:"0.5em", borderRadius:"5px", backgroundColor:"#3c6382", color:"white"});
            $('<p>').appendTo($("#blocReview" + review + "Restaurant" + restaurant.id)).attr({id: "author" + review + "Restaurant" + restaurant.id, class: "author"}).html(restaurant.reviews[review].author).css("color", "#82ccdd");
            $('<i>').prependTo($("#author" + review + "Restaurant" + restaurant.id)).addClass("fas fa-user-edit").css({color:"orange", marginRight:"0.5em"});
            $('<img>').appendTo($("#author" + review + "Restaurant" + restaurant.id)).attr({src: restaurant.reviews[review].author_profil_picture, class:"author_profil_picture"}).css({float: "right", width:"40px", height:"40px"});
            $('<p>').appendTo($("#blocReview" + review + "Restaurant" + restaurant.id)).html("Commentaire :").css({marginBottom: "0.5em", textDecoration:"underline", fontSize:"small", color:"black"});
            if (restaurant.reviews[review].comment == "") {
            $('<p>').appendTo($("#blocReview" + review + "Restaurant" + restaurant.id)).attr({id: "comment" + "Restaurant" + restaurant.id, class: "comment"}).html("Pas de commentaire laissé");
            } else {
            $('<p>').appendTo($("#blocReview" + review + "Restaurant" + restaurant.id)).attr({id: "comment" + "Restaurant" + restaurant.id, class: "comment"}).html(restaurant.reviews[review].comment);
            }
            $('<p>').appendTo($("#blocReview" + review + "Restaurant" + restaurant.id)).attr({id: "stars" + "Restaurant" + restaurant.id, class: "stars text-right"}).html("Note : " + restaurant.reviews[review].stars + " / 5").css({marginBottom: "0", color:"#82ccdd"});
            $('<p>').appendTo($("#blocReview" + review + "Restaurant" + restaurant.id)).addClass("relative_time_description").html("- " + restaurant.reviews[review].relative_time_description).css({color:"black", fontStyle:"italic", fontSize:"small"});
         }
         
         $('<div>').appendTo($("#modal-content-consultReview" + restaurant.id)).attr({class:"modal-footer", id:"modal-footer-consultReview" + restaurant.id});
         $('<button>').appendTo($("#modal-footer-consultReview" + restaurant.id)).attr({type:"button", class:"btn btn-secondary btn-sm"}).attr("data-dismiss", "modal").css("font-size", "small").html("Fermer");
      }
   }


   createButtonWriteReviewResults(arrayRestaurant) {
      for (let restaurant of arrayRestaurant) {
         $('<button>').appendTo($('#' + restaurant.id)).html("Rédiger un avis").attr({type: "button", class: "btn btn-primary btn-sm", id: "buttonWriteReview" + restaurant.id}).attr("data-toggle", "modal").attr("data-target", "#writeReview" + restaurant.id).css({fontSize: "small", border: "0.5px solid black", fontWeight: "bolder", backgroundColor: "#3c6382", color: "whitesmoke"});
         $('<div>').insertAfter($('#buttonWriteReview' + restaurant.id)).attr({class: 'modal fade', id: "writeReview" + restaurant.id, tabindex: "-1"}).attr('aria-labelledby', "writeReview" + restaurant.id + "Label").attr('aria-hidden', 'true');
         $('<div>').appendTo($('#writeReview' + restaurant.id)).attr({class: "modal-dialog", id: "modal-dialog-writeReview" + restaurant.id});
         $('<div>').appendTo($('#modal-dialog-writeReview' + restaurant.id)).attr({class: "modal-content", id: "modal-content-writeReview" + restaurant.id});
         
         $('<div>').appendTo($('#modal-content-writeReview' + restaurant.id)).attr({class: "modal-header", id: "modal-header-writeReview" + restaurant.id});
         $('<h6>').appendTo($("#modal-header-writeReview" + restaurant.id)).attr({class: "modal-title animate__animated animate__fadeInRight animate__delay-0.5s", id: "writeReview" + restaurant.id + "Label"}).html(restaurant.restaurantName);
         $('<button>').appendTo($("#modal-header-writeReview" + restaurant.id)).attr({type: "button", class: "close", id: "buttonCloseWriteReview" + restaurant.id}).attr('data-dismiss', 'modal').attr('aria-label', 'Close');
         $('<span>').appendTo($("#buttonCloseWriteReview" + restaurant.id)).attr('aria-hidden', 'true').html("&times;");
         $('<div>').appendTo($("#modal-content-writeReview" + restaurant.id)).attr({class: "modal-body", id: "modal-body-writeReview" + restaurant.id});
         $('<h5>').appendTo($("#modal-body-writeReview" + restaurant.id)).html("Votre avis compte aussi !").css({color: "darkgreen", fontWeight: "bolder"}).addClass("text-center animate__animated animate__flash animate__delay-1s").css("margin-bottom", "1em");
         
         $('<textarea>').appendTo($("#modal-body-writeReview" + restaurant.id)).attr({class:"form-control", type:"text", placeholder:"Saisissez votre nom et votre prénom", id:"textareaAuthorNameRestaurant" + restaurant.id}).css({marginBottom: "1em", fontSize:"small"});

         $('<div>').appendTo($("#modal-body-writeReview" + restaurant.id)).attr({class: "input-group mb-3", id: "input-group" + restaurant.id});
         $('<div>').appendTo($("#input-group" + restaurant.id)).attr({class: "input-group-prepend", id: "input-group-prepend" + restaurant.id});
         $('<label>').appendTo($("#input-group-prepend" + restaurant.id)).attr({class: "input-group-text", for: "inputGroupSelectRestaurant" + restaurant.id}).html("Sélectionner votre note entre 1 et 5 : ").css("background-color", "#f8c291").css("font-size", "small");
         $('<select>').appendTo($("#input-group" + restaurant.id)).attr({class: "custom-select", id: "inputGroupSelectRestaurant" + restaurant.id, type: "number"}).css("font-size", "small");
         $('<option>').appendTo($("#inputGroupSelectRestaurant" + restaurant.id)).attr("value", "").html("Faites votre choix");

         for(let i = 1; i <= 5; i++) {
            $('<option>').appendTo($("#inputGroupSelectRestaurant" + restaurant.id)).attr("value", i).html(i);
         }
         
         $('<form>').appendTo($("#modal-body-writeReview" + restaurant.id)).addClass("formComment" + restaurant.id);
         $('<div>').appendTo($(".formComment" + restaurant.id)).attr({class: "form-group", id: "form-group" +restaurant.id});
         $('<label>').appendTo($("#form-group" + restaurant.id)).attr("for", "FormControlTextareaRestaurant" + restaurant.id).html("Ecrire votre commentaire :").css("font-size", "small");
         $('<textarea>').appendTo($("#form-group" + restaurant.id)).attr({class: "form-control", id: "FormControlTextareaRestaurant" + restaurant.id, col: "3", rows: "3"}).css("font-size", "small");

         $('<div>').appendTo($("#modal-body-writeReview" + restaurant.id)).attr("id", "resultReview" + restaurant.id);
         $('<p>').appendTo($("#resultReview" + restaurant.id)).attr("id", "resultRating" + restaurant.id).html("Votre note : ").css({fontSize: "small", fontWeight: "bolder"});
         $('<span>').appendTo($("#resultRating" + restaurant.id)).attr("id", "spanResultRating"+ restaurant.id).css({fontSize: "small", fontStyle: "italic", color: "black"});
         $('<p>').appendTo($("#resultReview" + restaurant.id)).attr("id", "resultComment" + restaurant.id).html("Votre commentaire : ").css({fontSize: "small", fontWeight: "bolder"});
         $('<span>').appendTo($("#resultComment" + restaurant.id)).attr("id", "spanResultComment" + restaurant.id).css({fontSize: "small", fontStyle: "italic", color: "black"});

         $("#inputGroupSelectRestaurant" + restaurant.id).change(function(event){
            $("#spanResultRating" + restaurant.id).html(event.target.value);
         });

         $("#FormControlTextareaRestaurant" + restaurant.id).change(function(event){
            $("#spanResultComment" + restaurant.id).html('"' + event.target.value + '"');
         });

         $('<div>').appendTo($("#modal-content-writeReview" + restaurant.id)).attr({class: "modal-footer", id: "modal-footer-writeReview" + restaurant.id});
         $('<button>').appendTo($("#modal-footer-writeReview" + restaurant.id)).attr({type: "button", class: "btn btn-secondary btn-sm", id:"btnCloseWriteReviewRestaurant" + restaurant.id}).attr('data-dismiss', 'modal').html("Fermer").css("font-size", "small");
         $('<button>').appendTo($("#modal-footer-writeReview" + restaurant.id)).attr({type: "submit", class: "btn btn-primary btn-sm", id: "publishReview" + restaurant.id, 'data-dismiss': 'modal'}).html("Publier un avis").css("font-size", "small");
      }
   }

   createMarkerResults(arrayRestaurant, map) {
      for(let restaurant of arrayRestaurant) {
         let markerResults = new google.maps.Marker({
            position: {lat: restaurant.lat, lng: restaurant.long},
            animation: google.maps.Animation.DROP,
            label: restaurant.restaurantName,
            icon: {
                  url: "img/icon-restaurant-location.png",
                  scaledSize: new google.maps.Size(50, 50),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(0, 0)
            }
         });

         markersArray.push(markerResults);

         const contentString =
                        '<h1 id="firstHeading" class="restaurantName text-left">' + restaurant.restaurantName + '</h1>' + 
                        '<div class="text-left">' +
                        '<img class"streetView" src="https://maps.googleapis.com/maps/api/streetview?size=200x150&location=' + restaurant.lat + "," + restaurant.long + '&heading=151.78&pitch=-0.76&key=AIzaSyC4fKHC9oHDR8F0Zban3gY6M8LGYrIDlpc">' +
                        '</div>' +
                        '<div id="bodyContent">' +
                        '<p><i class="fas fa-map-marker-alt"></i>' + restaurant.address + '</p>' +
                        '</div>';

         const infoWindow = new google.maps.InfoWindow({
            content : contentString
         });

         markerResults.addListener("click", () => {
            infoWindow.open(map, markerResults);
         });
      }
   }

   displayMarkersOnMap(map) {
      for (const marker of markersArray) {
         marker.setMap(map);
      }
   }

   clearMarkers() {
      this.displayMarkersOnMap(null);
      markersArray = [];
   }

   filterResultsRating(array, map) {
      const filterRatings = document.getElementById("filterRatings");

      const oneStarArray = array.filter(average => average.rating >= 0 && average.rating <= 1);
      const twoStarArray = array.filter(average => average.rating >= 1 && average.rating <= 2);
      const threeStarArray = array.filter(average => average.rating >= 2 && average.rating <= 3);
      const fourStarArray = array.filter(average => average.rating >= 3 && average.rating <= 4);
      const fiveStarArray = array.filter(average => average.rating >= 4 && average.rating <= 5);

      if (filterRatings.value >= 1 && filterRatings.value <= 5) {
         if (filterRatings.value == 1) {
            this.clearListRestaurants();
            this.createListResults(oneStarArray);
            this.createButtonConsultReviewResults(oneStarArray);
            this.createButtonWriteReviewResults(oneStarArray);
            this.clearMarkers();
            this.createMarkerResults(oneStarArray, map);
            this.displayMarkersOnMap(map);
            this.publishReview(oneStarArray);
         }
         if (filterRatings.value == 2) {
            this.clearListRestaurants();
            this.createListResults(twoStarArray);
            this.createButtonConsultReviewResults(twoStarArray);
            this.createButtonWriteReviewResults(twoStarArray);
            this.clearMarkers();
            this.createMarkerResults(twoStarArray, map);
            this.displayMarkersOnMap(map);
            this.publishReview(twoStarArray);
         }
         if (filterRatings.value == 3) {
            this.clearListRestaurants();
            this.createListResults(threeStarArray);
            this.createButtonConsultReviewResults(threeStarArray);
            this.createButtonWriteReviewResults(threeStarArray);
            this.clearMarkers();
            this.createMarkerResults(threeStarArray, map);
            this.displayMarkersOnMap(map);
            this.publishReview(threeStarArray);
         }
         if (filterRatings.value == 4) {
            this.clearListRestaurants();
            this.createListResults(fourStarArray);
            this.createButtonConsultReviewResults(fourStarArray);
            this.createButtonWriteReviewResults(fourStarArray);
            this.clearMarkers();
            this.createMarkerResults(fourStarArray, map);
            this.displayMarkersOnMap(map);
            this.publishReview(fourStarArray);
         }
         if (filterRatings.value == 5) {
            this.clearListRestaurants();
            this.createListResults(fiveStarArray);
            this.createButtonConsultReviewResults(fiveStarArray);
            this.createButtonWriteReviewResults(fiveStarArray);
            this.clearMarkers();
            this.createMarkerResults(fiveStarArray, map);
            this.displayMarkersOnMap(map);
            this.publishReview(fiveStarArray);
         }
      } else {
         this.clearListRestaurants();
         this.createListResults(array);
         this.createButtonConsultReviewResults(array);
         this.createButtonWriteReviewResults(array);
         this.clearMarkers();
         this.createMarkerResults(array, map);
         this.displayMarkersOnMap(map);
         this.publishReview(array);
      }
   }

   clearListRestaurants() {
   $("#restaurantsList").html("");
   }

   publishReview(array, map) {
      var self = this;
      for (let restaurant of array) {
         let textareaAuthorNameRestaurant = document.getElementById("textareaAuthorNameRestaurant" + restaurant.id)
         let inputGroupSelectRestaurant = document.getElementById("inputGroupSelectRestaurant" + restaurant.id);
         let FormControlTextareaRestaurant = document.getElementById("FormControlTextareaRestaurant" + restaurant.id);
         let restaurantsName = document.getElementById(restaurant.id);

         $("#publishReview" + restaurant.id).on("click", function(){
            if (inputGroupSelectRestaurant.value >= 1 && inputGroupSelectRestaurant.value <= 5 && FormControlTextareaRestaurant.value && textareaAuthorNameRestaurant.value) {
                  if (restaurant.id === parseInt(restaurantsName.id)) {
                     restaurant.reviews.push(
                        new Review(
                           textareaAuthorNameRestaurant.value,
                           "https://cdn3.iconfinder.com/data/icons/glyphicon/64/profil-512.png",
                           parseInt(inputGroupSelectRestaurant.value),
                           FormControlTextareaRestaurant.value,
                           undefined,
                           "A l'instant"
                        )
                     );
                  }

                  $("#titleListRestaurant").html("Liste des restaurants").removeClass("animate__animated animate__heartBeat").css("color", "black");
                  self.clearListRestaurants();
                  self.createListResults(array);
                  self.createButtonConsultReviewResults(array);
                  self.createButtonWriteReviewResults(array);
                  self.clearMarkers();
                  self.createMarkerResults(array, map);
                  self.displayMarkersOnMap(map);
                  self.publishReview(array);

                  /*$("#publishReview" + restaurant.id).attr("disabled", "true");
                  $('<p>').appendTo($("#modal-body-writeReview" + restaurant.id)).html("Votre avis a bien été enregistré !").addClass("alertMessage text-center animate__animated animate__flash").css({color: "red", fontWeight: "bolder", fontSize: "small"});
                  $('<p>').appendTo($("#modal-body-writeReview" + restaurant.id)).html("Merci de bien vouloir cliquer sur Fermer").addClass("alertMessage text-center animate__animated animate__flash").css({color: "red", fontWeight: "bolder", fontSize: "small"});
                  $('<p>').appendTo($("#modal-body-writeReview" + restaurant.id)).html("et de cliquer sur Mettre à jour les restaurants au dessus de la liste").addClass("alertMessage text-center animate__animated animate__flash").css({color: "red", fontWeight: "bolder", fontSize: "small"});*/

               } else {
                  alert("Merci de renseigner votre nom et prénom, ainsi qu'une note et un commentaire, sinon merci de cliquer sur Fermer")
               }
            });
            
         $("#btnCloseWriteReviewRestaurant" + restaurant.id).on("click", function() {
            if (inputGroupSelectRestaurant.value >= 1 && inputGroupSelectRestaurant.value <= 5 && FormControlTextareaRestaurant.value && textareaAuthorNameRestaurant.value) {
               textareaAuthorNameRestaurant.value = "";
               inputGroupSelectRestaurant.value = "";
               $("#spanResultRating" + restaurant.id).html("");
               FormControlTextareaRestaurant.value = "";
               $("#spanResultComment" + restaurant.id).html("");
               $('.alertMessage').remove();
               $("#publishReview" + restaurant.id).removeAttr("disabled");
               $("#titleListRestaurant").html("Mettre à jour les restaurants").addClass("animate__animated animate__heartBeat").css("color", "red");
            }
         });
      }
   }

   addNewRestaurantArray(lat, lng) {
      let inputRestaurantName = document.getElementById("inputRestaurantName");
      let inputRestaurantAddress = document.getElementById("inputRestaurantAddress");
      let starsRating = document.getElementById("inputGroupSelectRestaurantRating");
      let commentRating = document.getElementById("FormControlTextareaRestaurantComment");

      $("#btnSaveAddRestaurant").click(function() {
         if (inputRestaurantName.value && inputRestaurantAddress.value && commentRating.value) {
            if (starsRating.value >= 1 && starsRating.value <= 5) {
                  restaurants.push(
                     new Restaurant(restaurants.length + 1, inputRestaurantName.value, inputRestaurantAddress.value, lat, lng,
                        [new Review(parseInt(starsRating.value), commentRating.value)])
                  );
            }
            $("#btnSaveAddRestaurant").attr("disabled", "true");
            $("#addRestaurant").attr("disabled", "true");
            $('<p>').appendTo($("#form-addRestaurant")).html("Le restaurant a bien été enregitré, merci de fermer").addClass("alertMessage text-center animate__animated animate__flash").css({color:"red", fontWeight:"bolder", fontSize:"small"});
            $("#buttonUpdate").removeAttr("disabled");
            $('<p>').insertAfter($("#addRestaurant")).addClass("alertUpdate animate__animated animate__flash").html("Merci de cliquer sur Mettre à jour dessous la carte");
         } else {
            alert("Merci de renseigner tous les champs obligatoires *");
         }
      });
      this.clearFormAddNewRestaurant(inputRestaurantName, inputRestaurantAddress, starsRating, commentRating);
   }

   clearFormAddNewRestaurant(inputRestaurantName, inputRestaurantAddress, starsRating, commentRating) {
      $("#btnCloseAddRestaurant").click(function(){
         inputRestaurantName.value = "";
         inputRestaurantAddress.value = "";
         starsRating.value = "";
         commentRating.value = "";
      });
   }
}

let restaurantsList = [];
let restaurantsListParis = [];
let markersArray = [];