/**
 * Created by Boss on 25/9/15.
 */
angular.module('sc.moments',[])
  .controller('MomentsCtrl', function($scope){

    function loadFeeds() {
      $scope.feeds = Status.query({user_id: $stateParams.friendId});

      $scope.likedItemsLocal = [];
      $scope.currentItem = 0;
      $scope.currentDisplayPane = 0;
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
    }

  });
