export default class ChannelCtrl {
  constructor($stateParams, Channel) {
    this.$stateParams = $stateParams;
    this.Channel = Channel;

    this.newMessage = {};

    this.channel = this.Channel.get($stateParams.channelName);
  }

  sendMessage() {
    this.Channel.send(
      this.$stateParams.channelName,
      this.newMessage.body);

    this.newMessage.body = '';
  }
}

ChannelCtrl.$inject = ['$stateParams', 'Channel'];
