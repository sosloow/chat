export default class ChannelCtrl {
  constructor($state) {
    $state.go('app.channel', {name: 'global'});
  }
}

ChannelCtrl.$inject = ['$state'];
