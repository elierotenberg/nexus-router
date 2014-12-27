"use strict";

var _inherits = function (child, parent) {
  child.prototype = Object.create(parent && parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (parent) child.__proto__ = parent;
};

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = process.env.NODE_ENV !== "production";var __PROD__ = !__DEV__;var __BROWSER__ = typeof window === "object";var __NODE__ = !__BROWSER__;module.exports = function (Router) {
  var _ = require("lodash-next");

  var ConstantRouter =
  // Simplified Router which maps pattern to flat values.
  function ConstantRouter(map) {
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

  _inherits(ConstantRouter, Router);

  return ConstantRouter;
};