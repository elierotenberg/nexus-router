"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

require("6to5/polyfill");
var Promise = require("bluebird");
var _ = require("lodash-next");
var should = _.should;


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
  var Router = function Router() {
    this._routes = {};
  };

  _classProps(Router, null, {
    route: {
      writable: true,
      value: function (pattern, fn) {
        var _this = this;
        if (!fn) {
          _.dev(function () {
            return _this._routes[pattern].should.be.ok;
          });
          return this._routes[pattern];
        }
        _.dev(function () {
          return _this._routes[pattern].should.not.be.ok && fn.should.be.a.Function;
        });
        if (pattern === null) {
          return this.default(fn);
        }
        var regexp = routeToRegExp(pattern);
        this._routes[pattern] = { regexp: regexp, fn: fn };
        return this;
      }
    },
    routes: {
      writable: true,
      value: function (patterns) {
        var _this2 = this;
        if (!patterns) {
          return this._routes;
        }
        object.keys(pattern).forEach(function (pattern) {
          return _this2.route(pattern, patterns[pattern]);
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
        var _this3 = this;
        var res = null;
        object.keys(this._routes, function (pattern) {
          var regexp = _this3._routes[pattern].regexp;
          var fn = _this3._routes[pattern].fn;
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

module.exports = Router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImM6L1VzZXJzL0VsaWUvZ2l0L3JlYWN0L25leHVzLXJvdXRlci9zcmMvUm91dGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDekIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2xDLElBQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNqQyxJQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDOzs7QUFHeEIsSUFBTSxhQUFhLEdBQUcsWUFBWSxDQUFDO0FBQ25DLElBQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQztBQUNsQyxJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUM7QUFDNUIsSUFBTSxZQUFZLEdBQUcsMEJBQTBCLENBQUM7O0FBRWhELFNBQVMsYUFBYSxDQUFDLE9BQU8sRUFBRTtBQUM5QixTQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQzlDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQ2pDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsVUFBUyxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQzdDLFdBQU8sUUFBUSxHQUFHLEtBQUssR0FBRyxVQUFVLENBQUM7R0FDdEMsQ0FBQyxDQUNELE9BQU8sQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDakMsU0FBTyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEdBQUcsT0FBTyxHQUFHLHNCQUFzQixDQUFDLENBQUM7Q0FDM0Q7O0FBRUQsU0FBUyx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFO0FBQ25ELE1BQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVDLFNBQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMs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Q3JCO1NBQ0YsQ0FBQyxDQUFDO0FBQ0gsWUFBRyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ3hCLGFBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDMUM7QUFDRCxlQUFPLEdBQUcsQ0FBQztPQUNaOzs7O1NBckRHLE1BQU07OztBQXdEWixNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyIsImZpbGUiOiJSb3V0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCc2dG81L3BvbHlmaWxsJyk7XG52YXIgUHJvbWlzZSA9IHJlcXVpcmUoJ2JsdWViaXJkJyk7XG5jb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoLW5leHQnKTtcbmNvbnN0IHNob3VsZCA9IF8uc2hvdWxkO1xuXG5cbmNvbnN0IG9wdGlvbmFsUGFyYW0gPSAvXFwoKC4qPylcXCkvZztcbmNvbnN0IG5hbWVkUGFyYW0gPSAvKFxcKFxcPyk/OlxcdysvZztcbmNvbnN0IHNwbGF0UGFyYW0gPSAvXFwqXFx3Ky9nO1xuY29uc3QgZXNjYXBlUmVnRXhwID0gL1tcXC17fVxcW1xcXSs/LixcXFxcXFxeJHwjXFxzXS9nO1xuXG5mdW5jdGlvbiByb3V0ZVRvUmVnRXhwKHBhdHRlcm4pIHtcbiAgcGF0dGVybiA9IHBhdHRlcm4ucmVwbGFjZShlc2NhcGVSZWdFeHAsICdcXFxcJCYnKVxuICAucmVwbGFjZShvcHRpb25hbFBhcmFtLCAnKD86JDEpPycpXG4gIC5yZXBsYWNlKG5hbWVkUGFyYW0sIGZ1bmN0aW9uKG1hdGNoLCBvcHRpb25hbCkge1xuICAgIHJldHVybiBvcHRpb25hbCA/IG1hdGNoIDogJyhbXi8/XSspJztcbiAgfSlcbiAgLnJlcGxhY2Uoc3BsYXRQYXJhbSwgJyhbXj9dKj8pJyk7XG4gIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHBhdHRlcm4gKyAnKD86XFxcXD8oW1xcXFxzXFxcXFNdKikpPyQnKTtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdEZyYWdtZW50UGFyYW1ldGVycyhyZWdleHAsIGZyYWdtZW50KSB7XG4gIGxldCBwYXJhbXMgPSByZWdleHAuZXhlYyhmcmFnbWVudCkuc2xpY2UoMSk7XG4gIHJldHVybiBwYXJhbXMubWFwKChpKSA9PiB7XG4gICAgbGV0IHBhcmFtID0gcGFyYW1zW2ldO1xuICAgIGlmKGkgPT09IHBhcmFtcy5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm4gcGFyYW0gfHwgbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtID8gZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtKSA6IG51bGw7XG4gIH0pO1xufVxuXG5jbGFzcyBSb3V0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9yb3V0ZXMgPSB7fTtcbiAgfVxuXG4gIHJvdXRlKHBhdHRlcm4sIGZuKSB7XG4gICAgaWYoIWZuKSB7XG4gICAgICBfLmRldigoKSA9PiB0aGlzLl9yb3V0ZXNbcGF0dGVybl0uc2hvdWxkLmJlLm9rKTtcbiAgICAgIHJldHVybiB0aGlzLl9yb3V0ZXNbcGF0dGVybl07XG4gICAgfVxuICAgIF8uZGV2KCgpID0+IHRoaXMuX3JvdXRlc1twYXR0ZXJuXS5zaG91bGQubm90LmJlLm9rICYmXG4gICAgICBmbi5zaG91bGQuYmUuYS5GdW5jdGlvblxuICAgICk7XG4gICAgaWYocGF0dGVybiA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdChmbik7XG4gICAgfVxuICAgIGxldCByZWdleHAgPSByb3V0ZVRvUmVnRXhwKHBhdHRlcm4pO1xuICAgIHRoaXMuX3JvdXRlc1twYXR0ZXJuXSA9IHsgcmVnZXhwLCBmbiB9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcm91dGVzKHBhdHRlcm5zKSB7XG4gICAgaWYoIXBhdHRlcm5zKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcm91dGVzO1xuICAgIH1cbiAgICBvYmplY3Qua2V5cyhwYXR0ZXJuKS5mb3JFYWNoKChwYXR0ZXJuKSA9PiB0aGlzLnJvdXRlKHBhdHRlcm4sIHBhdHRlcm5zW3BhdHRlcm5dKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkZWZhdWx0KGZuKSB7XG4gICAgaWYoIWZuKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdDtcbiAgICB9XG4gICAgdGhpcy5fZGVmYXVsdCA9IGZuO1xuICB9XG5cbiAgbWF0Y2goZnJhZ21lbnQpIHtcbiAgICBsZXQgcmVzID0gbnVsbDtcbiAgICBvYmplY3Qua2V5cyh0aGlzLl9yb3V0ZXMsIChwYXR0ZXJuKSA9PiB7XG4gICAgICBsZXQgeyByZWdleHAsIGZuIH0gPSB0aGlzLl9yb3V0ZXNbcGF0dGVybl07XG4gICAgICBpZihyZXMgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYoZnJhZ21lbnQubWF0Y2gocmVnZXhwKSAhPT0gbnVsbCkge1xuICAgICAgICBsZXQgcGFyYW1zID0gZXh0cmFjdEZyYWdtZW50UGFyYW1ldGVycyhyZWdleHAsIGZyYWdtZW50KTtcbiAgICAgICAgcGFyYW1zLnB1c2goZnJhZ21lbnQpO1xuICAgICAgICByZXMgPSBmbiguLi5wYXJhbXMpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmKCFyZXMgJiYgdGhpcy5fZGVmYXVsdCkge1xuICAgICAgcmVzID0gdGhpcy5fZGVmYXVsdC5jYWxsKG51bGwsIGZyYWdtZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlcjsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=