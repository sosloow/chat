import io from 'socket.io-client';

export default class Socket {
  constructor(socketFactory) {
    const _socket = socketFactory({ioSocket: io.connect()});

    return _socket;
  }
}

Socket.$inject = ['socketFactory'];
