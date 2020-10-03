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
   getRestaurantList(position, map) {
      const request = {
         location: position,
         radius: '5000',
         type: ['restaurant']
      };

      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status) => {
         //debugger;
         if (status == google.maps.places.PlacesServiceStatus.OK) {
            results.forEach((restaurant) => {
               this.populateRestaurantResults(restaurant);
               this.getGooglePlacesReviews(restaurant, map);
            })
            this.displayResults(restaurantResults);
            this.createMarkerResults(restaurantResults, map);
            console.log(restaurantResults);
         } else {
            alert(status + ". La requête a échoué, merci d'essayer à nouveau ultérieurement");
         }
      });
   }

   getGooglePlacesReviews(restaurant, map) {
      // Récupération des reviews de chaque restaurants sur GooglePlaces via restaurant.place_id
      
      const request = {
      placeId: restaurant.place_id,
      fields: ['review']
      };

      const service = new google.maps.places.PlacesService(map);
      service.getDetails(request, (place, status) => {
         if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (const review of place.reviews) {
               for (const element in restaurantResults) {
                  if (restaurantResults[element].place_id == restaurant.place_id) {
                     restaurantResults[element].reviews.push(new Review(
                        review.author_name,
                        review.rating,
                        review.text,
                        restaurant.place_id
                     ))
                  }
               }
            }
         } else {
            alert('Aucun avis client.', status);
         }
      });
   }

   populateRestaurantResults(restaurant, place) {
      //debugger;
      const newRestaurant = new Restaurant(
         restaurantResults.length + 1,
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
      restaurantResults.push(newRestaurant);
   }

   createMarkerRestaurants(array, map) {
      for(let restaurant of array) {
      let markerRestaurant = new google.maps.Marker({
         position: {lat: restaurant.lat, lng: restaurant.long},
         map: map,
         animation: google.maps.Animation.DROP,
         label: restaurant.restaurantName,
         icon: {
                  url: "img/icon-restaurant-location.png",
                  scaledSize: new google.maps.Size(50, 50),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(0, 0)
         }
      });

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

      markerRestaurant.addListener("click", () => {
         infoWindow.open(map, markerRestaurant);
      });
      }
   }

   displayResults(array) {
      this.createListResults(array);
      this.createButtonConsultReviewResults(array);
      this.createButtonWriteReviewResults(array);
   }

   createListResults(array) {
      for (let restaurant of array) {
         $('<div>').appendTo($("#restaurantsList")).attr({id: restaurant.id, class:"restaurantInfo"});
         $('<h5>').appendTo($("#" + restaurant.id)).attr({class:"restaurantName", id:"restaurantName" + restaurant.id}).html(restaurant.restaurantName);
         $('<img>').prependTo($("#restaurantName" + restaurant.id)).attr("src", restaurant.icon).css({width:"20px", height:"20px", marginRight:"0.5em"});
         $('<p>').appendTo($("#" + restaurant.id)).attr({class:"RestaurantAddress", id:"RestaurantAddress" + restaurant.id}).html(restaurant.address).css("font-size", "small");
         $('<i>').prependTo($("#RestaurantAddress" + restaurant.id)).addClass("fas fa-map-marker-alt");
         $('<p>').appendTo($("#" + restaurant.id)).attr("id", "review" + restaurant.id).html("Note moyenne : " + restaurant.rating + " / 5").css({color:"#0a3d62", fontWeight:"bolder", fontSize:"small"});
      }
   }
   
   createButtonConsultReviewResults(array) {
      for (let restaurant in array) {
         $('<button>').appendTo($('#' + array[restaurant].id)).html("Voir les avis").attr({type: "button", class: "btn btn-warning btn-sm", id: "buttonConsultReview" + array[restaurant].id}).attr("data-toggle", "modal").attr("data-target", "#consultReview" + array[restaurant].id).css({fontSize: "small", border: "0.5px solid black", fontWeight: "bolder", backgroundColor: "#82ccdd", color: "black"});
         $('<div>').insertAfter($('#buttonConsultReview' + array[restaurant].id)).attr({class: 'modal fade', id: "consultReview" + array[restaurant].id, tabindex: "-1"}).attr('aria-labelledby', "consultReview" + array[restaurant].id + "Label").attr('aria-hidden', 'true');
         $('<div>').appendTo($('#consultReview' + array[restaurant].id)).attr({class: "modal-dialog", id: "modal-dialog-consultReview" + array[restaurant].id});
         $('<div>').appendTo($('#modal-dialog-consultReview' + array[restaurant].id)).attr({class: "modal-content", id: "modal-content-consultReview" + array[restaurant].id});
         
         $('<div>').appendTo($('#modal-content-consultReview' + array[restaurant].id)).attr({class: "modal-header", id: "modal-header-consultReview" + array[restaurant].id});
         $('<h6>').appendTo($("#modal-header-consultReview" + array[restaurant].id)).attr({class: "modal-title animate__animated animate__fadeInRight animate__delay-0.5s", id: "consultReview" + array[restaurant].id + "Label"}).html(array[restaurant].restaurantName);
         $('<img>').appendTo($("#modal-header-consultReview" + array[restaurant].id)).attr({class:"streetView", src:"https://maps.googleapis.com/maps/api/streetview?size=200x150&location=" + array[restaurant].lat + "," + array[restaurant].long + "&heading=151.78&pitch=-0.76&key=AIzaSyC4fKHC9oHDR8F0Zban3gY6M8LGYrIDlpc"});
         
         $('<div>').appendTo($("#modal-content-consultReview" + array[restaurant].id)).attr({class:"modal-body", id:"modal-body-consultReview" + array[restaurant].id});
         
         for (let i = 0; i < array[restaurant].reviews.length; i++) {
            $('<div>').appendTo($("#modal-body-consultReview" + array[restaurant].id)).attr("id", "blocReview" + i + "Restaurant" + array[restaurant].id);
            $('<p>').appendTo($("#blocReview" + i + "Restaurant" + array[restaurant].id)).attr({id: "comment" + i + "Restaurant" + array[restaurant].id, class: "comment"}).html(array[restaurant].reviews[i].comment);
            $('<p>').appendTo($("#blocReview" + i + "Restaurant" + array[restaurant].id)).attr({id: "stars" + i + "Restaurant" + array[restaurant].id, class: "stars"}).html("Note : " + array[restaurant].reviews[i].stars + " / 5");
         }
         
         $('<div>').appendTo($("#modal-content-consultReview" + array[restaurant].id)).attr({class:"modal-footer", id:"modal-footer-consultReview" + array[restaurant].id});
         $('<button>').appendTo($("#modal-footer-consultReview" + array[restaurant].id)).attr({type:"button", class:"btn btn-secondary btn-sm"}).attr("data-dismiss", "modal").css("font-size", "small").html("Fermer");
      }
   }

   createButtonWriteReviewResults(array) {
      for (let restaurant of array) {
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
         $('<button>').appendTo($("#modal-footer-writeReview" + restaurant.id)).attr({type: "button", class: "btn btn-secondary btn-sm"}).attr('data-dismiss', 'modal').html("Fermer").css("font-size", "small");
         $('<button>').appendTo($("#modal-footer-writeReview" + restaurant.id)).attr({type: "submit", class: "btn btn-primary btn-sm", id: "publishReview" + restaurant.id}).html("Publier un avis").css("font-size", "small");
      }
   }

   createMarkerResults(array, map) {
      for(let restaurant of array) {
         let markerResults = new google.maps.Marker({
            place: {
               placeId: restaurant.place_id,
               location: restaurant.location
            },
            map: map,
            animation: google.maps.Animation.DROP,
            label: restaurant.restaurantName,
            icon: {
                  url: "img/icon-restaurant-location.png",
                  scaledSize: new google.maps.Size(50, 50),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(0, 0)
            }
         });

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

   filterResultsRating(array, map) {
      const filterreviews = document.getElementById("filterreviews");

      const oneStarArray = array.filter(average => average.rating >= 0 && average.rating <= 1);
      const twoStarArray = array.filter(average => average.rating >= 1 && average.rating <= 2);
      const threeStarArray = array.filter(average => average.rating >= 2 && average.rating <= 3);
      const fourStarArray = array.filter(average => average.rating >= 3 && average.rating <= 4);
      const fiveStarArray = array.filter(average => average.rating >= 4 && average.rating <= 5);

      if(filterreviews.selected) {
         this.clearListRestaurants();
         this.createListResults(array);
         this.createButtonConsultReviewResults(array);
         this.createButtonWriteReviewResults(array);
         this.createMarkerResults(array, map);
      }
      if (filterreviews.value == 1) {
         this.clearListRestaurants();
         this.createListResults(oneStarArray);
         this.createButtonConsultReviewResults(oneStarArray);
         this.createButtonWriteReviewResults(oneStarArray);
         this.createMarkerResults(oneStarArray, map);
      }
      if (filterreviews.value == 2) {
         this.clearListRestaurants();
         this.createListResults(twoStarArray);
         this.createButtonConsultReviewResults(twoStarArray);
         this.createButtonWriteReviewResults(twoStarArray);
         this.createMarkerResults(twoStarArray, map);
      }
      if (filterreviews.value == 3) {
         this.clearListRestaurants();
         this.createListResults(threeStarArray);
         this.createButtonConsultReviewResults(threeStarArray);
         this.createButtonWriteReviewResults(threeStarArray);
         this.createMarkerResults(threeStarArray, map);
      }
      if (filterreviews.value == 4) {
         this.clearListRestaurants();
         this.createListResults(fourStarArray);
         this.createButtonConsultReviewResults(fourStarArray);
         this.createButtonWriteReviewResults(fourStarArray);
         this.createMarkerResults(fourStarArray, map);
      }
      if (filterreviews.value == 5) {
         this.clearListRestaurants();
         this.createListResults(fiveStarArray);
         this.createButtonConsultReviewResults(fiveStarArray);
         this.createButtonWriteReviewResults(fiveStarArray);
         this.createMarkerResults(fiveStarArray, map);
      }
   }

   createListRestaurants(arrayRestaurant) {
      for (let restaurant in arrayRestaurant) {
         let newDiv = document.createElement("div");
         let newDivModalFade = document.createElement("div");
         let newDivModalDialog = document.createElement("div");
         let newDivModalContent = document.createElement("div");
         let newDivModalHeader = document.createElement("div");
         let newDivModalTitle = document.createElement("div");
         let buttonClose = document.createElement("button");
         let span = document.createElement("span");
         let newDivModalBody = document.createElement("div");
         let img = document.createElement("img");
         let newDivModalFooter = document.createElement("div");
         let buttonFooter = document.createElement("button");
         let address = document.createElement("p");
         let iconPosition = document.createElement("i");
         let review = document.createElement("p");
         let restaurantName = document.createElement("h5");
         let restaurantNameH6 = document.createElement("h6");
         let ListRestaurants = document.getElementById("restaurantsList");
         let button = document.createElement("button");
   
         ListRestaurants.appendChild(newDiv);
         newDiv.setAttribute("id", arrayRestaurant[restaurant].id);
         newDiv.classList.add("restaurantInfo");
         newDiv.appendChild(restaurantName);

         restaurantName.classList.add("restaurantName");
         restaurantName.setAttribute("id", "restaurantName" + arrayRestaurant[restaurant].id);
         restaurantName.innerHTML = arrayRestaurant[restaurant].restaurantName;
         newDiv.appendChild(address);

         address.classList.add("restaurantAddress");
         address.innerHTML = arrayRestaurant[restaurant].address;
         address.appendChild(iconPosition);
         iconPosition.classList.add("fas");
         iconPosition.classList.add("fa-map-marker-alt");
         newDiv.appendChild(review);

         review.setAttribute("id", "review" + arrayRestaurant[restaurant].id);

         let totalStars = arrayRestaurant[restaurant].reviews.reduce(function(sum, reviews){
            return sum + reviews.stars;
         }, 0);

         let average = (totalStars / arrayRestaurant[restaurant].reviews.length);

         if (arrayRestaurant[restaurant].reviews.length > 1) {
            arrayRestaurant[restaurant].averagereviews = average.toFixed(1);
            arrayRestaurant[restaurant].sumStars = totalStars;
            arrayRestaurant[restaurant].numberreviews = arrayRestaurant[restaurant].reviews.length;
            review.innerHTML = "Note moyenne : " + arrayRestaurant[restaurant].averagereviews + " / 5";

         } else if (arrayRestaurant[restaurant].reviews.length <= 1) {
            arrayRestaurant[restaurant].averagereviews = average.toFixed(1);
            arrayRestaurant[restaurant].sumStars = totalStars;
            arrayRestaurant[restaurant].numberreviews = arrayRestaurant[restaurant].reviews.length;
            review.innerHTML = "Note moyenne : " + arrayRestaurant[restaurant].averagereviews + " / 5";
         }
         
         review.style.color = "#0a3d62";
         review.style.fontWeight = "bolder";
         review.style.fontSize = "small";
         
         newDiv.appendChild(button);
         button.innerHTML = "Voir les avis";
         button.setAttribute("id", "buttonReview" + arrayRestaurant[restaurant].id);
         button.setAttribute("type", "button");
         button.setAttribute("class", "btn btn-warning btn-sm");
         button.setAttribute("data-toggle", "modal");
         button.setAttribute("data-target", "#" + "Review" + arrayRestaurant[restaurant].id + "ModalScrollable");
         button.style.fontSize = "small";
         button.style.color = "black";
         button.style.border = "0.5px solid black";
         button.style.fontWeight = "bolder";
         button.style.backgroundColor = "#82ccdd";
         newDiv.appendChild(newDivModalFade);

         newDivModalFade.setAttribute("class", "modal fade");
         newDivModalFade.setAttribute("id", "Review" + arrayRestaurant[restaurant].id + "ModalScrollable");
         newDivModalFade.setAttribute("tabindex", "-1");
         newDivModalFade.setAttribute("role", "dialog");
         newDivModalFade.setAttribute("aria-labelledby", "ReviewTitle" + arrayRestaurant[restaurant].id + "ModalScrollableTitle");
         newDivModalFade.setAttribute("aria-hidden", "true");
         newDivModalFade.appendChild(newDivModalDialog);
   
         newDivModalDialog.setAttribute("class", "modal-dialog modal-dialog-scrollable");
         newDivModalDialog.setAttribute("role", "document");
         newDivModalDialog.appendChild(newDivModalContent);
         newDivModalContent.setAttribute("class", "modal-content");
         newDivModalContent.appendChild(newDivModalHeader);
         newDivModalHeader.setAttribute("class", "modal-header");
         newDivModalHeader.appendChild(newDivModalTitle);
   
         newDivModalTitle.setAttribute("class", "modal-title");
         newDivModalTitle.setAttribute("id", "ReviewTitle" + arrayRestaurant[restaurant].id + "ModalScrollableTitle");
         newDivModalTitle.appendChild(restaurantNameH6);
         restaurantNameH6.innerHTML = arrayRestaurant[restaurant].restaurantName;
         newDivModalTitle.appendChild(buttonClose);
   
         buttonClose.setAttribute("class", "close");
         buttonClose.setAttribute("data-dismiss", "modal");
         buttonClose.setAttribute("aria-label", "close");
         buttonClose.appendChild(span);
   
         span.setAttribute("aria-hidden", "true");
         span.innerHTML = "&times;";

         newDivModalTitle.appendChild(img);
         img.setAttribute("src", "https://maps.googleapis.com/maps/api/streetview?size=300x250&location=" + arrayRestaurant[restaurant].lat + "," + arrayRestaurant[restaurant].long + "&heading=151.78&pitch=-0.76&key=AIzaSyC4fKHC9oHDR8F0Zban3gY6M8LGYrIDlpc");
         img.setAttribute("class", "streetView");
   
         newDivModalContent.appendChild(newDivModalBody);
         newDivModalBody.setAttribute("class", "modal-body");
         newDivModalBody.setAttribute("id", "modal-body-consult-restaurant" + arrayRestaurant[restaurant].id);

         for (let i = 0; i < arrayRestaurant[restaurant].reviews.length; i++) {
            $('<div>').prependTo($("#modal-body-consult-restaurant" + arrayRestaurant[restaurant].id)).attr("id", "consultRating" + i + "Restaurant" + arrayRestaurant[restaurant].id);
            $('<p>').prependTo($("#consultRating" + i + "Restaurant" + arrayRestaurant[restaurant].id)).attr({id: "comment" + i + arrayRestaurant[restaurant].restaurantName, class: "comment"}).html(arrayRestaurant[restaurant].reviews[i].comment);
            $('<p>').appendTo($("#consultRating" + i + "Restaurant" + arrayRestaurant[restaurant].id)).attr({id: "stars" + i + arrayRestaurant[restaurant].restaurantName, class: "stars"}).html("Note : " + arrayRestaurant[restaurant].reviews[i].stars + " / 5");
         }
   
         newDivModalContent.appendChild(newDivModalFooter);
         newDivModalFooter.setAttribute("class", "modal-footer");
   
         newDivModalFooter.appendChild(buttonFooter);
         buttonFooter.setAttribute("type", "button");
         buttonFooter.setAttribute("class", "btn btn-secondary btn-sm");
         buttonFooter.setAttribute("data-dismiss", "modal");
         buttonFooter.innerHTML = "Fermer";
         buttonFooter.style.fontSize = "small";
      }
   }

   createButtonWriteReview(arrayRestaurant) {
      for (let restaurant of arrayRestaurant) {
         $('<button>').appendTo($('#' + restaurant.id)).html("Rédiger un avis").attr({type: "button", class: "btn btn-primary btn-sm", id: "buttonWriteReview" + restaurant.id}).attr("data-toggle", "modal").attr("data-target", "#writeReview" + restaurant.id).css({fontSize: "small", border: "0.5px solid black", fontWeight: "bolder", backgroundColor: "#3c6382", color: "whitesmoke"});
         $('<div>').insertAfter($('#buttonWriteReview' + restaurant.id)).attr({class: 'modal fade', id: "writeReview" + restaurant.id, tabindex: "-1"}).attr('aria-labelledby', "writeReview" + restaurant.id + "Label").attr('aria-hidden', 'true');
         $('<div>').appendTo($('#writeReview' + restaurant.id)).attr({class: "modal-dialog", id: "modal-dialog-writeReview" + restaurant.id});
         $('<div>').appendTo($('#modal-dialog-writeReview' + restaurant.id)).attr({class: "modal-content", id: "modal-content-writeReview" + restaurant.id});
         $('<div>').appendTo($('#modal-content-writeReview' + restaurant.id)).attr({class: "modal-header", id: "modal-header-writeReview" + restaurant.id});
         $('<h6>').appendTo($("#modal-header-writeReview" + restaurant.id)).attr({class: "modal-title animate__animated animate__fadeInRight animate__delay-0.5s", id: "writeReview" + restaurant.id + "Label"}).html("Restaurant : " + restaurant.restaurantName);
         $('<button>').appendTo($("#modal-header-writeReview" + restaurant.id)).attr({type: "button", class: "close", id: "buttonCloseWriteReview" + restaurant.id}).attr('data-dismiss', 'modal').attr('aria-label', 'Close');
         $('<span>').appendTo($("#buttonCloseWriteReview" + restaurant.id)).attr('aria-hidden', 'true').html("&times;");
         $('<div>').appendTo($("#modal-content-writeReview" + restaurant.id)).attr({class: "modal-body", id: "modal-body-writeReview" + restaurant.id});
         $('<h5>').appendTo($("#modal-body-writeReview" + restaurant.id)).html("Votre avis compte aussi !").css({color: "darkgreen", fontWeight: "bolder"}).addClass("text-center animate__animated animate__flash animate__delay-1s").css("margin-bottom", "1em");
         
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
         $('<button>').appendTo($("#modal-footer-writeReview" + restaurant.id)).attr({type: "button", class: "btn btn-secondary btn-sm"}).attr('data-dismiss', 'modal').html("Fermer").css("font-size", "small");
         $('<button>').appendTo($("#modal-footer-writeReview" + restaurant.id)).attr({type: "submit", class: "btn btn-primary btn-sm", id: "publishReview" + restaurant.id}).html("Publier un avis").css("font-size", "small");
         }
      }

   displayRestaurants() {
      this.createListRestaurants(restaurants);
      this.createButtonWriteReview(restaurants);
   }

   clearListRestaurants() {
   $("#restaurantsList").html("");
   }

   publishReview() {
      for (let restaurant of restaurants) {
         let inputGroupSelectRestaurant = document.getElementById("inputGroupSelectRestaurant" + restaurant.id);
         let FormControlTextareaRestaurant = document.getElementById("FormControlTextareaRestaurant" + restaurant.id);
         let restaurantsName = document.getElementById(restaurant.id);

         $("#publishReview" + restaurant.id).on("click", function(){
            if (inputGroupSelectRestaurant.value >= 1 && inputGroupSelectRestaurant.value <= 5 && FormControlTextareaRestaurant.value) {
                  if (restaurant.id === parseInt(restaurantsName.id)) {
                     restaurant.reviews.push(
                        new Review(parseInt(inputGroupSelectRestaurant.value), FormControlTextareaRestaurant.value)
                     );
                     $("#modal-body-consult-restaurant" + restaurant.id).html("");
                  }

                  for (let i = 0; i < restaurant.reviews.length; i++) {
                     $('<div>').prependTo($("#modal-body-consult-restaurant" + restaurant.id)).attr("id", "consultRating" + i + "Restaurant" + restaurant.id);
                     $('<p>').prependTo($("#consultRating" + i + "Restaurant" + restaurant.id)).addClass("comment").attr("id", "comment" + i + "Restaurant" + restaurant.id).html(restaurant.reviews[i].comment);
                     $('<p>').appendTo($('#consultRating'+ i + "Restaurant" + restaurant.id)).addClass("stars").attr("id", "stars" + i + "Restaurant" + restaurant.id).html("Note : " + restaurant.reviews[i].stars + " / 5");
                  }

                  $("#publishReview" + restaurant.id).attr("disabled", "true");
                  $('<p>').appendTo($("#modal-body-writeReview" + restaurant.id)).html("Votre avis a bien été enregistré !").addClass("alertMessage text-center animate__animated animate__flash").css({color: "red", fontWeight: "bolder", fontSize: "small"});
                  $('<p>').appendTo($("#modal-body-writeReview" + restaurant.id)).html("Merci de bien vouloir cliquer sur Fermer").addClass("alertMessage text-center animate__animated animate__flash").css({color: "red", fontWeight: "bolder", fontSize: "small"});

                  let totalStars = restaurant.reviews.reduce(function(sum, reviews){
                     return sum + reviews.stars;
                     }, 0);
                  
                  let averagereviews = (totalStars / restaurant.reviews.length);
            
                  restaurant.averagereviews = averagereviews.toFixed(1);
                  restaurant.sumStars = totalStars;
                  restaurant.numberreviews = restaurant.reviews.length;
                  $("#review" + restaurant.id).html("Note moyenne : " + restaurant.averagereviews + " / 5");
            } else {
                  alert("Merci de renseigner une note et un commentaire, sinon merci de cliquer sur Fermer")
            }
         });
            
         $("#modal-footer-writeReview" + restaurant.id +  " .btn-secondary").click(function(){
            inputGroupSelectRestaurant.value = "";
            $("#spanResultRating" + restaurant.id).html("");
            FormControlTextareaRestaurant.value = "";
            $("#spanResultComment" + restaurant.id).html("");
            $('.alertMessage').remove();
            $("#publishReview" + restaurant.id).removeAttr("disabled");
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

let restaurantResults = [];

let restaurants = [
   new Restaurant(1, "Bronco", "39 Rue des Petites Écuries, 75010 Paris", 48.8737815, 2.3501649, [
      new Review(4, "Un excellent restaurant, j'y reviendrai ! Par contre il vaut mieux aimer la viande."),
      new Review(5, "Tout simplement mon restaurant préféré !"),
   ]),
   new Restaurant(2, "Babalou", "4 Rue Lamarck, 75018 Paris", 48.8865035, 2.3442197, [
      new Review(5, "Une minuscule pizzeria délicieuse cachée juste à côté du Sacré choeur !"),
      new Review(3, "J'ai trouvé ça correct, sans plus"),
   ]),
   new Restaurant(3, "Restaurant Le Gabriel", "42 Avenue Gabriel, 75008 Paris", 48.8697092, 2.313439, [
      new Review(5, "le Gabriel restera mon souvenir gastronomique le plus mémorable"),
      new Review(5, "Une excellente adresse que je recommande absolument."),
   ]),
   new Restaurant(4, "Ciel de Paris", "Tour Maine Montparnasse, 56ème, Avenue du Maine, 75015 Paris", 48.8430359, 2.3205622, [
      new Review(5, "Un très bel accueil, une ambiance chaleureuse. Les serveurs étaient au petit soin avec nous."),
      new Review(1, "Grosse déception. Le serveur et le service désastreux."),
   ]),
   new Restaurant(5, "Epicure", "112 Rue du Faubourg Saint-Honoré, 75008 Paris", 48.8717179, 2.3148011, [
      new Review(4, "Service impeccable et pas froid comme peuvent l’être de nombreux restaurants étoilés."),
      new Review(3, "Un peu déçu pour cet étoilé."),
   ]),
   new Restaurant(6, "Boutary", "25 Rue Mazarine, 75006 Paris", 48.8548953, 2.3380191, [
      new Review(5, "Merci pour cette expérience culinaire mémorable et pour le professionnalisme de l'ensemble du personnel. Chef très talentueux !"),
      new Review(5, "Un grand moment !! Raffinement du service mais pas guindé, raffinement des goûts, un cadre moderne et sobre."),
   ]),
];

console.log(restaurants);