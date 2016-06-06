var crypto = require('crypto');
var _ = require('lodash');

exports.randomId = function() {
  return crypto.randomBytes(16).toString('hex');
};

exports.randomColor = function() {
  var components = '0123456789abcdef'.split('');

  var hex = _.range(6).map(function() {
    return _.sample(components);
  });

  return '#' + hex.join('');
};
