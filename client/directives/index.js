import angular from 'angular';

import scrollFromBottom from './scroll-from-bottom';

angular.module('app.directives', [])
.directive('scrollFromBottom', scrollFromBottom);

export default 'app.directives';
