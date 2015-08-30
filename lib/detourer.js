$(document).ready(function() {
  // optimize search results for the sf peninsula to the east bay
  var searchBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(37.6228, -122.4856),
    new google.maps.LatLng(37.9064, -122.0650)
  );
  var options = {
    bounds: searchBounds
  };
  var aOrigin = new Detourer.SearchField({
    inputEl: document.getElementById("driver-A-origin"),
    searchBoundOptions: options,
  }).render();
  var aDestination = new Detourer.SearchField({
    inputEl: document.getElementById("driver-A-destination"),
    searchBoundOptions: options,
  }).render();
  var bOrigin = new Detourer.SearchField({
    inputEl: document.getElementById("driver-B-origin"),
    searchBoundOptions: options,
  }).render();
  var bDestination = new Detourer.SearchField({
    inputEl: document.getElementById("driver-B-destination"),
    searchBoundOptions: options,
  }).render();

  // draw out original routes and directions for fun
  var mapA = new Detourer.Map({
    mapEl: document.getElementById("driver-A-map"),
    originField: aOrigin,
    destField: aDestination,
    dirEl: document.getElementById("directionsA")
  }).render();
  var mapB = new Detourer.Map({
    mapEl: document.getElementById("driver-B-map"),
    originField: bOrigin,
    destField: bDestination,
    dirEl: document.getElementById("directionsB")
  }).render();

  // show the modal for detoured routes with newly retrieved waypoints
  $("a").on(
    "click",
    {
      aOrigin: aOrigin,
      aDestination: aDestination,
      mapA: mapA,
      bOrigin: bOrigin,
      bDestination: bDestination,
      mapB: mapB
    },
    function(e) {
      $(".modal-background").toggleClass("active");
      $(".detour-modal").toggleClass("active");

      if (!e.data.aOrigin.getPlace() || !e.data.aDestination.getPlace()) return;
      if (!e.data.bOrigin.getPlace() || !e.data.bDestination.getPlace()) return;

      var detourA = new Detourer.Map({
        mapEl: document.getElementById("detour-A-map"),
        originField: e.data.aOrigin,
        destField: e.data.aDestination,
        waypoints: getWaypoints(bOrigin, bDestination)
      }).render();
      // requesting routes from google is async
      // setup promise in #calcRoute so that we can properly render stats
      detourA.calcRoute().then(function(val) {
        new Detourer.DetourStats({
          statEl: document.getElementById("detour-A-stats"),
          originalRoute: mapA,
          detourRoute: val
        }).render();
      }).catch(function(reason) {
        console.log("temp error handler: " + reason);
      });

      var detourB = new Detourer.Map({
        mapEl: document.getElementById("detour-B-map"),
        originField: e.data.bOrigin,
        destField: e.data.bDestination,
        waypoints: getWaypoints(aOrigin, aDestination)
      }).render();
      detourB.calcRoute().then(function(val) {
        new Detourer.DetourStats({
          statEl: document.getElementById("detour-B-stats"),
          originalRoute: mapB,
          detourRoute: val
        }).render();
      }).catch(function(reason) {
        console.log("temp error handler: " + reason);
      });
    }
  );

  $(".modal-background").on("click", function() {
    $(".modal-background").toggleClass("active");
    $(".detour-modal").toggleClass("active");
  });
  $(document).on("keydown", function(e) {
    if ($(".modal-background")[0].className.indexOf("active") > 1) {
      if (e.keyCode === 27) {
        e.preventDefault();
        $(".modal-background").toggleClass("active");
        $(".detour-modal").toggleClass("active");
      }
    }
  });

  function getWaypoints() {
    var waypts = [];
    for (var i = 0, n = arguments.length; i < n; i++) {
      if (arguments[i].getPlace()) {
        var location = arguments[i].getPlace().formatted_address ||
          arguments[i].getPlace().name;

        waypts.push({
          location: location,
          stopover: true
        });
      }
    }

    return waypts;
  }
});
