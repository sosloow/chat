export default class Channel {
  constructor(socket) {
    const _channels = [];

    socket.on('channels:list', channels => {
      for (let i in _channels.slice()) {
        _channels.pop();
      }

      channels.forEach(channel => {
        _channels.push(channel);
      });
    });

    return {
      list() {
        return _channels;
      }
    };
  }
}

Channel.$inject = ['socket'];
