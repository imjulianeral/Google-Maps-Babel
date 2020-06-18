"use strict";

google.maps.event.addDomListener(window, 'load', function () {
  var userLocation = new UserLocation(function () {
    var travelMode = document.querySelector('#travel-mode');

    if (travelMode.value === '0') {
      travelMode.addEventListener('change', function (e) {
        document.querySelector('.full-screen').style.display = 'none';
        travelMode.value = e.target.value;
      });
    } else {
      document.querySelector('.full-screen').style.display = 'none';
    }

    var mapOptions = {
      zoom: 15,
      center: {
        lat: userLocation.latitude,
        lng: userLocation.longitude
      }
    };
    var mapElement = document.querySelector('#map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var searchInput = document.querySelector('#search-place');
    var autocomplete = new google.maps.places.Autocomplete(searchInput);
    var marker = new google.maps.Marker({
      map: map
    });
    autocomplete.bindTo('bounds', map);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
      }

      marker.setPlace({
        placeId: place.place_id,
        location: place.geometry.location
      });
      marker.setVisible(true);
      calculateDistance(place.geometry.location, userLocation, travelMode.value);
    });
  });

  var calculateDistance = function calculateDistance(place, start, conveyance) {
    var origin = new google.maps.LatLng(start.latitude, start.longitude);
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [origin],
      destinations: [place],
      travelMode: google.maps.TravelMode[conveyance]
    }, function (response, status) {
      var data = response.rows[0].elements[0];
      var distance = data.distance.text;
      var duration = data.duration.text;
      document.querySelector('#info').innerHTML = "\n          You are ".concat(distance, " from the place and is going to take ").concat(duration, " to go there\n        ");
    });
  };
});