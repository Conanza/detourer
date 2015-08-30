$(document).ready(function() {
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
  }).init();
  var aDestination = new Detourer.SearchField({
    inputEl: document.getElementById("driver-A-destination"),
    searchBoundOptions: options,
  }).init();
  var bOrigin = new Detourer.SearchField({
    inputEl: document.getElementById("driver-B-origin"),
    searchBoundOptions: options,
  }).init();
  var bDestination = new Detourer.SearchField({
    inputEl: document.getElementById("driver-B-destination"),
    searchBoundOptions: options,
  }).init();

  var mapA = new Detourer.Map({
    mapEl: document.getElementById("driver-A-map"),
    originField: aOrigin,
    destField: aDestination,
    dirEl: document.getElementById("directionsA")
  }).init();
  var mapB = new Detourer.Map({
    mapEl: document.getElementById("driver-B-map"),
    originField: bOrigin,
    destField: bDestination,
    dirEl: document.getElementById("directionsB")
  }).init();

  $("a").on("click", function() {
    $(".modal-background").toggleClass("active");
    $(".detour-modal").toggleClass("active");

    var detourA = new Detourer.Map({
      mapEl: document.getElementById("detour-A-map")
    }).init();

    var detourB = new Detourer.Map({
      mapEl: document.getElementById("detour-B-map")
    }).init();
  });

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
});
