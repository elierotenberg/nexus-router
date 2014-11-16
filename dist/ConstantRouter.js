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
  var _ = require("lodasht-next");

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImc6L3JlYWN0LW5leHVzL25leHVzLXJvdXRlci9zcmMvQ29uc3RhbnRSb3V0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDekIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2xDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBUyxNQUFNLEVBQUU7QUFDaEMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDOztNQUU1QixjQUFjLGNBQVMsTUFBTTtRQUE3QixjQUFjLEdBRVAsU0FGUCxjQUFjLENBRU4sR0FBRyxFQUFFO0FBQ2YsT0FBQyxDQUFDLEdBQUcsQ0FBQztlQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTztpQkFBSyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTTtTQUFBLENBQUM7T0FBQSxDQUM5RCxDQUFDO0FBQ0YsVUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsVUFBQyxLQUFLO2VBQUs7aUJBQU0sS0FBSztTQUFBO09BQUEsQ0FBQyxDQUFDO0FBTjdCLEFBT3pCLFlBUCtCLFlBT3pCLE1BQU0sQ0FBQyxDQUFDO0tBQ2Y7O2FBUkcsY0FBYyxFQUFTLE1BQU07O1dBQTdCLGNBQWM7S0FBUyxNQUFNOztBQVduQyxTQUFPLGNBQWMsQ0FBQztDQUN2QixDQUFDIiwiZmlsZSI6IkNvbnN0YW50Um91dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnNnRvNS9wb2x5ZmlsbCcpO1xudmFyIFByb21pc2UgPSByZXF1aXJlKCdibHVlYmlyZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihSb3V0ZXIpIHtcclxuICBjb25zdCBfID0gcmVxdWlyZSgnbG9kYXNodC1uZXh0Jyk7XHJcblxyXG4gIGNsYXNzIENvbnN0YW50Um91dGVyIGV4dGVuZHMgUm91dGVyIHtcclxuICAgIC8vIFNpbXBsaWZpZWQgUm91dGVyIHdoaWNoIG1hcHMgcGF0dGVybiB0byBmbGF0IHZhbHVlcy5cclxuICAgIGNvbnN0cnVjdG9yKG1hcCkge1xyXG4gICAgICBfLmRldigoKSA9PiBtYXAuc2hvdWxkLmJlLmFuLk9iamVjdCAmJlxyXG4gICAgICAgIE9iamVjdC5rZXlzKG1hcCkubWFwKChwYXR0ZXJuKSA9PiBwYXR0ZXJuLnNob3VsZC5iZS5hLlN0cmluZylcclxuICAgICAgKTtcclxuICAgICAgbGV0IHJvdXRlcyA9IF8ubWFwVmFsdWVzKG1hcCwgKHZhbHVlKSA9PiAoKSA9PiB2YWx1ZSk7XHJcbiAgICAgIHN1cGVyKHJvdXRlcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gQ29uc3RhbnRSb3V0ZXI7XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==