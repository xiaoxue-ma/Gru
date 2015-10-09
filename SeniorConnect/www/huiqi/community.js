/**
 * Created by Boss on 25/9/15.
 */
angular.module('sc.community',[])

  .controller('CommunityCtrl', function($scope, UserService) {

    $scope.readEvent = function(){
      UserService.readEvent();
    };
    $scope.hasRead = function(){
      return UserService.read;
    }
    $scope.joinGroup = function(){
      UserService.joinGroup();
    };
    $scope.hasJoinedGroup = function(){
      return UserService.joinedGroup;
    }
  })

.controller('CommunityEventCtrl', function($scope) {
    $scope.join = [];
    $scope.join[0] = $scope.join[1] = $scope.join[2] = true;

    $scope.toJoin = function(i){
      return $scope.join[i];
    };

    $scope.joinIt = function(i){
      $scope.join[i] = false;
    };
    $scope.cancel = function(i){
      $scope.join[i] = true;
    };

});
