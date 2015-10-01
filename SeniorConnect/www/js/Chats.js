/**
 * Created by Boss on 25/9/15.
 */

angular.module('sc.chats', [])

  .controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);

    $scope.sendMessage = function(sendMessageForm) {
      var message = {
        toId: $scope.chatId,
        text: $scope.input.message
      }}
  })

  .controller('CreateGroupCtrl', function($scope, Friends){
    $scope.friends = Friends.all();
    $scope.remove = function(chat) {
      Friends.remove(friend);
    };
  })


  .controller('GroupDetailCtrl', function($scope, $stateParams, friends) {
    $scope.friend =friends.get($stateParams.friendID);
  });



