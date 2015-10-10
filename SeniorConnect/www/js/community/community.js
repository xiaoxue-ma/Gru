/**
* Created by Boss on 9/10/15.
*/
/**
* Created by Boss on 25/9/15.
*/
sac.controller('CommunityCtrl', function($scope, UserService, Communitys) {
  $scope.communitys = Communitys.query();
  $scope.status = function(i){
    return $scope.communitys[i-1].joined;
  };
  $scope.hasRead = function(i){
    return $scope.communitys[i-1].read;
  };
  $scope.read = function(i){
    $scope.communitys[i-1].read = true;
  };
  $scope.joined = function(i){
    return $scope.communitys[i-1].joined;
  };
  $scope.joinCom = function(i){
    $scope.communitys[i-1].joined = true;
  };
  $scope.quitCom = function(i){
    $scope.communitys[i-1].joined = false;
  };

    //$scope.readEvent = function(){
    //  UserService.readEvent();
    //};
    //$scope.hasRead = function(){
    //  return UserService.read;
    //};
    //$scope.joinGroup = function(){
    //  UserService.joinGroup();
    //};
    //$scope.hasJoinedGroup = function(){
    //  return UserService.joinedGroup;
    //}
  })

  .controller('CommunityCalendarCtrl',function($scope){

  })

  .controller('CommunityEventCtrl', function($scope, $stateParams,Communitys) {
    $scope.community = Communitys.query()[$stateParams.communityId - 1].name;
    $scope.events = Communitys.get($stateParams.communityId);
    console.log($scope.events);

    $scope.joined = function(i){
      return $scope.events[i-1].joined;
    };

    $scope.joinEvent = function(i){
      $scope.events[i-1].joined = true;
    };
    $scope.cancelEvent = function(i){
      $scope.events[i-1].joined = false;
    };

  });
