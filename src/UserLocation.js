class UserLocation {
  constructor(callback) {
    this.options = {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 75000,
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        location => this.onSuccess(location, callback),
        this.onError,
        this.options
      )
    } else {
      alert('This browser not supports the features of this page')
    }
  }

  onSuccess(location, callback) {
    this.latitude = location.coords.latitude
    this.longitude = location.coords.longitude

    callback()
  }
  onError(err) {
    console.error(err)
  }
}
