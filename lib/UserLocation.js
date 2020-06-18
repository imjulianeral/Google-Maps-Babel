"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserLocation = /*#__PURE__*/function () {
  function UserLocation(callback) {
    var _this = this;

    _classCallCheck(this, UserLocation);

    this.options = {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 75000
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (location) {
        return _this.onSuccess(location, callback);
      }, this.onError, this.options);
    } else {
      alert('This browser not supports the features of this page');
    }
  }

  _createClass(UserLocation, [{
    key: "onSuccess",
    value: function onSuccess(location, callback) {
      this.latitude = location.coords.latitude;
      this.longitude = location.coords.longitude;
      callback();
    }
  }, {
    key: "onError",
    value: function onError(err) {
      console.error(err);
    }
  }]);

  return UserLocation;
}();