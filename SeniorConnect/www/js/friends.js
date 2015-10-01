/**
 * Created by Siqi on 01/10/15.
 */
angular.module('sc.friends',[])

  .controller('FriendsCtrl', function($scope, Friends) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.friends = Friends.all();
    $scope.remove = function(chat) {
      Friends.remove(friend);
    };
  })


  .controller('FriendsDetailCtrl', function($scope, $stateParams, friends) {
    $scope.friend =friends.get($stateParams.friendID);
  })

  .controller('FriendsAddCtrl', function($scope) {
    $scope.add = true;

    $scope.toAdd = function(){
      return $scope.add;
    };

  });