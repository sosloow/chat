var _channels = require('../../config').defaultChannels;

exports.list = function(socket) {
  socket.emit('channels:list', _channels);
};
