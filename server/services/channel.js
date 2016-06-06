var _ = require('lodash');

var defaultChannels = require('../../config').defaultChannels;
var User = require('./user');
var _channels = defaultChannels.map(function(channelName) {
  return {
    name: channelName,
    users: [],
    messages: []
  };
});

exports.list = function() {
  return _channels.map(function(channel) {
    return _.omit(channel, ['messages, users']);
  });
};

exports.get = function(channelName) {
  return _.find(_channels, {name: channelName});
};

exports.join = function(channelName, user) {
  var channel = exports.get(channelName);

  if (_.includes(channel.users, user)) {
    return;
  }

  var joinMessage = {
    createdAt: new Date(),
    body: user.name + ' заходит в ' + channel.name
  };

  channel.messages.push(joinMessage);

  channel.users.push(user);

  return joinMessage;
};

exports.leave = function(channelName, userId) {
  var channel = exports.get(channelName);
  var user = User.get(userId);

  var leaveMessage = {
    createdAt: new Date(),
    body: user.name + ' покинул ' + channel.name
  };

  channel.messages.push(leaveMessage);

  channel.users.splice(channel.users.indexOf(user), 1);

  return leaveMessage;
};

exports.newMessage = function(channelName, userId, messageBody) {
  var channel = exports.get(channelName);
  var user = User.get(userId);

  var message = {
    createdAt: new Date(),
    user: user,
    body: messageBody
  };

  channel.messages.push(message);

  return message;
};
