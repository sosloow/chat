var shared = require('./shared');
var Channel = require('./channel');
var User = require('./user');

module.exports = function(io) {
  shared.io = io;

  io.on('connection', function(socket){
    var channels = Channel.list();
    var user = User.create(socket.id);

    socket.emit('channels:list', channels);
    socket.emit('users:created', user);

    channels.forEach(function(channel) {
      socket.join(channel.name);

      var message = Channel.join(channel.name, user);

      io.sockets.in(channel.name).emit('channels:send', {
        channelName: channel.name,
        message: message
      });

      io.sockets.in(channel.name).emit('channels:refresh', channel);
    });

    socket.on('channels:get', function(channelName) {
      var channel = Channel.get(channelName);

      socket.emit('channels:get', channel);
    });

    socket.on('channels:send', function(data) {
      var message = Channel.newMessage(
        data.channelName,
        user.id,
        data.messageBody);

      io.sockets.emit('channels:send', {
        channelName: data.channelName,
        message: message
      });
    });

    socket.on('disconnect', function() {
      channels.forEach(function(channel) {
        var message = Channel.leave(channel.name, user.id);

        io.sockets.in(channel.name).emit('channels:send', {
          channelName: channel.name,
          message: message
        });

        io.sockets.in(channel.name).emit('channels:refresh', channel);
      });

      User.destroy(user.id);

      socket.emit('users:list', User.list());
    });
  });
};
