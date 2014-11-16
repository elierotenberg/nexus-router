module.exports = function(Router) {
  const _ = require('lodash-next');

  class ConstantRouter extends Router {
    // Simplified Router which maps pattern to flat values.
    constructor(map) {
      _.dev(() => map.should.be.an.Object &&
        Object.keys(map).map((pattern) => pattern.should.be.a.String)
      );
      let routes = _.mapValues(map, (value) => () => value);
      super(routes);
    }
  }

  return ConstantRouter;
};
