"use strict";

var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = process.env.NODE_ENV !== "production";var __PROD__ = !__DEV__;var __BROWSER__ = typeof window === "object";var __NODE__ = !__BROWSER__;var _ = require("lodash-next");

var optionalParam = /\((.*?)\)/g;
var namedParam = /(\(\?)?:\w+/g;
var splatParam = /\*\w+/g;
var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

function routeToRegExp(pattern) {
  pattern = pattern.replace(escapeRegExp, "\\$&").replace(optionalParam, "(?:$1)?").replace(namedParam, function (match, optional) {
    return optional ? match : "([^/?]+)";
  }).replace(splatParam, "([^?]*?)");
  return new RegExp("^" + pattern + "(?:\\?([\\s\\S]*))?$");
}

function extractFragmentParameters(regexp, fragment) {
  var params = regexp.exec(fragment).slice(1);
  return params.map(function (i) {
    var param = params[i];
    if (i === params.length - 1) {
      return param || null;
    }
    return param ? decodeURIComponent(param) : null;
  });
}

var Router = function Router(routes) {
  var _this = this;
  if (routes === undefined) routes = {};
  _.dev(function () {
    return routes.should.be.an.Object && Object.keys(routes).map(function (pattern) {
      return pattern.should.be.a.String && routes[pattern].should.be.a.Function;
    });
  });
  this._routes = {};
  Object.keys(routes).forEach(function (pattern) {
    return _this.route(pattern, routes[pattern]);
  });
};

Router.prototype.route = function (pattern, fn) {
  var _this2 = this;
  if (!fn) {
    _.dev(function () {
      return (_this2._routes[pattern] !== void 0).should.be.ok;
    });
    return this._routes[pattern];
  }
  _.dev(function () {
    return (_this2._routes[pattern] === void 0).should.be.ok && fn.should.be.a.Function;
  });
  if (pattern === null) {
    return this["default"](fn);
  }
  var regexp = routeToRegExp(pattern);
  this._routes[pattern] = { regexp: regexp, fn: fn };
  return this;
};

Router.prototype.routes = function (patterns) {
  var _this3 = this;
  if (!patterns) {
    return this._routes;
  }
  Object.keys(patterns).forEach(function (pattern) {
    return _this3.route(pattern, patterns[pattern]);
  });
  return this;
};

Router.prototype["default"] = function (fn) {
  if (!fn) {
    return this._default;
  }
  this._default = fn;
  return this;
};

Router.prototype.match = function (fragment) {
  var _this4 = this;
  var res = null;
  Object.keys(this._routes).forEach(function (pattern) {
    var regexp = _this4._routes[pattern].regexp;
    var fn = _this4._routes[pattern].fn;
    if (res !== null) {
      return;
    }
    if (fragment.match(regexp) !== null) {
      var params = extractFragmentParameters(regexp, fragment);
      params.push(fragment);
      res = fn.apply(null, _toArray(params));
    }
  });
  if (!res && this._default) {
    res = this._default.call(null, fragment);
  }
  return res;
};

var ConstantRouter = require("./ConstantRouter")(Router);

_.extend(Router, { ConstantRouter: ConstantRouter });

module.exports = Router;