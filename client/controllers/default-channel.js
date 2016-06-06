export default class ChannelCtrl {
  constructor($state) {
    $state.go('app.channel', {channelName: 'global'});
  }
}

ChannelCtrl.$inject = ['$state'];
