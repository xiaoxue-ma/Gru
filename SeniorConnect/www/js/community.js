/**
 * Created by Boss on 25/9/15.
 */
angular.module('sc.community',[])
  .controller('CommunityCtrl', function($scope) {

  })

.controller('CommunityEventCtrl', function($scope) {
    $scope.join = true;

    $scope.toJoin = function(){
      return $scope.join;
    };

    $scope.joinIt = function(){
      $scope.join = false;
    };
    $scope.cancel = function(){
      $scope.join = true;
    };


});
