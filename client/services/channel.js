import {refill} from './utils';
import {find} from 'lodash';

export default class Channel {
  constructor(socket) {
    const _channels = [];
    const _currentChannel = {
      name: '',
      messages: [],
      users: [],
      pending: false
    };

    socket.on('channels:list', channels => {
      refill(_channels, channels);
    });

    socket.on('channels:get', channel => {
      _currentChannel.name = channel.name;

      refill(_currentChannel.messages, channel.messages);
      refill(_currentChannel.users, channel.users);
    });

    socket.on('channels:send', ({channelName, message}) => {
      if (_currentChannel.name == channelName) {
        _currentChannel.messages.push(message);
        return;
      }

      const channel = find(_channels, {name: channelName});

      if (channel && message.user) {
        channel.pending = true;
      }
    });

    socket.on('channels:refresh', channel => {
      if (_currentChannel.name != channel.name) {
        return;
      }

      refill(_currentChannel.users, channel.users);
    });

    return {
      list() {
        return _channels;
      },

      get(channelName) {
        socket.emit('channels:get', channelName);

        return _currentChannel;
      },

      send(channelName, messageBody) {
        socket.emit('channels:send', {channelName, messageBody});
      }
    };
  }
}

Channel.$inject = ['socket'];
