var _ = require('lodash');
var randomName = require('node-random-name');
var utils = require('./utils');

var _users = [];

exports.create = function() {
  var name = randomName({first: true});

  var user = {
    id: utils.randomId(),
    name: name,
    color: utils.randomColor()
  };

  _users.push(user);

  return user;
};

exports.list = function() {
  return _users;
};

exports.get = function(id) {
  return _.find(_users, {id: id});
};

exports.destroy = function(id) {
  var user = exports.get(id);

  _users.splice(_users.indexOf(user), 1);
};
