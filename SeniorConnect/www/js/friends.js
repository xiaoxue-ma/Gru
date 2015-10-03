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
  })
  .controller('CreateGroupCtrl', function($scope, Friends, Chats){
    $scope.friends = Friends.all();
    $scope.createGroup = function() {
      var chat;
      chat = {
        id: 5,
        name: 'Group1',
        lastText: 'You on your way?',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
      };
      Chats.add(chat);
    };
  })

  .controller('GetPhoneContactListCtrl', function($scope, PhoneContactList) {
    $scope.phoneContactListPeople = PhoneContactList.all();
    $scope.clicked = false;
    $scope.request = "Add Friend";
    $scope.addFriendClick = function () {
      $scope.clicked = true;
      $scope.request = "Request Sent";
    };
  })
  .controller('PhoneContactListPersonCtrl', function($scope, $stateParams, phoneContactListPeople) {
    $scope.phoneContactListPerson =phoneContactListPeople.get($stateParams.phoneContactListPersonID);
  });

