"use strict";

var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  child.__proto__ = parent;
};

require("6to5/polyfill");
var Promise = require("bluebird");
module.exports = function (Router) {
  var _ = require("lodash-next");

  var ConstantRouter = (function (Router) {
    var ConstantRouter = function ConstantRouter(map) {
      _.dev(function () {
        return map.should.be.an.Object && Object.keys(map).map(function (pattern) {
          return pattern.should.be.a.String;
        });
      });
      var routes = _.mapValues(map, function (value) {
        return function () {
          return value;
        };
      });
      Router.call(this, routes);
    };

    _extends(ConstantRouter, Router);

    return ConstantRouter;
  })(Router);

  return ConstantRouter;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImY6L1VzZXJzL0VsaWUvZ2l0L3JlYWN0L25leHVzLXJvdXRlci9zcmMvQ29uc3RhbnRSb3V0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDekIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2xDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBUyxNQUFNLEVBQUU7QUFDaEMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDOztNQUUzQixjQUFjLGNBQVMsTUFBTTtRQUE3QixjQUFjLEdBRVAsU0FGUCxjQUFjLENBRU4sR0FBRyxFQUFFO0FBQ2YsT0FBQyxDQUFDLEdBQUcsQ0FBQztlQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTztpQkFBSyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTTtTQUFBLENBQUM7T0FBQSxDQUM5RCxDQUFDO0FBQ0YsVUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsVUFBQyxLQUFLO2VBQUs7aUJBQU0sS0FBSztTQUFBO09BQUEsQ0FBQyxDQUFDO0FBTjdCLEFBT3pCLFlBUCtCLFlBT3pCLE1BQU0sQ0FBQyxDQUFDO0tBQ2Y7O2FBUkcsY0FBYyxFQUFTLE1BQU07O1dBQTdCLGNBQWM7S0FBUyxNQUFNOztBQVduQyxTQUFPLGNBQWMsQ0FBQztDQUN2QixDQUFDIiwiZmlsZSI6IkNvbnN0YW50Um91dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnNnRvNS9wb2x5ZmlsbCcpO1xudmFyIFByb21pc2UgPSByZXF1aXJlKCdibHVlYmlyZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihSb3V0ZXIpIHtcclxuICBjb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoLW5leHQnKTtcclxuXHJcbiAgY2xhc3MgQ29uc3RhbnRSb3V0ZXIgZXh0ZW5kcyBSb3V0ZXIge1xyXG4gICAgLy8gU2ltcGxpZmllZCBSb3V0ZXIgd2hpY2ggbWFwcyBwYXR0ZXJuIHRvIGZsYXQgdmFsdWVzLlxyXG4gICAgY29uc3RydWN0b3IobWFwKSB7XHJcbiAgICAgIF8uZGV2KCgpID0+IG1hcC5zaG91bGQuYmUuYW4uT2JqZWN0ICYmXHJcbiAgICAgICAgT2JqZWN0LmtleXMobWFwKS5tYXAoKHBhdHRlcm4pID0+IHBhdHRlcm4uc2hvdWxkLmJlLmEuU3RyaW5nKVxyXG4gICAgICApO1xyXG4gICAgICBsZXQgcm91dGVzID0gXy5tYXBWYWx1ZXMobWFwLCAodmFsdWUpID0+ICgpID0+IHZhbHVlKTtcclxuICAgICAgc3VwZXIocm91dGVzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBDb25zdGFudFJvdXRlcjtcclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9