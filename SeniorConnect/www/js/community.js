/**
 * Created by Boss on 25/9/15.
 */
angular.module('sc.community',[])
  .controller('CommunityCtrl', function($scope) {

  })

.controller('CommunityEventCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});
