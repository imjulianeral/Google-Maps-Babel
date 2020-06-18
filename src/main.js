google.maps.event.addDomListener(window, 'load', () => {
  const userLocation = new UserLocation(() => {
    let travelMode = document.querySelector('#travel-mode')

    if (travelMode.value === '0') {
      travelMode.addEventListener('change', e => {
        document.querySelector('.full-screen').style.display = 'none'
        travelMode.value = e.target.value
      })
    } else {
      document.querySelector('.full-screen').style.display = 'none'
    }

    const mapOptions = {
      zoom: 15,
      center: {
        lat: userLocation.latitude,
        lng: userLocation.longitude,
      },
    }
    const mapElement = document.querySelector('#map')
    const map = new google.maps.Map(mapElement, mapOptions)
    const searchInput = document.querySelector('#search-place')
    const autocomplete = new google.maps.places.Autocomplete(searchInput)
    const marker = new google.maps.Marker({ map })

    autocomplete.bindTo('bounds', map)

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace()
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport)
      } else {
        map.setCenter(place.geometry.location)
      }

      marker.setPlace({
        placeId: place.place_id,
        location: place.geometry.location,
      })

      marker.setVisible(true)

      calculateDistance(place.geometry.location, userLocation, travelMode.value)
    })
  })

  const calculateDistance = (place, start, conveyance) => {
    const origin = new google.maps.LatLng(start.latitude, start.longitude)
    const service = new google.maps.DistanceMatrixService()

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [place],
        travelMode: google.maps.TravelMode[conveyance],
      },
      (response, status) => {
        const data = response.rows[0].elements[0]
        const distance = data.distance.text
        const duration = data.duration.text

        document.querySelector('#info').innerHTML = `
          You are ${distance} from the place and is going to take ${duration} to go there
        `
      }
    )
  }
})
