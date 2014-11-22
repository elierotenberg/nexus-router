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

  var _ConstantRouter = (function (Router) {
    var _ConstantRouter =
    // Simplified Router which maps pattern to flat values.
    function _ConstantRouter(map) {
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

    _extends(_ConstantRouter, Router);

    return _ConstantRouter;
  })(Router);

  return _ConstantRouter;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnN0YW50Um91dGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3pCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNsQyxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVMsTUFBTSxFQUFFO0FBQ2hDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQzs7TUFFM0IsZUFBYyxjQUFTLE1BQU07UUFBN0IsZUFBYzs7QUFFUCxhQUZQLGVBQWMsQ0FFTixHQUFHLEVBQUU7QUFDZixPQUFDLENBQUMsR0FBRyxDQUFDO2VBQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFPO2lCQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNO1NBQUEsQ0FBQztPQUFBLENBQzlELENBQUM7QUFDRixVQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxVQUFDLEtBQUs7ZUFBSztpQkFBTSxLQUFLO1NBQUE7T0FBQSxDQUFDLENBQUM7QUFON0IsQUFPekIsWUFQK0IsWUFPekIsTUFBTSxDQUFDLENBQUM7S0FDZjs7YUFSRyxlQUFjLEVBQVMsTUFBTTs7V0FBN0IsZUFBYztLQUFTLE1BQU07O0FBV25DLFNBQU8sZUFBYyxDQUFDO0NBQ3ZCLENBQUMiLCJmaWxlIjoiQ29uc3RhbnRSb3V0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFJvdXRlcikge1xyXG4gIGNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gtbmV4dCcpO1xyXG5cclxuICBjbGFzcyBDb25zdGFudFJvdXRlciBleHRlbmRzIFJvdXRlciB7XHJcbiAgICAvLyBTaW1wbGlmaWVkIFJvdXRlciB3aGljaCBtYXBzIHBhdHRlcm4gdG8gZmxhdCB2YWx1ZXMuXHJcbiAgICBjb25zdHJ1Y3RvcihtYXApIHtcclxuICAgICAgXy5kZXYoKCkgPT4gbWFwLnNob3VsZC5iZS5hbi5PYmplY3QgJiZcclxuICAgICAgICBPYmplY3Qua2V5cyhtYXApLm1hcCgocGF0dGVybikgPT4gcGF0dGVybi5zaG91bGQuYmUuYS5TdHJpbmcpXHJcbiAgICAgICk7XHJcbiAgICAgIGxldCByb3V0ZXMgPSBfLm1hcFZhbHVlcyhtYXAsICh2YWx1ZSkgPT4gKCkgPT4gdmFsdWUpO1xyXG4gICAgICBzdXBlcihyb3V0ZXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIENvbnN0YW50Um91dGVyO1xyXG59O1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=