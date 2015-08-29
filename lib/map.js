(function () {
  if (typeof Detourer === "undefined") {
    window.Detourer = {};
  }

  var Map = Detourer.Map = function (options) {
    this.el = options.mapEl;
    this.map = new google.maps.Map(this.el, {
      center: {lat: 37.7833, lng: -122.4167},
      zoom: 13
    });
  };

  Map.prototype.bindKeyHandlers = function () {
  };

  Map.prototype.init = function () {
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(this.map);

    var searchBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(37.6228, -122.4856),
      new google.maps.LatLng(37.9064, -122.0650)
    );
    var options = {
      bounds: searchBounds
    };
    var input = document.getElementById("pac-input");
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var autocomplete = new google.maps.places.Autocomplete(input, options);

    this.bindKeyHandlers();
  };
})();
