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

  SearchField.prototype.bindEventHandlers = function() {
  };

  SearchField.prototype.render = function() {
    this.bindEventHandlers();
    return this.field;
  };
})();
