/**
 * Created by Boss on 25/9/15.
 */

angular.module('sc.chats', ['sc.services'])

  .controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.query();
    //$scope.remove = function(chat) {
    //  Chats.remove(chat);
    //};
    $scope.add=function(chat){
      Chats.add(chat);
    }
  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    console.log("chat");
    //$scope.chat = Chats.get($stateParams.chatId);
    //
    //$scope.sendMessage = function(sendMessageForm) {
    //  var message = {
    //    toId: $scope.chatId,
    //    text: $scope.input.message
    //  }}
  })




  .controller('GroupDetailCtrl', function($scope, $stateParams, friends) {
    $scope.friend =friends.get($stateParams.friendID);
  });



