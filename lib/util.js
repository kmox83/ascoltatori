
var util = require('util');

function alias(obj, from, to) {
  if(typeof obj[from] !== 'function') {
    throw util.format("'%s' is not a function", from);
  }
  obj[to] = obj[from];
  return obj;
}
module.exports.alias = alias;

var aliases = {
  publish: ["pub"],
  subscribe: ["sub"],
  unsubscribe: ["unsub"]
};

function aliasAscoltatore(obj) {
  for (var key in aliases) {
    if(aliases.hasOwnProperty(key)) {
      aliases[key].forEach(function(a) {
        module.exports.alias(obj, key, a);
      });
    }
  }
  return obj;
};
module.exports.aliasAscoltatore = aliasAscoltatore;

function wrap(done) {
  return function() {
    if(typeof done === 'function') {
      done();
    }
  };
}
module.exports.wrap = wrap;

function defer(done) {
  if(typeof done === 'function') {
    process.nextTick(wrap(done));
  }
}
module.exports.defer = defer;

module.exports.format = util.format;
