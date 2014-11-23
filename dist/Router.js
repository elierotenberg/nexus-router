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
        return this;
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
//# sourceMappingURL=data:application/json;base64,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QixFQUFFO0FBQ2hCLGNBQUcsR0FBRyxLQUFLLElBQUksRUFBRTtBQUNmLG1CQUFPO1dBQ1I7QUFDRCxjQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFO0FBQ2xDLGdCQUFJLE1BQU0sR0FBRyx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDekQsa0JBQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEIsZUFBRyxHQUFHLEVBQUUsd0JBQUksTUFBTSxFQUFDLENBQUM7V0FDckI7U0FDRixDQUFDLENBQUM7QUFDSCxZQUFHLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDeEIsYUFBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztTQUMxQztBQUNELGVBQU8sR0FBRyxDQUFDO09BQ1o7Ozs7U0F6REcsTUFBTTs7O0FBNERaLElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUUzRCxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLGNBQWMsRUFBZCxjQUFjLEVBQUUsQ0FBQyxDQUFDOztBQUVyQyxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyIsImZpbGUiOiJSb3V0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoLW5leHQnKTtcblxuY29uc3Qgb3B0aW9uYWxQYXJhbSA9IC9cXCgoLio/KVxcKS9nO1xuY29uc3QgbmFtZWRQYXJhbSA9IC8oXFwoXFw/KT86XFx3Ky9nO1xuY29uc3Qgc3BsYXRQYXJhbSA9IC9cXCpcXHcrL2c7XG5jb25zdCBlc2NhcGVSZWdFeHAgPSAvW1xcLXt9XFxbXFxdKz8uLFxcXFxcXF4kfCNcXHNdL2c7XG5cbmZ1bmN0aW9uIHJvdXRlVG9SZWdFeHAocGF0dGVybikge1xuICBwYXR0ZXJuID0gcGF0dGVybi5yZXBsYWNlKGVzY2FwZVJlZ0V4cCwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKG9wdGlvbmFsUGFyYW0sICcoPzokMSk/JylcbiAgLnJlcGxhY2UobmFtZWRQYXJhbSwgZnVuY3Rpb24obWF0Y2gsIG9wdGlvbmFsKSB7XG4gICAgcmV0dXJuIG9wdGlvbmFsID8gbWF0Y2ggOiAnKFteLz9dKyknO1xuICB9KVxuICAucmVwbGFjZShzcGxhdFBhcmFtLCAnKFteP10qPyknKTtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgcGF0dGVybiArICcoPzpcXFxcPyhbXFxcXHNcXFxcU10qKSk/JCcpO1xufVxuXG5mdW5jdGlvbiBleHRyYWN0RnJhZ21lbnRQYXJhbWV0ZXJzKHJlZ2V4cCwgZnJhZ21lbnQpIHtcbiAgbGV0IHBhcmFtcyA9IHJlZ2V4cC5leGVjKGZyYWdtZW50KS5zbGljZSgxKTtcbiAgcmV0dXJuIHBhcmFtcy5tYXAoKGkpID0+IHtcbiAgICBsZXQgcGFyYW0gPSBwYXJhbXNbaV07XG4gICAgaWYoaSA9PT0gcGFyYW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgIHJldHVybiBwYXJhbSB8fCBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gcGFyYW0gPyBkZWNvZGVVUklDb21wb25lbnQocGFyYW0pIDogbnVsbDtcbiAgfSk7XG59XG5cbmNsYXNzIFJvdXRlciB7XG4gIGNvbnN0cnVjdG9yKHJvdXRlcyA9IHt9KSB7XG4gICAgXy5kZXYoKCkgPT4gcm91dGVzLnNob3VsZC5iZS5hbi5PYmplY3QgJiZcbiAgICAgIE9iamVjdC5rZXlzKHJvdXRlcykubWFwKChwYXR0ZXJuKSA9PiBwYXR0ZXJuLnNob3VsZC5iZS5hLlN0cmluZyAmJiByb3V0ZXNbcGF0dGVybl0uc2hvdWxkLmJlLmEuRnVuY3Rpb24pXG4gICAgKTtcbiAgICB0aGlzLl9yb3V0ZXMgPSB7fTtcbiAgfVxuXG4gIHJvdXRlKHBhdHRlcm4sIGZuKSB7XG4gICAgaWYoIWZuKSB7XG4gICAgICBfLmRldigoKSA9PiB0aGlzLl9yb3V0ZXMuc2hvdWxkLmhhdmUucHJvcGVydHkocGF0dGVybikpO1xuICAgICAgcmV0dXJuIHRoaXMuX3JvdXRlc1twYXR0ZXJuXTtcbiAgICB9XG4gICAgXy5kZXYoKCkgPT4gdGhpcy5fcm91dGVzLnNob3VsZC5ub3QuaGF2ZS5wcm9wZXJ0eShwYXR0ZXJuKSAmJlxuICAgICAgZm4uc2hvdWxkLmJlLmEuRnVuY3Rpb25cbiAgICApO1xuICAgIGlmKHBhdHRlcm4gPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlZmF1bHQoZm4pO1xuICAgIH1cbiAgICBsZXQgcmVnZXhwID0gcm91dGVUb1JlZ0V4cChwYXR0ZXJuKTtcbiAgICB0aGlzLl9yb3V0ZXNbcGF0dGVybl0gPSB7IHJlZ2V4cCwgZm4gfTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJvdXRlcyhwYXR0ZXJucykge1xuICAgIGlmKCFwYXR0ZXJucykge1xuICAgICAgcmV0dXJuIHRoaXMuX3JvdXRlcztcbiAgICB9XG4gICAgT2JqZWN0LmtleXMocGF0dGVybnMpLmZvckVhY2goKHBhdHRlcm4pID0+IHRoaXMucm91dGUocGF0dGVybiwgcGF0dGVybnNbcGF0dGVybl0pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRlZmF1bHQoZm4pIHtcbiAgICBpZighZm4pIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0O1xuICAgIH1cbiAgICB0aGlzLl9kZWZhdWx0ID0gZm47XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtYXRjaChmcmFnbWVudCkge1xuICAgIGxldCByZXMgPSBudWxsO1xuICAgIE9iamVjdC5rZXlzKHRoaXMuX3JvdXRlcywgKHBhdHRlcm4pID0+IHtcbiAgICAgIGxldCB7IHJlZ2V4cCwgZm4gfSA9IHRoaXMuX3JvdXRlc1twYXR0ZXJuXTtcbiAgICAgIGlmKHJlcyAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZihmcmFnbWVudC5tYXRjaChyZWdleHApICE9PSBudWxsKSB7XG4gICAgICAgIGxldCBwYXJhbXMgPSBleHRyYWN0RnJhZ21lbnRQYXJhbWV0ZXJzKHJlZ2V4cCwgZnJhZ21lbnQpO1xuICAgICAgICBwYXJhbXMucHVzaChmcmFnbWVudCk7XG4gICAgICAgIHJlcyA9IGZuKC4uLnBhcmFtcyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYoIXJlcyAmJiB0aGlzLl9kZWZhdWx0KSB7XG4gICAgICByZXMgPSB0aGlzLl9kZWZhdWx0LmNhbGwobnVsbCwgZnJhZ21lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG59XG5cbmNvbnN0IENvbnN0YW50Um91dGVyID0gcmVxdWlyZSgnLi9Db25zdGFudFJvdXRlcicpKFJvdXRlcik7XG5cbl8uZXh0ZW5kKFJvdXRlciwgeyBDb25zdGFudFJvdXRlciB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSb3V0ZXI7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=