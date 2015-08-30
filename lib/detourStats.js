(function() {
  if (typeof Detourer === "undefined") {
    window.Detourer = {};
  }

  var DetourStats = Detourer.DetourStats = function(options) {
    this.el = options.statEl;
    this.originalRoute = options.originalRoute;
    this.detourRoute = options.detourRoute;
  };

  DetourStats.prototype.calculateDetour = function() {
    return this.detourRoute.totalDistance - this.originalRoute.totalDistance;
  };

  DetourStats.prototype.render = function() {
    $(this.el).empty();
    var milesAdded = this.calculateDetour();
    $(this.el).append(
      "<p> Extra distance due to detour: " + milesAdded + "</p>"
    );
    return this;
  };
})();