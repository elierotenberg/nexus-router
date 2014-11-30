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

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;module.exports = function (Router) {
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