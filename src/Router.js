const _ = require('lodash-next');
const should = _.should;


const optionalParam = /\((.*?)\)/g;
const namedParam = /(\(\?)?:\w+/g;
const splatParam = /\*\w+/g;
const escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

function routeToRegExp(pattern) {
  pattern = pattern.replace(escapeRegExp, '\\$&')
  .replace(optionalParam, '(?:$1)?')
  .replace(namedParam, function(match, optional) {
    return optional ? match : '([^/?]+)';
  })
  .replace(splatParam, '([^?]*?)');
  return new RegExp('^' + pattern + '(?:\\?([\\s\\S]*))?$');
}

function extractFragmentParameters(regexp, fragment) {
  let params = regexp.exec(fragment).slice(1);
  return params.map((i) => {
    let param = params[i];
    if(i === params.length - 1) {
      return param || null;
    }
    return param ? decodeURIComponent(param) : null;
  });
}

class Router {
  constructor(routes = {}) {
    _.dev(() => routes.should.be.an.Object &&
      Object.keys(routes).map((pattern) => pattern.should.be.a.String && routes[pattern].should.be.a.Function)
    );
    this._routes = {};
  }

  route(pattern, fn) {
    if(!fn) {
      _.dev(() => this._routes[pattern].should.be.ok);
      return this._routes[pattern];
    }
    _.dev(() => this._routes[pattern].should.not.be.ok &&
      fn.should.be.a.Function
    );
    if(pattern === null) {
      return this.default(fn);
    }
    let regexp = routeToRegExp(pattern);
    this._routes[pattern] = { regexp, fn };
    return this;
  }

  routes(patterns) {
    if(!patterns) {
      return this._routes;
    }
    Object.keys(pattern).forEach((pattern) => this.route(pattern, patterns[pattern]));
    return this;
  }

  default(fn) {
    if(!fn) {
      return this._default;
    }
    this._default = fn;
  }

  match(fragment) {
    let res = null;
    Object.keys(this._routes, (pattern) => {
      let { regexp, fn } = this._routes[pattern];
      if(res !== null) {
        return;
      }
      if(fragment.match(regexp) !== null) {
        let params = extractFragmentParameters(regexp, fragment);
        params.push(fragment);
        res = fn(...params);
      }
    });
    if(!res && this._default) {
      res = this._default.call(null, fragment);
    }
    return res;
  }
}

const ConstantRouter = require('./ConstantRouter')(Router);

_.extend(Router, { ConstantRouter });

module.exports = Router;
