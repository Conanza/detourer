(function() {
  if (typeof Detourer === "undefined") {
    window.Detourer = {};
  }

  var SearchField = Detourer.SearchField = function(options) {
    this.inputEl = options.inputEl;
    this.searchBoundOptions = options.searchBoundOptions;
    this.field = new google.maps.places.Autocomplete(
      this.inputEl,
      this.searchBoundOptions
    );
  };

  SearchField.prototype.render = function() {
    return this.field;
  };
})();
