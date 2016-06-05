import angular from 'angular';

import socketFactory from './socket-factory';
import socket from './socket';
import Channel from './channel';

angular.module('app.services', [])
.provider('socketFactory', socketFactory)
.service('Channel', Channel)
.service('socket', socket);

export default 'app.services';
