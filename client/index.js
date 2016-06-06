import angular from 'angular';
import uiRouter from 'angular-ui-router';

import services from './services';
import directives from './directives';

import AppCtrl from './controllers/app';
import DefaultChannelCtrl from './controllers/default-channel';
import ChannelCtrl from './controllers/channel';

angular.module('Chat', [
  uiRouter,
  services,
  directives
])

.config(['$locationProvider', '$stateProvider', ($locationProvider, $stateProvider) => {
  $locationProvider.html5Mode(true).hashPrefix('!');

  $stateProvider
  
    .state('app', {
      url: '/',
      abstract: true,
      templateUrl: 'partials/app.html',
      controller : AppCtrl,
      controllerAs: 'appVm'
    })

    .state('app.defaultChannel', {
      url: '',
      templateUrl: 'partials/channel.html',
      controller: DefaultChannelCtrl,
      controllerAs: 'vm'
    })

    .state('app.channel', {
      url: ':channelName',
      templateUrl: 'partials/channel.html',
      controller: ChannelCtrl,
      controllerAs: 'vm'
    });
}]);

angular.element(document).ready(() => {
  angular.bootstrap(document, ['Chat']);
});
