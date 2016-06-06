export default function scrollFromBottom() {
  return {
    restrict: 'A',
    scope: {
      messages: '=scrollFromBottom'
    },
    link(scope, element) {
      scope.$watch('messages', () => {
        element[0].scrollTop = element[0].scrollHeight;
      }, true);
    }
  };
}
