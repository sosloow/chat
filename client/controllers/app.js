export default class AppCtrl {
  constructor(Channel) {
    this.channels = Channel.list();
  }
}

AppCtrl.$inject = ['Channel'];
