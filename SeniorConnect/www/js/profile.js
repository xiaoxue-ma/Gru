/**
 * Created by Boss on 25/9/15.
 */
angular.module('starter.profile',[])
  .controller('ProfileCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
