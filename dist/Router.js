"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

require("6to5/polyfill");
var Promise = require("bluebird");
var _ = require("lodash-next");

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

var Router = (function () {
  var Router = function Router(routes) {
    var _this = this;
    if (routes === undefined) routes = {};
    return (function () {
      _.dev(function () {
        return routes.should.be.an.Object && Object.keys(routes).map(function (pattern) {
          return pattern.should.be.a.String && routes[pattern].should.be.a.Function;
        });
      });
      _this._routes = {};
    })();
  };

  _classProps(Router, null, {
    route: {
      writable: true,
      value: function (pattern, fn) {
        var _this2 = this;
        if (!fn) {
          _.dev(function () {
            return _this2._routes.should.have.property(pattern);
          });
          return this._routes[pattern];
        }
        _.dev(function () {
          return _this2._routes.should.not.have.property(pattern) && fn.should.be.a.Function;
        });
        if (pattern === null) {
          return this["default"](fn);
        }
        var regexp = routeToRegExp(pattern);
        this._routes[pattern] = { regexp: regexp, fn: fn };
        return this;
      }
    },
    routes: {
      writable: true,
      value: function (patterns) {
        var _this3 = this;
        if (!patterns) {
          return this._routes;
        }
        Object.keys(patterns).forEach(function (pattern) {
          return _this3.route(pattern, patterns[pattern]);
        });
        return this;
      }
    },
    default: {
      writable: true,
      value: function (fn) {
        if (!fn) {
          return this._default;
        }
        this._default = fn;
      }
    },
    match: {
      writable: true,
      value: function (fragment) {
        var _this4 = this;
        var res = null;
        Object.keys(this._routes, function (pattern) {
          var regexp = _this4._routes[pattern].regexp;
          var fn = _this4._routes[pattern].fn;
          if (res !== null) {
            return;
          }
          if (fragment.match(regexp) !== null) {
            var params = extractFragmentParameters(regexp, fragment);
            params.push(fragment);
            res = fn.apply(null, Array.from(params));
          }
        });
        if (!res && this._default) {
          res = this._default.call(null, fragment);
        }
        return res;
      }
    }
  });

  return Router;
})();

var ConstantRouter = require("./ConstantRouter")(Router);

_.extend(Router, { ConstantRouter: ConstantRouter });

module.exports = Router;
//# sourceMappingURL=data:application/json;base64,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QUcsS0FBSyxJQUFJLEVBQUU7QUFDZixtQkFBTztXQUNSO0FBQ0QsY0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTtBQUNsQyxnQkFBSSxNQUFNLEdBQUcseUJBQXlCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3pELGtCQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3RCLGVBQUcsR0FBRyxFQUFFLHdCQUFJLE1BQU0sRUFBQyxDQUFDO1dBQ3JCO1NBQ0YsQ0FBQyxDQUFDO0FBQ0gsWUFBRyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ3hCLGFBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDMUM7QUFDRCxlQUFPLEdBQUcsQ0FBQztPQUNaOzs7O1NBeERHLE1BQU07OztBQTJEWixJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFM0QsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxjQUFjLEVBQWQsY0FBYyxFQUFFLENBQUMsQ0FBQzs7QUFFckMsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMiLCJmaWxlIjoiUm91dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaC1uZXh0Jyk7XG5cbmNvbnN0IG9wdGlvbmFsUGFyYW0gPSAvXFwoKC4qPylcXCkvZztcbmNvbnN0IG5hbWVkUGFyYW0gPSAvKFxcKFxcPyk/OlxcdysvZztcbmNvbnN0IHNwbGF0UGFyYW0gPSAvXFwqXFx3Ky9nO1xuY29uc3QgZXNjYXBlUmVnRXhwID0gL1tcXC17fVxcW1xcXSs/LixcXFxcXFxeJHwjXFxzXS9nO1xuXG5mdW5jdGlvbiByb3V0ZVRvUmVnRXhwKHBhdHRlcm4pIHtcbiAgcGF0dGVybiA9IHBhdHRlcm4ucmVwbGFjZShlc2NhcGVSZWdFeHAsICdcXFxcJCYnKVxuICAucmVwbGFjZShvcHRpb25hbFBhcmFtLCAnKD86JDEpPycpXG4gIC5yZXBsYWNlKG5hbWVkUGFyYW0sIGZ1bmN0aW9uKG1hdGNoLCBvcHRpb25hbCkge1xuICAgIHJldHVybiBvcHRpb25hbCA/IG1hdGNoIDogJyhbXi8/XSspJztcbiAgfSlcbiAgLnJlcGxhY2Uoc3BsYXRQYXJhbSwgJyhbXj9dKj8pJyk7XG4gIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHBhdHRlcm4gKyAnKD86XFxcXD8oW1xcXFxzXFxcXFNdKikpPyQnKTtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdEZyYWdtZW50UGFyYW1ldGVycyhyZWdleHAsIGZyYWdtZW50KSB7XG4gIGxldCBwYXJhbXMgPSByZWdleHAuZXhlYyhmcmFnbWVudCkuc2xpY2UoMSk7XG4gIHJldHVybiBwYXJhbXMubWFwKChpKSA9PiB7XG4gICAgbGV0IHBhcmFtID0gcGFyYW1zW2ldO1xuICAgIGlmKGkgPT09IHBhcmFtcy5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm4gcGFyYW0gfHwgbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtID8gZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtKSA6IG51bGw7XG4gIH0pO1xufVxuXG5jbGFzcyBSb3V0ZXIge1xuICBjb25zdHJ1Y3Rvcihyb3V0ZXMgPSB7fSkge1xuICAgIF8uZGV2KCgpID0+IHJvdXRlcy5zaG91bGQuYmUuYW4uT2JqZWN0ICYmXG4gICAgICBPYmplY3Qua2V5cyhyb3V0ZXMpLm1hcCgocGF0dGVybikgPT4gcGF0dGVybi5zaG91bGQuYmUuYS5TdHJpbmcgJiYgcm91dGVzW3BhdHRlcm5dLnNob3VsZC5iZS5hLkZ1bmN0aW9uKVxuICAgICk7XG4gICAgdGhpcy5fcm91dGVzID0ge307XG4gIH1cblxuICByb3V0ZShwYXR0ZXJuLCBmbikge1xuICAgIGlmKCFmbikge1xuICAgICAgXy5kZXYoKCkgPT4gdGhpcy5fcm91dGVzLnNob3VsZC5oYXZlLnByb3BlcnR5KHBhdHRlcm4pKTtcbiAgICAgIHJldHVybiB0aGlzLl9yb3V0ZXNbcGF0dGVybl07XG4gICAgfVxuICAgIF8uZGV2KCgpID0+IHRoaXMuX3JvdXRlcy5zaG91bGQubm90LmhhdmUucHJvcGVydHkocGF0dGVybikgJiZcbiAgICAgIGZuLnNob3VsZC5iZS5hLkZ1bmN0aW9uXG4gICAgKTtcbiAgICBpZihwYXR0ZXJuID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWZhdWx0KGZuKTtcbiAgICB9XG4gICAgbGV0IHJlZ2V4cCA9IHJvdXRlVG9SZWdFeHAocGF0dGVybik7XG4gICAgdGhpcy5fcm91dGVzW3BhdHRlcm5dID0geyByZWdleHAsIGZuIH07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByb3V0ZXMocGF0dGVybnMpIHtcbiAgICBpZighcGF0dGVybnMpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yb3V0ZXM7XG4gICAgfVxuICAgIE9iamVjdC5rZXlzKHBhdHRlcm5zKS5mb3JFYWNoKChwYXR0ZXJuKSA9PiB0aGlzLnJvdXRlKHBhdHRlcm4sIHBhdHRlcm5zW3BhdHRlcm5dKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkZWZhdWx0KGZuKSB7XG4gICAgaWYoIWZuKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdDtcbiAgICB9XG4gICAgdGhpcy5fZGVmYXVsdCA9IGZuO1xuICB9XG5cbiAgbWF0Y2goZnJhZ21lbnQpIHtcbiAgICBsZXQgcmVzID0gbnVsbDtcbiAgICBPYmplY3Qua2V5cyh0aGlzLl9yb3V0ZXMsIChwYXR0ZXJuKSA9PiB7XG4gICAgICBsZXQgeyByZWdleHAsIGZuIH0gPSB0aGlzLl9yb3V0ZXNbcGF0dGVybl07XG4gICAgICBpZihyZXMgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYoZnJhZ21lbnQubWF0Y2gocmVnZXhwKSAhPT0gbnVsbCkge1xuICAgICAgICBsZXQgcGFyYW1zID0gZXh0cmFjdEZyYWdtZW50UGFyYW1ldGVycyhyZWdleHAsIGZyYWdtZW50KTtcbiAgICAgICAgcGFyYW1zLnB1c2goZnJhZ21lbnQpO1xuICAgICAgICByZXMgPSBmbiguLi5wYXJhbXMpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmKCFyZXMgJiYgdGhpcy5fZGVmYXVsdCkge1xuICAgICAgcmVzID0gdGhpcy5fZGVmYXVsdC5jYWxsKG51bGwsIGZyYWdtZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuXG5jb25zdCBDb25zdGFudFJvdXRlciA9IHJlcXVpcmUoJy4vQ29uc3RhbnRSb3V0ZXInKShSb3V0ZXIpO1xuXG5fLmV4dGVuZChSb3V0ZXIsIHsgQ29uc3RhbnRSb3V0ZXIgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUm91dGVyO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9