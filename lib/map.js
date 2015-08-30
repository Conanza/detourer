(function() {
  if (typeof Detourer === "undefined") {
    window.Detourer = {};
  }

  var Map = Detourer.Map = function(options) {
    this.el = options.mapEl;
    this.origin = options.originField;
    this.destination = options.destField;
    this.directionEl = options.dirEl;
    this.map = new google.maps.Map(this.el, {
      center: {lat: 37.7833, lng: -122.4167},
      zoom: 13
    });
  };

  Map.prototype.bindEventHandlers = function() {
    this.origin.addListener("place_changed", this.calcRoute.bind(this));
    this.destination.addListener("place_changed", this.calcRoute.bind(this));
  };

  Map.prototype.calcRoute = function(e) {
    var start = this.origin.getPlace().formatted_address || this.origin.getPlace().name;
    var end = this.destination.getPlace().formatted_address || this.destination.getPlace().name;

    if (start && end) {
      var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
        durationInTraffic: true
      };
      this.directionsService.route(request, function(result, status) {
// result.routes[0].legs[0].duration.text
// result.routes[0].legs[0].distance.text
// result.routes[0].legs[0].start_address
// result.routes[0].legs[0].end_address
// result.routes[0].legs[0].start_location
// result.routes[0].legs[0].end_location


        if (status == google.maps.DirectionsStatus.OK) {
          this.directionsDisplay.setDirections(result);
        } else if (status == google.maps.DirectionsStatus.NOT_FOUND) {
          console.log("NOT FOUND");
        } else if (status == google.maps.DirectionsStatus.INVALID_REQUEST) {
          console.log("INVALID REQUEST");
        } else if (status == google.maps.DirectionsStatus.UNKNOWN_ERROR) {
          console.log("server error");
        }
      }.bind(this));
    }
  };

  Map.prototype.init = function() {
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(this.map);

    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(this.directionEl);

    this.bindEventHandlers();

    return this.map;
  };
})();
